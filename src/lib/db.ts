import { db } from "./firebase";
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, increment } from "firebase/firestore";

// User Profile Functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUserProfile = async (userId: string, data: any) => {
    try {
        const userRef = doc(db, "users", userId);

        // We use setDoc with merge: true so if the user already exists, we don't overwrite their coins/role.
        // We fetch first to see if they exist so we don't overwrite existing balances.
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            await setDoc(userRef, {
                ...data,
                role: 'student', // Default role mapping
                educoins: 10,     // Welcome Bonus
                createdAt: serverTimestamp(),
            });
        } else {
            // If they exist, maybe just update login timestamps or merge safe data
            const existingData = docSnap.data();
            await setDoc(userRef, {
                ...data,
                educoins: existingData.educoins !== undefined ? existingData.educoins : 10,
                lastLoginAt: serverTimestamp(),
            }, { merge: true });
        }

        return true;
    } catch (error) {
        console.error("Error creating user profile:", error);
        return false;
    }
};

export const createFacultyProfile = async (userId: string, data: any) => {
    try {
        const userRef = doc(db, "faculty", userId);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            await setDoc(userRef, {
                ...data,
                role: 'teacher',
                createdAt: serverTimestamp(),
            });
        } else {
            await setDoc(userRef, {
                ...data,
                lastLoginAt: serverTimestamp(),
            }, { merge: true });
        }
        return true;
    } catch (error) {
        console.error("Error creating faculty profile:", error);
        return false;
    }
};

export const createAdminProfile = async (userId: string, data: any) => {
    try {
        const userRef = doc(db, "admins", userId);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            await setDoc(userRef, {
                ...data,
                role: 'admin',
                createdAt: serverTimestamp(),
            });
        } else {
            await setDoc(userRef, {
                ...data,
                lastLoginAt: serverTimestamp(),
            }, { merge: true });
        }
        return true;
    } catch (error) {
        console.error("Error creating admin profile:", error);
        return false;
    }
};

export const getUserProfile = async (userId: string) => {
    try {
        // 1. Check Admins Target Collection
        let targetRef = doc(db, "admins", userId);
        let docSnap = await getDoc(targetRef);
        if (docSnap.exists()) return docSnap.data();

        // 2. Check Faculty Target Collection
        targetRef = doc(db, "faculty", userId);
        docSnap = await getDoc(targetRef);
        if (docSnap.exists()) return docSnap.data();

        // 3. Fallback to Standard Users (Students)
        targetRef = doc(db, "users", userId);
        docSnap = await getDoc(targetRef);
        if (docSnap.exists()) return docSnap.data();

        return null;
    } catch (error) {
        console.error("Error fetching generalized user profile:", error);
        return null;
    }
};

// Purchase Functions
// Updated purchase function to handle EduCoins earned and EduCoins spent
export const recordPurchase = async (userId: string, courseId: string, price: number, currency: string, coinsEarned: number, coinsSpent: number) => {
    try {
        const purchasesRef = collection(db, "purchases");
        await addDoc(purchasesRef, {
            userId,
            courseId,
            price,
            currency,
            coinsEarned,
            coinsSpent,
            purchasedAt: serverTimestamp(),
            status: 'completed'
        });

        // Mutate the user's EduCoin balance
        const userRef = doc(db, "users", userId);
        const coinDelta = coinsEarned - coinsSpent;

        if (coinDelta !== 0) {
            await updateDoc(userRef, {
                educoins: increment(coinDelta)
            });
        }

        return true;
    } catch (error) {
        console.error("Error recording purchase:", error);
        return false;
    }
};

export const getUserPurchases = async (userId: string) => {
    try {
        const purchasesRef = collection(db, "purchases");
        const q = query(purchasesRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const purchases: any[] = [];
        querySnapshot.forEach((doc) => {
            purchases.push({ id: doc.id, ...doc.data() });
        });
        return purchases;
    } catch (error) {
        console.error("Error fetching purchases:", error);
        return [];
    }
};

// Course Functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCourse = async (courseData: any) => {
    try {
        const coursesRef = collection(db, "courses");
        await addDoc(coursesRef, {
            ...courseData,
            createdAt: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error("Error creating course:", error);
        return false;
    }
};

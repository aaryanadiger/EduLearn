import { db } from "./firebase";
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, increment, orderBy, limit } from "firebase/firestore";

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

// Review Functions
export interface Review {
    id?: string;
    courseId: string;
    userId: string;
    userName: string;
    rating: number; // 1-5
    text: string;
    createdAt?: any;
}

export const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    try {
        const reviewsRef = collection(db, "reviews");
        await addDoc(reviewsRef, {
            ...reviewData,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error adding review:", error);
        return { success: false, error: error.message };
    }
};

export const updateReview = async (reviewId: string, text: string, rating: number) => {
    try {
        const reviewRef = doc(db, "reviews", reviewId);
        await updateDoc(reviewRef, {
            text,
            rating,
            // We intentionally don't update createdAt so it keeps its original sort position
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating review:", error);
        return { success: false, error: error.message };
    }
};

export const deleteReview = async (reviewId: string) => {
    try {
        const reviewRef = doc(db, "reviews", reviewId);
        // Note: You must import deleteDoc from 'firebase/firestore'
        await import('firebase/firestore').then(({ deleteDoc }) => deleteDoc(reviewRef));
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting review:", error);
        return { success: false, error: error.message };
    }
};

export const getCourseReviews = async (courseId: string) => {
    try {
        const reviewsRef = collection(db, "reviews");
        // Removed orderBy("createdAt", "desc") to prevent composite index requirement
        const q = query(reviewsRef, where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);

        const reviews: Review[] = [];
        querySnapshot.forEach((doc) => {
            reviews.push({ id: doc.id, ...doc.data({ serverTimestamps: "estimate" }) } as Review);
        });
        
        // Sort in memory
        reviews.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : Date.now());
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : Date.now());
            return timeB - timeA;
        });
        
        return reviews;
    } catch (error: any) {
        console.error("Error fetching course reviews:", error);
        if (typeof window !== 'undefined') {
            alert("Firebase Fetch Error: " + error.message);
        }
        return [];
    }
};

export const getTopReviews = async (limitCount = 5) => {
    try {
        const reviewsRef = collection(db, "reviews");
        // Removed orderBy("createdAt", "desc") to prevent composite index requirement
        const q = query(reviewsRef, orderBy("rating", "desc"), limit(limitCount * 2));
        const querySnapshot = await getDocs(q);

        const reviews: Review[] = [];
        querySnapshot.forEach((doc) => {
            reviews.push({ id: doc.id, ...doc.data({ serverTimestamps: "estimate" }) } as Review);
        });
        
        // Sort in memory to get the newest top-rated reviews
        reviews.sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt?.seconds ? a.createdAt.seconds * 1000 : Date.now());
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt?.seconds ? b.createdAt.seconds * 1000 : Date.now());
            return timeB - timeA;
        });

        return reviews.slice(0, limitCount);
    } catch (error) {
        console.error("Error fetching top reviews:", error);
        return [];
    }
};
// Progress Functions
export const updateCourseProgress = async (userId: string, courseId: string, moduleId: string, completed: boolean) => {
    try {
        const progressRef = doc(db, "progress", `${userId}_${courseId}`);
        const docSnap = await getDoc(progressRef);

        if (!docSnap.exists()) {
            if (completed) {
                await setDoc(progressRef, {
                    userId,
                    courseId,
                    completedModules: [moduleId],
                    updatedAt: serverTimestamp()
                });
            }
        } else {
            const data = docSnap.data();
            let modules = data.completedModules || [];
            if (completed) {
                if (!modules.includes(moduleId)) {
                    modules.push(moduleId);
                }
            } else {
                modules = modules.filter((id: string) => id !== moduleId);
            }
            await updateDoc(progressRef, {
                completedModules: modules,
                updatedAt: serverTimestamp()
            });
        }
        return true;
    } catch (error) {
        console.error("Error updating course progress:", error);
        return false;
    }
};

export const getUserProgress = async (userId: string) => {
    try {
        const progressRef = collection(db, "progress");
        const q = query(progressRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const progress: any[] = [];
        querySnapshot.forEach((doc) => {
            progress.push({ id: doc.id, ...doc.data() });
        });
        return progress;
    } catch (error) {
        console.error("Error fetching user progress:", error);
        return [];
    }
};

export const getCourseProgress = async (userId: string, courseId: string) => {
    try {
        const progressRef = doc(db, "progress", `${userId}_${courseId}`);
        const docSnap = await getDoc(progressRef);
        if (docSnap.exists()) {
            return docSnap.data().completedModules || [];
        }
        return [];
    } catch (error) {
        console.error("Error fetching course-specific progress:", error);
        return [];
    }
};

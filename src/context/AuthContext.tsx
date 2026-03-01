"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, appleProvider } from '@/lib/firebase';
import { createUserProfile, getUserProfile } from '@/lib/db';

interface UserProfile {
    role: string;
    educoins: number;
    email: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithGithub: () => Promise<void>;
    loginWithApple: () => Promise<void>;
    logout: () => Promise<void>;
    signupWithEmail: (email: string, pass: string, name: string) => Promise<void>;
    loginWithEmail: (email: string, pass: string) => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = async (uid?: string) => {
        const targetUid = uid || user?.uid;
        if (targetUid) {
            let data = await getUserProfile(targetUid);
            if (!data) {
                // Auto-heal missing documents or bypass Firestore permission errors
                data = {
                    email: auth?.currentUser?.email || '',
                    name: auth?.currentUser?.displayName || 'Student',
                    role: 'student',
                    educoins: 10,
                };
                createUserProfile(targetUid, {
                    email: data.email,
                    name: data.name,
                    authProvider: 'fallback'
                }).catch(() => { });
            }
            setProfile(data as UserProfile);
        } else {
            setProfile(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // Block unverified email accounts from hijacking the active session state
            if (currentUser && !currentUser.emailVerified && currentUser.providerData.some(p => p.providerId === 'password')) {
                await signOut(auth);
                setUser(null);
                setProfile(null);
                setLoading(false);
                return;
            }

            setUser(currentUser);
            if (currentUser) {
                await refreshProfile(currentUser.uid);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await createUserProfile(result.user.uid, {
                email: result.user.email,
                name: result.user.displayName,
                authProvider: 'google'
            });
            await refreshProfile(result.user.uid);
        } catch (error) {
            console.error("Google login error:", error);
            throw error;
        }
    };

    const loginWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            await createUserProfile(result.user.uid, {
                email: result.user.email,
                name: result.user.displayName,
                authProvider: 'github'
            });
            await refreshProfile(result.user.uid);
        } catch (error) {
            console.error("Github login error:", error);
            throw error;
        }
    };

    const loginWithApple = async () => {
        try {
            const result = await signInWithPopup(auth, appleProvider);
            await createUserProfile(result.user.uid, {
                email: result.user.email,
                name: result.user.displayName,
                authProvider: 'apple'
            });
            await refreshProfile(result.user.uid);
        } catch (error) {
            console.error("Apple login error:", error);
            throw error;
        }
    };

    const signupWithEmail = async (email: string, pass: string, name: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, pass);
            await updateProfile(result.user, { displayName: name }).catch(() => { });
            await sendEmailVerification(result.user);
            await createUserProfile(result.user.uid, {
                email: result.user.email,
                name: name,
                authProvider: 'email'
            });
            // We do NOT refresh profile here because they are instantly logged out by the listener until verified
            await signOut(auth);
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const loginWithEmail = async (email: string, pass: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, pass);
            if (!result.user.emailVerified) {
                await signOut(auth);
                throw new Error("unverified-email");
            }
            await refreshProfile(result.user.uid);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setProfile(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading,
            loginWithGoogle,
            loginWithGithub,
            loginWithApple,
            logout,
            signupWithEmail,
            loginWithEmail,
            refreshProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

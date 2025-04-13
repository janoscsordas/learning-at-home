import { createContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID, Models } from "react-native-appwrite" 

interface UserContextType {
    user: Models.User<Models.Preferences> | null;
    authChecked: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    async function login(email: string, password: string) {
        try {
            await account.createEmailPasswordSession(email, password);

            const response = await account.get();
            setUser(response)
        } catch (error) {
            throw Error(error instanceof Error ? error.message : "Invalid email or password");
        }
    }

    async function register(email: string, password: string) {
        try {
            await account.create(ID.unique(), email, password);
            await login(email, password);
        } catch (error) {
            throw Error(error instanceof Error ? error.message : "Invalid email or password");
        }
    }

    async function logout() {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            throw Error(error instanceof Error ? error.message : "Logout failed");
        }
    }

    async function getInitialUser() {
        try {
            const response = await account.get();
            setUser(response);
        } catch (error) {
            setUser(null);
        } finally {
            setAuthChecked(true);
        }
    }

    useEffect(() => {
        getInitialUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, login, register, logout, authChecked }}>
            {children}
        </UserContext.Provider>
    )
}
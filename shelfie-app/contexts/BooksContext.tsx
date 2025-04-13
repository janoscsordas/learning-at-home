import { createContext, useEffect, useState } from "react";
import { Book, NewBook } from "../types/book";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

interface BooksContextType {
    books: Book[];
    fetchBooks: () => Promise<void>;
    fetchBookById: (id: string) => Promise<Book>;
    createBook: (book: NewBook) => Promise<void>;
    deleteBook: (id: string) => Promise<void>;
}

const DATABASE_ID = "67fa1dff0000f2344738"
const COLLECTION_ID = "67fa1e14001d6060dfc2"

export const BooksContext = createContext<BooksContextType | null>(null);

export function BooksProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<Book[]>([]);
    const { user } = useUser();

    async function fetchBooks() {
        try {
            if (!user) {
                throw new Error("User not authenticated");
            }

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal("userId", user.$id),
                    Query.orderDesc("$createdAt"),
                ]
            )

            const fetchedBooks = response.documents.map((book) => ({
                $id: book.$id,
                title: book.title,
                author: book.author,
                description: book.description,
                userId: book.userId,
                $createdAt: book.$createdAt,
            })) as Book[];

            setBooks(fetchedBooks);
        } catch (error) {
            throw Error(error instanceof Error ? error.message : "Failed to fetch books");
        }
    }

    async function fetchBookById(id: string) {
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )

            const book = {
                $id: response.$id,
                title: response.title,
                author: response.author,
                description: response.description,
                userId: response.userId,
                $createdAt: response.$createdAt,
            } as Book;

            return book;
        } catch (error) {
            throw Error(error instanceof Error ? error.message : "Failed to fetch book");
        }
    }

    async function createBook(book: NewBook) {
        try {
            if (!user) {
                throw new Error("User not authenticated");
            }

            await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                { ...book, userId: user.$id },
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            )
        } catch (error) {
            throw Error(error instanceof Error ? error.message : "Failed to create book");
        }
    }

    async function deleteBook(id: string) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )
        } catch (error) {
            throw Error(error instanceof Error ? error.message : "Failed to delete book");
        }
    }

    useEffect(() => {
        let unsubscribe = () => { };
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

        if (user) {
            fetchBooks();

            unsubscribe = client.subscribe(channel, (response) => {
                const { payload, events } = response;

                if (events[0].includes("create")) {
                    setBooks((prevBooks) => [payload as Book, ...prevBooks]);
                } 
                
                if (events[0].includes("delete")) {
                    setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== (payload as Book).$id));
                }
            })
        } else {
            setBooks([]);
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [user])

    return (
        <BooksContext.Provider value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    )
}
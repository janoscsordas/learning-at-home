
export type Book = {
    $id: string;
    title: string;
    author: string;
    description: string;
    userId: string;
    $createdAt: string;
}

export type NewBook = {
    title: string;
    author: string;
    description: string;
}
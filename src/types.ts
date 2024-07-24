export interface Title {
    id: string
    title: string,
    summary: string,
    author: {
        authorId: string, 
        authorName: string
    },
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled",
    imageUrl: string,
    tagIds: string[],
    rating: number, 
    createdDate: Date,
    follows: number
}

export interface Author {
    id: string,
    name: string,
    works: string[],
    biography: string, 
    avatarUrl: string
}

export interface Tag {
    id: string,
    type: string,
    name: string
}

export interface UserRating {
    mangaId: string,
    score: number
}

export interface User {
    id: string,
    username: string,
    email: string,
    role: string,
    mangaFollows?: string[],
    userRatings?: UserRating[] 
}

export interface UserContext {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export interface MangaResult {
    id: string,
    title: string,
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled", 
    imageUrl: string,
    rating: number,
    follows: number
}

export interface AuthorResult {
    id: string,
    name: string,
    works: string[]
}
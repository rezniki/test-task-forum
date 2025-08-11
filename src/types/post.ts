export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    likes?: number;
    dislikes?: number;
    isFavorite?: boolean;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    liked?: boolean;
    disliked?: boolean;
    favorite?: boolean;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    isAdmin?: boolean
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    phone?: string;
    website?: string;
}


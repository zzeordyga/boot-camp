import type { Timestamp } from "firebase/firestore";

export interface Posts {
    id: string;
    title: string;
    content: string;
    createdAt: Timestamp | null;
}
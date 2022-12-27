import { Timestamp } from "firebase/firestore";

export interface note{
    title: string;
    note: string;
    createdBy: string;
    createdAt: Timestamp;
}
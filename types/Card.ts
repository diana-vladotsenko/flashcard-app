import type { Category } from "./Category";

export type Card = {
    id:number,
    question: string,
    answer: string
    category?: Category
}
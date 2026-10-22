import { z } from "zod";
import type { Dictionary } from "@/lib/i18n";

export const getTaskFormSchema = (translate: Pick<Dictionary, "titleRequired" | "titleTooLong">) =>
    z.object({
        title: z.string().trim().min(1, translate.titleRequired).max(100, translate.titleTooLong),
        dueDate: z.string().nullable(),
    });

export type TaskFormValues = { title: string; dueDate: string | null };
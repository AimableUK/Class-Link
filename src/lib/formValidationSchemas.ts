import z from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional() as z.ZodOptional<z.ZodNumber>,
    name: z
        .string()
        .min(1, { message: "Subject name is required" }),
    teachers: z.array(z.string()) //teachers ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>



export const classSchema = z.object({
    id: z.coerce.number().optional() as z.ZodOptional<z.ZodNumber>,
    name: z
        .string()
        .min(1, { message: "Subject name is required" }),
    capacity: z
        .coerce.number()
        .min(1, { message: "Capacity name is required" }),
    gradeId: z
        .coerce.number()
        .min(1, { message: "Capacity name is required" }),
    supervisorId: z
        .coerce.string().optional()
});

export type ClassSchema = z.infer<typeof classSchema>

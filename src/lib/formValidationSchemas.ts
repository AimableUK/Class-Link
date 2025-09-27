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
    name: z.string().min(1, { message: "Subject name is required" }),
    capacity: z.coerce.number().min(1, { message: "Capacity number is required" }) as z.ZodNumber,
    gradeId: z.coerce.number().min(1, { message: "Grade Id is required" }) as z.ZodNumber,
    supervisorId: z.coerce.string().optional() as z.ZodOptional<z.ZodString>,
});

export type ClassSchema = z.infer<typeof classSchema>


export const teacherSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be at least 20 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" })
        .optional()
        .or(z.literal("")),
    name: z.string().min(1, { message: "First name is required" }),
    surname: z.string().min(1, { message: "Last name is required" }),
    email: z
        .email({ message: "Invalid email address!" })
        .optional()
        .or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    birthday: z.coerce.date({ message: "Birthdat is required" }) as z.ZodDate,
    bloodType: z.string().min(1, { message: "Blood Type is required" }),
    gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),
    subjects: z.array(z.string()).optional()
});

export type TeacherSchema = z.infer<typeof teacherSchema>


export const studentSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be at least 20 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" })
        .optional()
        .or(z.literal("")),
    name: z.string().min(1, { message: "First name is required" }),
    surname: z.string().min(1, { message: "Last name is required" }),
    email: z
        .email({ message: "Invalid email address!" })
        .optional()
        .or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    birthday: z.coerce.date({ message: "Birthdat is required" }) as z.ZodDate,
    bloodType: z.string().min(1, { message: "Blood Type is required" }),
    gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),
    gradeId: z.coerce.number().min(1, { message: "Grade is required" }) as z.ZodNumber,
    classId: z.coerce.number().min(1, { message: "Class is required" }) as z.ZodNumber,
    parentId: z.string().min(1, { message: "Parent Id is required" })
});

export type StudentSchema = z.infer<typeof studentSchema>


export const examSchema = z.object({
    id: z.coerce.number().optional() as z.ZodOptional<z.ZodNumber>,
    title: z
        .string()
        .min(1, { message: "Subject name is required" }),
    startTime: z
        .coerce.date({ message: "Start time is required!" }) as z.ZodDate,
    endTime: z
        .coerce.date({ message: "End time is required!" }) as z.ZodDate,
    lessonId: z
        .coerce.number({ message: "End time is required!" }) as z.ZodNumber,
});

export type ExamSchema = z.infer<typeof examSchema>

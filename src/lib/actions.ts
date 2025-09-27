'use server'

import { revalidatePath } from "next/cache"
import { ClassSchema, ExamSchema, StudentSchema, SubjectSchema, TeacherSchema } from "./formValidationSchemas"
import prisma from "./prisma"
import { clerkClient } from "@clerk/nextjs/server"
import { getRole } from "./utils"

type CurrentState = { success: boolean, error: boolean }

// --- SUBJECT ---
export const createSubject = async (
    currentState: CurrentState,
    data: SubjectSchema) => {

    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map(teacherId => ({ id: teacherId }))
                }
            }
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/subjects')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const updateSubject = async (
    currentState: CurrentState,
    data: SubjectSchema) => {

    try {
        await prisma.subject.update({
            where: {
                id: data?.id
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map(teacherId => ({ id: teacherId }))
                }
            }
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/subjects')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const deleteSubject = async (
    currentState: CurrentState,
    data: FormData) => {

    const id = data.get('id') as string
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id)
            },
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/subjects')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}


// --- CLASS  ---
export const createClass = async (
    currentState: CurrentState,
    data: ClassSchema) => {

    try {
        await prisma.class.create({
            data
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/class')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const updateClass = async (
    currentState: CurrentState,
    data: ClassSchema) => {

    try {
        await prisma.class.update({
            where: {
                id: data?.id
            },
            data
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/class')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const deleteClass = async (
    currentState: CurrentState,
    data: FormData) => {

    const id = data.get('id') as string
    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id)
            },
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/class')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}


// --- TEACHER  ---
export const createTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema) => {

    try {
        const client = await clerkClient()

        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "teacher" }
        });

        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                gender: data.gender,
                birthday: data.birthday,
                subjects: {
                    connect: data.subjects?.map(((subjectId: string) => ({
                        id: parseInt(subjectId)
                    })))
                }
            }
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/teachers')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const updateTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema) => {

    try {
        const client = await clerkClient()

        if (!data.id) {
            return { success: false, error: true }
        }

        const user = await client.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "teacher" }
        });

        await prisma.teacher.update({
            where: {
                id: data.id
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                gender: data.gender,
                birthday: data.birthday,
                subjects: {
                    set: data.subjects?.map(((subjectId: string) => ({
                        id: parseInt(subjectId)
                    })))
                }
            }
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/teachers')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData) => {

    const id = data.get('id') as string
    try {
        const client = await clerkClient()
        await client.users.deleteUser(id);

        await prisma.lesson.updateMany({
            where: { teacherId: id },
            data: { teacherId: null },
        });

        await prisma.teacher.delete({
            where: { id },
        });

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/teachers')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

// --- STUDENT  ---
export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema) => {


    try {
        const classItem = await prisma.class.findUnique({
            where: { id: data.classId },
            include: {
                _count: {
                    select: { students: true }
                }
            }
        })

        if (classItem && classItem.capacity === classItem._count.students) {
            return { success: false, error: true }
        }

        const client = await clerkClient()

        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "student" }
        });

        await prisma.student.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                gender: data.gender,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            },
        });

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/students')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const updateStudent = async (
    currentState: CurrentState,
    data: StudentSchema) => {

    try {
        const client = await clerkClient()

        if (!data.id) {
            return { success: false, error: true }
        }

        const user = await client.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "student" }
        });

        await prisma.student.update({
            where: {
                id: data.id,
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                gender: data.gender,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            },
        });

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/students')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const deleteStudent = async (
    currentState: CurrentState,
    data: FormData) => {

    const id = data.get('id') as string
    try {
        const client = await clerkClient()
        await client.users.deleteUser(id)

        await prisma.student.delete({
            where: { id },
        });

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/students')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

// --- SUBJECT ---
export const createExam = async (
    currentState: CurrentState,
    data: ExamSchema) => {

    const { role, currentUserId } = await getRole()

    try {

        if (role === "teacher") {
            const teacherLesson = await prisma.lesson.findFirst({
                where: {
                    teacherId: currentUserId!,
                    id: data.lessonId
                }
            })

            if (!teacherLesson) {
                return { success: false, error: true }
            }
        }


        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/subjects')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const updateExam = async (
    currentState: CurrentState,
    data: ExamSchema) => {

    const { role, currentUserId } = await getRole()

    try {
        if (role === "teacher") {
            const teacherLesson = await prisma.lesson.findFirst({
                where: {
                    teacherId: currentUserId!,
                    id: data.lessonId
                }
            })

            if (!teacherLesson) {
                return { success: false, error: true }
            }
        }

        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/subjects')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

export const deleteExam = async (
    currentState: CurrentState,
    data: FormData) => {

    const id = data.get('id') as string

    const { role, currentUserId } = await getRole()

    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
                ...(role === "teacher" ? { lesson: { teacherId: currentUserId! } } : {})
            },
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/subjects')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}

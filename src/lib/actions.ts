'use server'

import { revalidatePath } from "next/cache"
import { ClassSchema, SubjectSchema, TeacherSchema } from "./formValidationSchemas"
import prisma from "./prisma"
import { clerkClient } from "@clerk/nextjs/server"

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
        await prisma.teacher.update({
            where: {
                id: data?.id
            },
            data
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
        await prisma.teacher.delete({
            where: {
                id: parseInt(id)
            },
        })

        // for refreshing data from db , but cant be used if we still need the state
        // revalidatePath('/list/teachers')
        return { success: true, error: false }
    } catch (error) {
        console.log(error)
        return { success: false, error: true }
    }
}


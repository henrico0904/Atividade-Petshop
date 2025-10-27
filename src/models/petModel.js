import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const findAll = async() =>{
    return await prisma.pets.findMany({
        orderBy: { nome: 'asc'}
    })
}

export const findById = async(id) => {
    return await prisma.pets.findUnique({
        where: { id: Number(id)}
    })
}

export const create = async (data) => {
    return await prisma.pets.create({
        data: {
            nome: data.nome,
            especie: data.especie,
            idade: data.idade,
            dono: data.dono,
        }
    })
}
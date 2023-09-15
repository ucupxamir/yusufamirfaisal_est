import { prismaClient } from "../src/application/database.js";

export const removeTestKaryawan = async () => {
    await prismaClient.karyawan.deleteMany({})
}

export const createTestKaryawan = async () => {
    await prismaClient.karyawan.create({
        data: {
            nik: '10230001',
            nama: 'test',
            alamat: 'alamat test',
            tgllahir: new Date('1998-09-01').toISOString(),
            divisi: 'IT',
            status: 'Tetap'
        }
    })
}

export const getTestKaryawan = async () => {
    return await prismaClient.karyawan.findFirst({
        where: {
            nama: 'test'
        }
    })
}

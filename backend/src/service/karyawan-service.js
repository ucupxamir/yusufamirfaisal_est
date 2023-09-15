import { validate } from '../validation/validation.js';
import { karyawanValidation } from '../validation/karyawan-validation.js';
import { statusValidation } from '../validation/status-validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { kodeDivisi } from './division-code.js';

const register = async (request) => {
    const karyawan = validate(karyawanValidation, request);

    const kode_divisi = kodeDivisi(karyawan.divisi);

    if (!statusValidation(karyawan.status)) {
        throw new ResponseError(400, 'Status karyawan tidak tersedia.');
    }

    const lastKaryawan = await prismaClient.karyawan.findFirst({
        where: {
            divisi: request.divisi
        },
        orderBy: {
            created_date: 'desc'
        }
    });

    let nomorUrut = '0001';
    if (lastKaryawan) {
        const nomorUrutTerakhir = parseInt(lastKaryawan.nik.slice(-4));
        nomorUrut = (nomorUrutTerakhir + 1).toString().padStart(4, "0");
    }

    const currentYear = new Date().getFullYear().toString().slice(-2);

    karyawan.nik = kode_divisi + currentYear + nomorUrut;

    return prismaClient.karyawan.create({
        data: karyawan,
        select: {
            nik: true,
            nama: true
        }
    });
}

const get = async () => {
    const karyawanList = await prismaClient.karyawan.findMany({
        orderBy: {
            created_date: 'desc'
        }
    })

    return karyawanList;
}

const update = async (nik, request) => {
    const newKaryawan = validate(karyawanValidation, request);

    const kode_divisi = kodeDivisi(newKaryawan.divisi);

    if (!statusValidation(newKaryawan.status)) {
        throw new ResponseError(400, 'Status karyawan tidak tersedia.');
    }

    const oldKaryawan = await prismaClient.karyawan.findUnique({
        where: {
            nik: nik
        }
    });

    if (!oldKaryawan) throw new ResponseError(404, 'Karyawan dengan nik ' + nik + ' tidak ditemukan.');

    if (oldKaryawan.divisi != newKaryawan.divisi) {
        const lastKaryawan = await prismaClient.karyawan.findFirst({
            where: {
                divisi: newKaryawan.divisi
            },
            orderBy: {
                created_date: 'desc'
            }
        });

        let nomorUrut = "0001";
        if (lastKaryawan) {
            const nomorUrutTerakhir = parseInt(lastKaryawan.nik.slice(-4));
            nomorUrut = (nomorUrutTerakhir + 1).toString().padStart(4, "0");
        }

        const currentYear = new Date().getFullYear().toString().slice(-2);

        newKaryawan.nik = kode_divisi + currentYear + nomorUrut;
    }

    return await prismaClient.karyawan.update({
        where: {
            nik: nik
        },
        data: newKaryawan,
        select: {
            nik: true,
            nama: true
        }
    })
}

const remove = async (nik) => {
    const karyawan = await prismaClient.karyawan.findUnique({
        where: {
            nik: nik
        }
    });

    if (!karyawan) throw new ResponseError(404, 'Karyawan dengan nik ' + nik + ' tidak ditemukan.');

    return prismaClient.karyawan.delete({
        where: {
            nik: nik
        }
    });
}

export default {
    register,
    get,
    update,
    remove
}
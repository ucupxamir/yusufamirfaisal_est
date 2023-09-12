const { sequelize } = require("../models");
const KaryawanRepository = require("../repositories/KaryawanRepository");
const kodeDivisi = require("./DivisionCode");

class KaryawanService {

    async create(request) {
        let t = await sequelize.transaction();
        try {
            const karyawanTerakhir = await KaryawanRepository.findByDivisi(request.divisi, { transaction: t });

            let nomorUrut = "0001";
            if (karyawanTerakhir) {
                const nomorUrutTerakhir = parseInt(karyawanTerakhir.nik.slice(-4));
                nomorUrut = (nomorUrutTerakhir + 1).toString().padStart(4, "0");
            }

            const kode_divisi = kodeDivisi(request.divisi);

            const currentYear = new Date().getFullYear().toString().slice(-2);

            request.nik = kode_divisi + currentYear + nomorUrut;

            await KaryawanRepository.create(request, { transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            console.error(error);
            throw error;
        }
    }

    async findAll() {
        try {
            const karyawans = await KaryawanRepository.findAll();
            return karyawans;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(nik, request) {
        let t = await sequelize.transaction();
        try {
            const existingKaryawan = await KaryawanRepository.findByNik(nik, { transaction: t });

            if (!existingKaryawan) {
                throw new Error("karyawan dengan NIK " + nik + " tidak ditemukan.");
            }

            if (existingKaryawan.divisi !== request.divisi) {
                const karyawanTerakhir = await KaryawanRepository.findByDivisi(request.divisi, { transaction: t });

                let nomorUrut = "0001";
                if (karyawanTerakhir) {
                    const nomorUrutTerakhir = parseInt(karyawanTerakhir.nik.slice(-4));
                    nomorUrut = (nomorUrutTerakhir + 1).toString().padStart(4, "0");
                }

                const kode_divisi = kodeDivisi(request.divisi);

                const currentYear = new Date().getFullYear().toString().slice(-2);
    
                request.nik = kode_divisi + currentYear + nomorUrut;
            }

            await KaryawanRepository.update(nik, request, { transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            console.error(error);
            throw error;
        }
    }

    async destroy(nik) {
        try {
            await KaryawanRepository.destroy(nik);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = new KaryawanService();
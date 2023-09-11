const { sequelize } = require("../models");
const KaryawanRepository = require("../repositories/KaryawanRepository");

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

            let kode_divisi;
            if (request.divisi == "IT") {
                kode_divisi = "10"
            } else if (request.divisi == "HRD") {
                kode_divisi = "11"
            } else if (request.divisi == "FINANCE") {
                kode_divisi = "12"
            }

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

    async update(nik, karyawanRequest) {
        let t = await sequelize.transaction();
        try {
            const existingKaryawan = await KaryawanRepository.findByNik(nik, { transaction: t });

            if (!existingKaryawan) {
                throw new Error("karyawan dengan NIK " + nik + " tidak ditemukan.");
            }

            await KaryawanRepository.update(nik, karyawanRequest, { transaction: t });
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
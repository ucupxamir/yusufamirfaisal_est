const { Karyawan } = require("../models");

class KaryawanRepository {

    async create(karyawanRequest) {
        const karyawan = await Karyawan.create(karyawanRequest);
        return karyawan;
    }

    async findAll() {
        const karyawans = await Karyawan.findAll();
        return karyawans;
    }

    async findByNik(nik) {
        const karyawan = await Karyawan.findByPk(nik);
        return karyawan
    }

    async update(nik, karyawanRequest) {
        const karyawan = await Karyawan.update(karyawanRequest, {
            where: {
                nik
            }
        });
        return karyawan;
    }

    async destroy(nik) {
        await Karyawan.destroy({
            where: {
                nik
            }
        })
    }

    async findByDivisi(divisi) {
        const karyawan = await Karyawan.findOne({
            where: {
                divisi: divisi
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        return karyawan;
    }

}

module.exports = new KaryawanRepository();
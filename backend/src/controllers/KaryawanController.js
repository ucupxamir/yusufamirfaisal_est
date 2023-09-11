const Router = require("express");
const KaryawanService = require("../services/KaryawanService");
const KaryawanRouter = Router();

KaryawanRouter.post("/", async (req, res) => {
    try {
        await KaryawanService.create(req.body);
        res.status(200).json({
            status: "success",
            message: "Berhasil menambahkan karyawan."
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
});

KaryawanRouter.get("/", async (req, res) => {
    try {
        const data = await KaryawanService.findAll();
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
});

KaryawanRouter.post("/:nik", async (req, res) => {
    try {
        await KaryawanService.update(req.params.nik, req.body);

        res.status(200).json({
            status: "success",
            message: "Berhasil update data karyawan."
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
})

KaryawanRouter.delete("/:nik", async (req, res) => {
    try {
        await KaryawanService.destroy(req.params.nik);

        res.status(200).json({
            status: "success",
            message: "Berhasil menghapus karyawan."
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
})

module.exports = KaryawanRouter;
import karyawanService from '../service/karyawan-service.js';

const register = async (req, res, next) => {
    try {
        const result = await karyawanService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const result = await karyawanService.get();
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await karyawanService.update(req.params.nik, req.body);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await karyawanService.remove(req.params.nik);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default { 
    register,
    get,
    update,
    remove 
}
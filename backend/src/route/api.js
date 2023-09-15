import express from 'express';
import karyawanController from '../controller/karyawan-controller.js';

const router = new express.Router();
router.post('/api/karyawan', karyawanController.register);
router.get('/api/karyawan', karyawanController.get);
router.post('/api/karyawan/:nik', karyawanController.update);
router.delete('/api/karyawan/:nik', karyawanController.remove);

export {
    router
}
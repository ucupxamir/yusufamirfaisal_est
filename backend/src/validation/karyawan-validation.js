import Joi from 'joi';

const karyawanValidation = Joi.object({
    nama: Joi.string().max(150).required(),
    alamat: Joi.string().required(),
    tgllahir: Joi.date().required(),
    divisi: Joi.string().max(20).required(),
    status: Joi.string().max(20).required()
});

export { karyawanValidation }
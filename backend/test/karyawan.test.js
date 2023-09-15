import supertest from 'supertest';
import { prismaClient } from "../src/application/database.js";
import { web } from '../src/application/web.js';
import { logger } from '../src/application/logging.js';
import { createTestKaryawan, removeTestKaryawan, getTestKaryawan } from './test-utils.js';

describe('POST /api/karyawan', function () {
    afterEach(async () => {
        await removeTestKaryawan();
    })

    it('should can be register new karyawan', async () => {
        const result = await supertest(web)
            .post('/api/karyawan')
            .send({
                nama: 'test',
                alamat: 'alamat test',
                tgllahir: '1998-09-01',
                divisi: 'IT',
                status: 'Tetap'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.nik).toBe('10230001')
        expect(result.body.data.nama).toBe('test')
    });

    it('should reject if register is invalid', async () => {
        const result = await supertest(web)
            .post('/api/karyawan')
            .send({
                nama: '',
                alamat: '',
                tgllahir: null,
                divisi: '',
                status: ''
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if divisi is not available', async () => {
        const result = await supertest(web)
            .post('/api/karyawan')
            .send({
                nama: 'test',
                alamat: 'test',
                tgllahir: '1998-09-01',
                divisi: 'DIREKTUR',
                status: 'Tetap'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBe("Divisi tidak tersedia.");
    });

    it('should reject if status is not available', async () => {
        const result = await supertest(web)
            .post('/api/karyawan')
            .send({
                nama: 'test',
                alamat: 'test',
                tgllahir: '1998-09-01',
                divisi: 'IT',
                status: 'Freelance'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBe("Status karyawan tidak tersedia.");
    });
})

describe('GET /api/karyawan', function () {
    beforeEach(async () => {
        await createTestKaryawan();
    });

    afterEach(async () => {
        await removeTestKaryawan();
    });

    it('should can get all karyawan', async () => {
        const result = await supertest(web)
            .get('/api/karyawan')

        expect(result.status).toBe(200)
        expect(result.body.data[0].nik).toBe('10230001')
        expect(result.body.data[0].nama).toBe('test')
        expect(result.body.data[0].alamat).toBe('alamat test')
        expect(result.body.data[0].tgllahir).toBe(new Date('1998-09-01').toISOString())
        expect(result.body.data[0].divisi).toBe('IT')
        expect(result.body.data[0].status).toBe('Tetap')
    })
})

describe('POST /api/karyawan/:nik', function () {
    beforeEach(async () => {
        await createTestKaryawan();
    })

    afterEach(async () => {
        await removeTestKaryawan();
    })

    it('should can be update karyawan', async () => {
        const testKaryawan = await getTestKaryawan();

        const result = await supertest(web)
            .post('/api/karyawan/' + testKaryawan.nik)
            .send({
                nama: 'test update',
                alamat: 'alamat test',
                tgllahir: '1998-09-01',
                divisi: 'HRD',
                status: 'Tetap'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.nik).toBe('11' + new Date().getFullYear().toString().slice(-2) + '0001')
        expect(result.body.data.nama).toBe('test update')
    });

    it('should reject if input is invalid', async () => {
        const testKaryawan = await getTestKaryawan();

        const result = await supertest(web)
            .post('/api/karyawan/' + testKaryawan.nik)
            .send({
                nama: '',
                alamat: '',
                tgllahir: '',
                divisi: '',
                status: ''
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if divisi is not available', async () => {
        const testKaryawan = await getTestKaryawan();

        const result = await supertest(web)
            .post('/api/karyawan/' + testKaryawan.nik)
            .send({
                nama: 'test update',
                alamat: 'alamat test',
                tgllahir: '1998-09-01',
                divisi: 'SALES',
                status: 'Tetap'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBe("Divisi tidak tersedia.");
    });

    it('should reject if status is not available', async () => {
        const testKaryawan = await getTestKaryawan();
        const result = await supertest(web)
            .post('/api/karyawan/' + testKaryawan.nik)
            .send({
                nama: 'test update',
                alamat: 'test',
                tgllahir: '1998-09-01',
                divisi: 'IT',
                status: 'Freelance'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBe("Status karyawan tidak tersedia.");
    });

    it('should reject if karyawan is not found', async () => {
        const result = await supertest(web)
            .post('/api/karyawan/10990001')
            .send({
                nama: 'test update',
                alamat: 'test',
                tgllahir: '1998-09-01',
                divisi: 'IT',
                status: 'Tetap'
            })

        expect(result.status).toBe(404)
        expect(result.body.errors).toBe("Karyawan dengan nik 10990001 tidak ditemukan.");
    });
})

describe('DELETE /api/karyawan/:nik', function () {
    beforeEach(async () => {
        await createTestKaryawan();
    })

    it('should be remove karyawan', async () => {
        const getKaryawan = await getTestKaryawan();
        const result = await supertest(web)
            .delete('/api/karyawan/' + getKaryawan.nik)

        expect(result.status).toBe(200)
        expect(result.body.data.nik).toBe('10230001')
    })

    it('should reject if karyawan is not found', async () => {
        const result = await supertest(web)
            .delete('/api/karyawan/10990001')

        expect(result.status).toBe(404)
        expect(result.body.errors).toBe("Karyawan dengan nik 10990001 tidak ditemukan.");
    })
})
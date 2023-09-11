import axios from "axios";

const KARYAWAN_API_ENDPOINT = "http://localhost:4000/api/karyawan";

class KaryawanService {

    create(data) {
        return axios.post(KARYAWAN_API_ENDPOINT, data);
    }

    findAll() {
        return axios.get(KARYAWAN_API_ENDPOINT);
    }

    update(nik, data) {
        return axios.post(KARYAWAN_API_ENDPOINT + "/" + nik, data);
    }

    destroy(nik) {
        return axios.delete(KARYAWAN_API_ENDPOINT + "/" + nik)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new KaryawanService();
import { ResponseError } from "../error/response-error.js";

export const kodeDivisi = (divisi) => {
    let kode_divisi;
    if (divisi == "IT") {
        kode_divisi = "10"
    } else if (divisi == "HRD") {
        kode_divisi = "11"
    } else if (divisi == "FINANCE") {
        kode_divisi = "12"
    } else {
        throw new ResponseError(400, 'Divisi tidak tersedia.')
    }
    return kode_divisi;
}
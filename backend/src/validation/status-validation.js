export const statusValidation = (status) => {
    if (status != 'Tetap' && status != 'Kontrak') {
       return false
    }

    return true
}
export const validateExist = (data: {}) => {
    return Object.values(data).every(val => {
        return val !== null && val !== undefined && val !== "";
    })
}
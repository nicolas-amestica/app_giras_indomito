import { validate, clean } from 'rut.js';

export const validateRut = async (rut) => {
    try {
        const validateRut = validate(rut);
        if (!validateRut) return "Rut inválido";
        return clean(rut);
    } catch (error) {
        return { error };
    }
}



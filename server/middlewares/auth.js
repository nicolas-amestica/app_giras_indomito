import dotenv from 'dotenv';
import moment from "moment";
import jwt from "jsonwebtoken";

dotenv.config();

export const isAuth = (req, res, next) => {

    try {
        if (!req.headers.authorization)
            throw { message: "No tiene autorización", code: 403 };

        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_TOKEN);

        if (!payload)
            throw { message: "No tiene autorización", code: 403 };

        if (payload.exp <= moment().unix())
            throw { message: "El token a expirado", code: 401 };

        req.funcionary = {
            rut: payload.rut,
            roles: payload.rol,
            correo: payload.correo,
            activo: payload.activo,
            fecha_registro: payload.fecha_registro
        };

        next();
    } catch (err) {
        console.log(err);        
        return res.status(err?.code || 500).send({ message: "No se pudo autenticcar el usuario", error: err });
    }

}



export const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles)
            return res.status(403).json({ message: 'El rol es requerido' });

        const userRoles = req.funcionary.roles;
        if (!roles.includes(userRoles))
            return res.status(403).json({ message: 'Su rol no tiene acceso a este recurso' });
        next();
    };

};


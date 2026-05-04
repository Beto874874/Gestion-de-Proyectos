const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    
    const usuario = req.user; // viene del token

    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({
        msg: 'Acceso denegado: no tienes permisos'
      });
    }

    next();
  };
};

module.exports = verificarRol;

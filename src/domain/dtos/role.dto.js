// Objetivo: Definir el DTO para la entidad Role
const roleDTO = (role) => {
  return {
    id: role.id,
    name: role.name,
  };
};


module.exports = roleDTO;
// Desc: DTO for user entity
const userDTO = (user) => {
  let roles = [];
  
  if (user.roles && user.roles.length > 0 ) {
    roles = user.roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
      };
    });
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: roles,
  };
};


module.exports = userDTO;
const user_repository = require("../repositories/user.repository");
const role_service = require("../services/role.service");
const ErrorCodes = require("../utils/errors/error.codes");
const ServiceError = require("../utils/errors/service.error");
const Transactions = require("../repositories/transaction.repository");
const {
  ASSING_ROLE,
  DELETE_ROLE,
} = require("../utils/constants/operationRoles.util");

const updatingRoles = async (userId, roleId, operation) => {
  const t = await Transactions.starTransaction();
  try {
    const user = await user_repository.findById(userId);
    if (!user) {
      throw new ServiceError("User not exist", ErrorCodes.USER.NOT_FOUND);
    }
    const role = await role_service.findById(roleId);

    if (operation === ASSING_ROLE) {
      await user.addRole(role, t);
    } else if (operation === DELETE_ROLE) {
      await user.removeRole(role, t);
    } else {
      throw new ServiceError(
        "Operation not valid",
        ErrorCodes.OPERATION.NOT_VALID
      );
    }

    const updateUser = await user.reload({
      include: ["roles"],
      through: { attributes: [] },
    });
    await Transactions.commitTransaction(t);

    return updateUser;
  } catch (e) {
    await Transactions.rollbackTransaction(t);
    throw new ServiceError(
      e.message || "Error assing role",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  updatingRoles,
};

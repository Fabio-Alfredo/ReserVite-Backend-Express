const { sequelize } = require("../domain/models");

class TransactionRepository {
  static async starTransaction() {
    return await sequelize.transaction();
  }

  static async commitTransaction(t) {
    await t.commit();
  }

  static async rollbackTransaction(t) {
    await t.rollback();
  }
}

module.exports = TransactionRepository;

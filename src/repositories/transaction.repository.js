const { sequelize } = require('../domain/models');

/**
 * Repositorio de transacciones
 */

class TransactionRepository {
  /**
   * Inicia una transacción
   * @returns {Promise<*>} - Transacción de la base de datos
   */
  static async starTransaction() {
    return await sequelize.transaction();
  }

  /**
   * Confirma una transacción
   * @param {Object} t - Transacción de la base de datos
   * @return {Promise<*>} - Transacción confirmada
   */
  static async commitTransaction(t) {
    await t.commit();
  }

  /**
   * Revierte una transacción
   * @param {Object} t - Transacción de la base de datos
   * @return {Promise<*>} - Transacción revertida
   */
  static async rollbackTransaction(t) {
    await t.rollback();
  }
}

module.exports = TransactionRepository;

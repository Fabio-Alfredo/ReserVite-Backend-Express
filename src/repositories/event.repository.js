const { Events } = require("../domain/models");
const { Op } = require("sequelize");

/**
 * Añade un nuevo evento a la base de datos
 *
 * @param {Object} event - Datos del evento
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Evento creado
 */
const create = async (event, t) => {
  const newEvent = await Events.create(event, { transaction: t });
  return newEvent;
};

/**
 * Busca un evento por su id
 *
 * @param {string} id - Id del evento
 * @returns {Promise<*>} - Evento encontrado
 */
const findById = async (id) => {
  const event = await Events.findByPk(id);
  return event;
};

/**
 * Busca todos los eventos
 *
 * @returns {Promise<*>} - Eventos encontrados
 */
const findAll = async () => {
  const events = await Events.findAll();
  return events;
};

const existEvent = async (initial_date, end_date, location) => {
  const event = await Events.findOne({
    where: {
      location: location,
      [Op.or]: [
        {
          initial_date: {
            [Op.between]: [initial_date, end_date],
          },
        },
        {
          end_date: {
            [Op.between]: [initial_date, end_date],
          },
        },
      ],
    },
  });
  return event;
};

/**
 * Busca un evento por su título
 *
 * @param {string} title - Título del evento
 * @returns {Promise<*>} - Evento encontrado
 */
const findByTitle = async (title) => {
  const event = await Events.findOne({
    where: { title },
  });
  return event;
};

/**
 * Busca un evento por su organizador
 *
 * @param {string} organizer - Id del organizador
 * @returns {Promise<*>} - Evento encontrado
 */
const findByOrganizer = async (organizer) => {
  const event = await Events.findOne({
    where: { organizer_id: organizer },
  });
  return event;
};

/**
 * Guarda los cambios realizados en un evento
 *
 * @param {Object} event - Datos del evento
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Evento actualizado
 */
const save = async (event, t) => {
  await event.save({ transaction: t });
  return event;
};

/**
 * Actualiza los datos de un evento
 *
 * @param {string} id - Id del evento
 * @param {Object} data - Datos del evento
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<*>} - Evento actual
 */
const update = async (id, data, t) => {
  const event = await Events.update(data, {
    where: { id },
    transaction: t,
  });
  return event;
};

/**
 * Elimina un evento por su id
 *
 * @param {string} id - Id del evento
 * @param {Object} t - Transacción de la base de datos
 * @returns {Promise<boolean>} - confirmación de eliminación
 */
const remove = async (id, t) => {
  await Events.destroy({ where: { id }, transaction: t });
  return true;
};

module.exports = {
  create,
  findById,
  findAll,
  findByTitle,
  findByOrganizer,
  save,
  update,
  remove,
  existEvent,
};

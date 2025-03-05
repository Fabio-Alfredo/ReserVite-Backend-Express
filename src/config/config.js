require('dotenv').config();

const {
  PORT,
  DB_DATABASE_NAME,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  NODE_ENV,
  SECRET_KEY_JWT,
} = process.env;

const validatorEnv = (env, name) => {
  if (!env) throw new Error('The ' + name + ' is not defined');

  return env;
};

const config = {
  development: {
    port: validatorEnv(PORT, 'PORT'),
    secret_key_jwt: validatorEnv(SECRET_KEY_JWT, 'SECRET_KEY_JWT'),
    db: {
      database: validatorEnv(DB_DATABASE_NAME, 'DB_DATABASE_NAME'),
      username: validatorEnv(DB_USER_NAME, 'DB_USER_NAME'),
      password: validatorEnv(DB_PASSWORD, 'DB_PASSWORD'),
      host: validatorEnv(DB_HOST, 'DB_HOST'),
      dialect: validatorEnv(DB_DIALECT, 'DB_DIALECT'),
    },
  },
  production: {
    port: validatorEnv(PORT, 'PORT'),
  },
  node_env: validatorEnv(NODE_ENV, 'NODE_ENV'),
};

module.exports = config;

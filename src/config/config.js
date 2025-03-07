require("dotenv").config();

const {
  PORT,
  DB_DATABASE_NAME,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  NODE_ENV,
  SECRET_KEY_JWT,
  COMPANY_NAME,
  COMPANY_EMAIL,
  COMPANY_PASSWORD_EMAIL,
  SECRET_KEY_RECOVERY_JWT,
} = process.env;

const validatorEnv = (env, name) => {
  if (!env) throw new Error("The " + name + " is not defined");
  return env;
};

const config = {
  development: {
    node_env: validatorEnv(NODE_ENV, "NODE_ENV") || "development",
    port: validatorEnv(PORT, "PORT"),
    secret_key_jwt: validatorEnv(SECRET_KEY_JWT, "SECRET_KEY_JWT"),
    secret_key_recovery_jwt: validatorEnv(
      SECRET_KEY_RECOVERY_JWT,
      "SECRET_KEY_RECOVERY"
    ),
    db: {
      database: validatorEnv(DB_DATABASE_NAME, "DB_DATABASE_NAME"),
      username: validatorEnv(DB_USER_NAME, "DB_USER_NAME"),
      password: validatorEnv(DB_PASSWORD, "DB_PASSWORD"),
      host: validatorEnv(DB_HOST, "DB_HOST"),
      dialect: validatorEnv(DB_DIALECT, "DB_DIALECT"),
    },
    email: {
      company_name: validatorEnv(COMPANY_NAME, "COMPANY_NAME"),
      company_email: validatorEnv(COMPANY_EMAIL, "COMPANY_EMAIL"),
      company_password_email: validatorEnv(
        COMPANY_PASSWORD_EMAIL,
        "COMPANY_PASSWORD_EMAIL"
      ),
    },
  },
  production: {
    node_env: validatorEnv(NODE_ENV, "NODE_ENV") || "development",
    port: validatorEnv(PORT, "PORT"),
    secret_key_jwt: validatorEnv(SECRET_KEY_JWT, "SECRET_KEY_JWT"),
    secret_key_recovery_jwt: validatorEnv(
      SECRET_KEY_RECOVERY_JWT,
      "SECRET_KEY_RECOVERY"
    ),
    db: {
      database: validatorEnv(DB_DATABASE_NAME, "DB_DATABASE_NAME"),
      username: validatorEnv(DB_USER_NAME, "DB_USER_NAME"),
      password: validatorEnv(DB_PASSWORD, "DB_PASSWORD"),
      host: validatorEnv(DB_HOST, "DB_HOST"),
      dialect: validatorEnv(DB_DIALECT, "DB_DIALECT"),
    },
    email: {
      company_name: validatorEnv(COMPANY_NAME, "COMPANY_NAME"),
      company_email: validatorEnv(COMPANY_EMAIL, "COMPANY_EMAIL"),
      company_password_email: validatorEnv(
        COMPANY_PASSWORD_EMAIL,
        "COMPANY_PASSWORD_EMAIL"
      ),
    },
  },
};

const currentConfig = config[NODE_ENV] || config.development;

module.exports = currentConfig;

const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(4001),
    DB_DIALECT: Joi.string().required().description('Postgres DB dialect'),
    DB_HOST: Joi.string().required().description('DB host'),
    DB_PORT: Joi.string().required().description('DB port'),
    DB_USER: Joi.string().required().description('DB user'),
    DB_PASSWORD: Joi.string().required().description('DB password'),
    DB_NAME: Joi.string().required().description('DB name'),
    DB_SSL: Joi.string().required().description('DB ssl'),
    DB_ADMIN_USER: Joi.string().required().description('DB admin user'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    IDRIVE_ENDPOINT: Joi.string().description('iDrive endpoint'),
    IDRIVE_REGION: Joi.string().description('iDrive region'),
    IDRIVE_ACCESS_KEY: Joi.string().description('iDrive access key'),
    IDRIVE_SECRET_KEY: Joi.string().description('iDrive secret key'),
    IDRIVE_BUCKET_NAME: Joi.string().description('iDrive bucket name'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  database: {
    dialect: envVars.DB_DIALECT,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    name: envVars.DB_NAME,
    ssl: envVars.DB_SSL,
    adminUser: envVars.DB_ADMIN_USER,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: envVars.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  },
  idrive: {
    endpoint: envVars.IDRIVE_ENDPOINT,
    region: envVars.IDRIVE_REGION,
    accessKeyId: envVars.IDRIVE_ACCESS_KEY,
    secretAccessKey: envVars.IDRIVE_SECRET_KEY,
    bucketName: envVars.IDRIVE_BUCKET_NAME,
  },
};

const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport({
  ...config.email.smtp,
  logger: true,
  debug: true,
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
});

if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  // Validate parameters
  if (typeof to !== 'string' || typeof subject !== 'string' || typeof text !== 'string') {
    throw new Error('Invalid parameters. Expected strings for "to", "subject", and "text".');
  }

  try {
    const msg = { from: config.email.smtp.from, to, subject, text };

    await transport.sendMail(msg);

    console.log('Email sent successfully.');
    return true; // or some other success indicator
  } catch (error) {
    console.error('Error sending email:', error);
    return false; // or handle error in another way
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.fe_url}/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Creates a new activation token to send via email using email of user.
 * Get all data via parameter using emailData for new email.
 * @param  {} emailData
 */
const sendEmailActivation = async (emailData, token) => {
  // create a link to activate the user

  const link = `${config.fe_url}/activate-user/?token=${token.verify_email.token}`;
  const output = `
        <p>Bienvenido ${emailData.name}!</p>
        <p>Hemos recibido su información personal satisfactoriamente. Por favor confirmar su deseo de ser parte de Weblox seleccionado el siguiente boton con un click:</p>
        <table style="margin:0 auto;">
          <tr>
              <td style="background-color: rgb(18,126,177);border-radius: 5px;padding: 10px;text-align: center;">
                  <a style="display: block;color: #ffffff;font-size: 12px;text-decoration: none;text-transform: uppercase;" target="_blank" href="${link}">
                  Activar Usuario</a>
              </td>
          </tr>
        </table>
        <h3>Datos registrados en Weblox:</h3>
        <ul>
            <li>Nombre: ${emailData.name}</li>
            <li>Usuario: ${emailData.id}</li>
            <li>Email: ${emailData.email}</li>
        </ul>
        <p>Si desea modificar algun dato personal porfavor hacerlo por medio de la aplicación Weblox. \nAdemás, si desea saber más o reportar algun problema por favor utilizar el siguiente enlace: <a href='${config.fe_url}' target="_blank" style="">Weblox</a></p>
        `;

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Weblox" <support@softstoic.com>', // sender address
    to: emailData.email, // list of receivers
    subject: 'Bienvenido a Weblox', // Subject line
    text: `hola ${emailData.name}!, te escribo desde Weblox.`, // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  await transport.sendMail(mailOptions);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${config.fe_url}/activate-user?token=${token.refresh.token}`;
  const text = `Dear user,
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);

  // sendEmailActivation('', token.verify_email.token);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailActivation,
};

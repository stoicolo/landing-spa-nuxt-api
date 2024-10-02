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
  const link = `${config.fe_url}/activate-user/?token=${token.verify_email.token}`;

  // Asumimos que la imagen del logo está alojada en un servidor web accesible
  const logoUrl = `${config.fe_url}/images/logo-weblox.png`;

  const output = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a Weblox</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px;">
        <tr>
          <td align="center">
            <img src="${logoUrl}" alt="Weblox Logo" style="max-width: 200px; margin-bottom: 20px;">
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="color: #127eb1; text-align: center;">Bienvenido a Weblox<span style="font-size: 60%; vertical-align: top;">®</span> ${emailData.name}!</h1>
            <p style="text-align: center;">Hemos recibido su información personal satisfactoriamente. Por favor confirme su deseo de ser parte de Weblox seleccionando el siguiente botón:</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <a href="${link}" style="background-color: #127eb1; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Activar Usuario</a>
                </td>
              </tr>
            </table>
            <h2 style="color: #127eb1;">Datos registrados en Weblox:</h2>
            <ul style="list-style-type: none; padding-left: 0;">
              <li><strong>Nombre:</strong> ${emailData.name}</li>
              <li><strong>Email:</strong> ${emailData.email}</li>
            </ul>
            <p>Si desea modificar algún dato personal, por favor hágalo por medio de la aplicación Weblox.</p>
            <p>Además, si desea saber más o reportar algún problema, por favor utilice el siguiente enlace: <a href="${config.fe_url}" style="color: #127eb1; text-decoration: none;">Weblox</a></p>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; padding-top: 20px; font-size: 12px; color: #666;">
            <p>&copy; 2023 Weblox<span style="font-size: 60%; vertical-align: top;">®</span>. Todos los derechos reservados.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Weblox" <support@softstoic.com>', // sender address
    to: emailData.email, // list of receivers
    subject: 'Bienvenido a Weblox', // Subject line
    text: `Hola ${emailData.name}! Te damos la bienvenida a Weblox. Por favor, activa tu cuenta visitando: ${link}`, // plain text body
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

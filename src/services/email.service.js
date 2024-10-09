const nodemailer = require('nodemailer');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

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
  const user = await userService.getUserByEmail(to);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado, verifica el id.');
  }

  const subject = 'Restablecimiento de contraseña - Weblox';
  const resetPasswordUrl = `${config.fe_url}/reset-password?token=${token}`;

  const logoUrl = `https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/platform/weblox-logo-name.png`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecimiento de contraseña - Weblox</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dddddd; padding: 20px;">
        <tr>
          <td align="center">
            <img src="${logoUrl}" alt="Weblox Logo" style="max-width: 200px; margin-bottom: 20px;">
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="color: #127eb1; text-align: center;">Restablecimiento de contraseña</h1>
            <p style="color: #333; text-align: center;">Estimado/a ${user.name},</p>
            <p style="color: #333; text-align: center;">Hemos recibido una solicitud para restablecer la contraseña de su cuenta Weblox<span style="font-size: 60%; vertical-align: top;">®</span>. Si usted no ha realizado esta solicitud, por favor ignore este correo.</p>
            <p style="color: #333; text-align: center;">Para proceder con el restablecimiento de su contraseña, por favor haga clic en el siguiente botón:</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <a href="${resetPasswordUrl}" style="background-color: #127eb1; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Restablecer Contraseña</a>
                </td>
              </tr>
            </table>
            <p style="color: #333; text-align: center;">Si el botón no funciona, puede copiar y pegar el siguiente enlace en su navegador:</p>
            <p style="text-align: center;"><a href="${resetPasswordUrl}" style="color: #333; word-break: break-all;">${resetPasswordUrl}</a></p>
            <p style="color: #333; text-align: center;">Por razones de seguridad, este enlace expirará en 24 horas.</p>
            <p style="color: #333; text-align: center;">Si necesita ayuda o tiene alguna pregunta, no dude en contactarnos a través de nuestro sitio web: <a href="${config.fe_url}" style="color: #127eb1; text-decoration: none;">Weblox</a></p>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; padding-top: 20px; font-size: 12px; color: #666;">
            <p>&copy; 2024 Weblox<span style="font-size: 60%; vertical-align: top;">®</span>. Todos los derechos reservados.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const textContent = `
    Estimado/a ${user.name},

    Hemos recibido una solicitud para restablecer la contraseña de su cuenta Weblox®. Si usted no ha realizado esta solicitud, por favor ignore este correo.

    Para proceder con el restablecimiento de su contraseña, por favor visite el siguiente enlace:

    ${resetPasswordUrl}

    Por razones de seguridad, este enlace expirará en 24 horas.

    Si necesita ayuda o tiene alguna pregunta, no dude en contactarnos a través de nuestro sitio web: ${config.fe_url}

    Atentamente,
    El equipo de Weblox
  `;

  const mailOptions = {
    from: `Weblox <${config.email.smtp.from}>`,
    to,
    subject,
    text: textContent,
    html: htmlContent,
  };

  await transport.sendMail(mailOptions);
};

/**
 * Creates a new activation token to send via email using email of user.
 * Get all data via parameter using emailData for new email.
 * @param  {} emailData
 */
const sendEmailActivation = async (emailData, token) => {
  const link = `${config.fe_url}/activate-user/?token=${token.verify_email.token}`;

  // Asumimos que la imagen del logo está alojada en un servidor web accesible
  const logoUrl = `https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/platform/weblox-logo-name.png`;

  const output = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a Weblox</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dddddd; padding: 20px;">
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
    from: `Weblox <${config.email.smtp.from}>`, // sender address
    to: emailData.email, // list of receivers
    subject: 'Bienvenido a Weblox', // Subject line
    text: `Hola ${emailData.name}! Te damos la bienvenida a Weblox. Por favor, activa tu cuenta visitando: ${link}`, // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  await transport.sendMail(mailOptions);
};

/**
 * Send a response email to the client after submitting the contact form.
 * @param  {} payload
 * @returns {Promise}
 * @param  {} payload.receptorEmail
 * @param  {} payload.clientEmail
 * @param  {} payload.name
 * @param  {} payload.phone
 *  @param  {} payload.message
 * @returns {Promise}
//  */
const sendContactFormResponseEmail = async (payload) => {
  const { receptorEmail, clientEmail, name, phone, message, domain } = payload;

  const subject = `hola! Somos ${domain}, Hemos recibido su mensaje.`;

  const logoUrl = `https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/platform/weblox-logo-name.png`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hemos recibido su mensaje - Weblox</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dddddd; padding: 20px;">
        <tr>
          <td align="center">
            <img src="${logoUrl}" alt="Weblox Logo" style="max-width: 200px; margin-bottom: 20px;">
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="color: #127eb1; text-align: center;">Hemos recibido su mensaje</h1>
            <p style="color: #333; text-align: center;">Estimado/a ${name},</p>
            <p style="color: #333; text-align: center;">Gracias por ponerse en contacto con nosotros a través de nuestro formulario. Hemos recibido su mensaje y le responderemos lo antes posible.</p>
            <p style="color: #333; text-align: center;">Estos son los detalles que nos ha proporcionado:</p>
            <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f8f8f8; margin: 20px 0;">
              <tr>
                <td style="border-bottom: 1px solid #ddd;"><strong>Nombre:</strong> ${name}</td>
              </tr>
              <tr>
                <td style="border-bottom: 1px solid #ddd;"><strong>Email:</strong> ${clientEmail}</td>
              </tr>
              <tr>
                <td style="border-bottom: 1px solid #ddd;"><strong>Teléfono:</strong> ${phone}</td>
              </tr>
              <tr>
                <td><strong>Mensaje:</strong> ${message}</td>
              </tr>
            </table>
            <p style="color: #333; text-align: center;">Si necesita información adicional o tiene alguna otra pregunta, no dude en contactarnos a través de nuestro sitio web: <a href="${config.fe_url}" style="color: #127eb1; text-decoration: none;">Weblox</a></p>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; padding-top: 20px; font-size: 12px; color: #666;">
            <p>&copy; 2024 Weblox<span style="font-size: 60%; vertical-align: top;">®</span>. Todos los derechos reservados.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const textContent = `
    Estimado/a ${name},

    Gracias por ponerse en contacto con nosotros a través de nuestro formulario. Hemos recibido su mensaje y le responderemos lo antes posible.

    Estos son los detalles que nos ha proporcionado:
    Nombre: ${name}
    Email: ${clientEmail}
    Teléfono: ${phone}
    Mensaje: ${message}

    Si necesita información adicional o tiene alguna otra pregunta, no dude en contactarnos a través de nuestro sitio web: ${config.fe_url}

    Atentamente,
    El equipo de Weblox
  `;

  const mailOptions = {
    from: `Weblox <${config.email.smtp.from}>`,
    to: [receptorEmail, clientEmail],
    subject,
    text: textContent,
    html: htmlContent,
  };

  await transport.sendMail(mailOptions);
};

const sendSubdomainEmail = async (payload, token) => {
  const { clientEmail, clientName, subdomainUrl, paymentsProviderUrl } = payload;
  const subdomainEditorUrlWithToken = `${subdomainUrl}/login/?token=${token}`;
  const subdomainWebsiteUrlWithToken = `${subdomainUrl}/?token=${token}`;

  const subject = `¡Bienvenido a su prueba de Weblox!`;

  const logoUrl = `https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/platform/weblox-logo-name.png`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a su prueba de Weblox</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dddddd; padding: 20px;">
        <tr>
          <td align="center">
            <img src="${logoUrl}" alt="Weblox Logo" style="max-width: 200px; margin-bottom: 20px;">
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="color: #127eb1; text-align: center;">Bienvenido a su prueba de Weblox</h1>
            <p style="color: #333; text-align: center;">Estimado/a ${clientName},</p>
            <p style="color: #333; text-align: center;">Gracias por su interés en Weblox. Nos complace informarle que hemos configurado un subdominio de prueba para que pueda experimentar nuestros servicios.</p>
            <p style="color: #333; text-align: center;">Detalles de su prueba:</p>
            <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f8f8f8; margin: 20px 0;">
              <tr>
                <td style="border-bottom: 1px solid #ddd;"><strong>Subdominio:</strong> ${subdomainUrl}</td>
              </tr>
              <tr>
                <td><strong>Duración de la prueba:</strong> ${config.trial_days / 60 / 24} días</td>
              </tr>
            </table>
            <p style="color: #333; text-align: center;">Para comenzar su prueba, utilice los siguientes botones:</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="text-align: center; padding-right: 10px;">
                  <a href="${subdomainWebsiteUrlWithToken}" style="background-color: #127eb1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; width: 200px;">Ver mi sitio de prueba</a>
                </td>
                <td width="50%" style="text-align: center; padding-left: 10px;">
                  <a href="${subdomainEditorUrlWithToken}" style="background-color: #FF6600; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; width: 200px;">Editar mi sitio</a>
                </td>
              </tr>
            </table>
            <p style="color: #333; text-align: center; margin-top: 20px;">¿Listo para aprovechar al máximo Weblox? ¡Obtenga su suscripción ahora y desbloquee todo el potencial!</p>
            <p style="text-align: center;">
              <a href="${paymentsProviderUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; width: 200px;">Obtener suscripción</a>
            </p>
            <p style="color: #333; text-align: center;">Si tiene alguna pregunta o necesita asistencia, no dude en contactarnos.</p>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; padding-top: 20px; font-size: 12px; color: #666;">
            <p>&copy; 2024 Weblox<span style="font-size: 60%; vertical-align: top;">®</span>. Todos los derechos reservados.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const textContent = `
    Estimado/a ${clientName},

    Gracias por su interés en Weblox. Nos complace informarle que hemos configurado un subdominio de prueba para que pueda experimentar nuestros servicios.

    Detalles de su prueba:
    Subdominio: ${subdomainUrl}
    Duración de la prueba: ${config.trial_days} días

    Para comenzar su prueba:
    Ver mi sitio de prueba: ${subdomainWebsiteUrlWithToken}
    Editar mi sitio: ${subdomainEditorUrlWithToken}

    ¿Listo para aprovechar al máximo Weblox? ¡Obtenga su suscripción ahora y desbloquee todo el potencial!
    Obtener suscripción: ${paymentsProviderUrl}

    Si tiene alguna pregunta o necesita asistencia, no dude en contactarnos.

    Atentamente,
    El equipo de Weblox
  `;

  const mailOptions = {
    from: `Weblox <${config.email.smtp.from}>`,
    to: clientEmail,
    subject,
    text: textContent,
    html: htmlContent,
  };

  await transport.sendMail(mailOptions);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendEmailActivation,
  sendContactFormResponseEmail,
  sendSubdomainEmail,
};

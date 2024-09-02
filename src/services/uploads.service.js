const { uploadImage } = require('./idrive.service');

const uploadSingleImage = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
    }

    const result = await uploadImage(file);

    res.json({ message: 'image uploaded in iDrive', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
  }
};

module.exports = {
  uploadSingleImage,
};

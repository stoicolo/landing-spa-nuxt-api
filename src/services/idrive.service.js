const { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const config = require('../config/config');

const s3 = new S3Client({
  endpoint: config.idrive.endpoint,
  region: config.idrive.region,
  credentials: {
    accessKeyId: config.idrive.accessKeyId,
    secretAccessKey: config.idrive.secretAccessKey,
  },
  forcePathStyle: true,
});

const normalizeFileName = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const uploadImage = async (file, path = 'images', websiteId = 0) => {
  if (!file || !file.buffer || !file.originalname) {
    throw new Error('Invalid file object');
  }

  const normalizedName = normalizeFileName(file.originalname);
  const params = {
    Bucket: config.idrive.bucketName,
    Key: `${path}/${Date.now()}_${normalizedName}_${websiteId}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);

    await s3.send(command);
    return {
      url: `${config.idrive.endpoint}/${config.idrive.bucketName}/${params.Key}`,
      id: params.Key,
    };
  } catch (error) {
    console.error('Error uploading to iDrive:', error);
    throw new Error('Failed to upload image to iDrive');
  }
};

const deleteImage = async (imageId) => {
  const params = {
    Bucket: config.idrive.bucketName,
    Key: imageId,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.error('Error deleting from iDrive:', error);
    throw new Error('Failed to delete image from iDrive');
  }
};

const listImages = async () => {
  const params = {
    Bucket: config.idrive.bucketName,
    Prefix: 'images/',
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);

    if (!data.Contents) {
      return [];
    }

    return data.Contents.map((item) => ({
      url: `${config.idrive.endpoint}/${config.idrive.bucketName}/${item.Key}`,
      id: item.Key,
      lastModified: item.LastModified,
      size: item.Size,
    }));
  } catch (error) {
    console.error('Error listing images from iDrive:', error);
    throw new Error('Failed to list images from iDrive');
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  listImages,
};

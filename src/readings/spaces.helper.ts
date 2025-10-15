import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const getStorageUrl = () => {
  return `https://${process.env.SPACES_BUCKET}.${process.env.SPACES_REGION}.digitaloceanspaces.com`;
};

const s3 = new S3Client({
  region: process.env.SPACES_REGION,
  endpoint: `https://${process.env.SPACES_REGION}.digitaloceanspaces.com`,
  credentials: {
    accessKeyId: process.env.SPACES_KEY_ID!,
    secretAccessKey: process.env.SPACES_SECRET!,
  },
});

export const uploadBufferToSpaces = async (
  buffer: Buffer,
  originalName: string,
  mimetype: string,
  folder: string,
): Promise<{ url: string; key: string }> => {
  const fileName = `${Date.now()}-${originalName}`;
  const filePath = `${folder}/${fileName}`;

  console.log('Mimetype:', mimetype);
  console.log('Uploading file to Spaces:', filePath);
  console.log('bucketdata', {
    Bucket: process.env.SPACES_BUCKET,
    Key: filePath,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read',
  });

  const command = new PutObjectCommand({
    Bucket: process.env.SPACES_BUCKET,
    Key: filePath,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read', // Bucket policy public ise bu çalışır; policy engelliyorsa bu satırı kaldırman gerekir.
  });

  try {
    await s3.send(command);
  } catch (err) {
    console.error('🔴 Upload error details:', err);
    throw err;
  }

  const fullUrl = `${getStorageUrl()}/${filePath}`;
  return { url: fullUrl, key: filePath };
};

/** Base64 string'i çözerek buffer haline getirip S3'e/DigitalOcean Spaces'e yükler */
export const uploadBase64Image = async (
  base64Data: string,
  originalName: string,
  folder: string,
): Promise<{ url: string; key: string }> => {
  const buffer = Buffer.from(base64Data, 'base64');
  return uploadBufferToSpaces(buffer, originalName, 'image/png', folder);
};

/** Spaces’ten dosya siler */
export const deleteFileFromSpaces = async (key: string): Promise<void> => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.SPACES_BUCKET,
      Key: key,
    });
    await s3.send(command);
    console.log('✅ File deleted from Spaces:', key);
  } catch (err) {
    console.error('🔴 Delete error details:', err);
    throw err;
  }
};
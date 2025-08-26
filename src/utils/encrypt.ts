import crypto from 'crypto';

const IV_LENGTH = 12; // 12-byte IV for AES-GCM

export function encryptData(plaintext: string, secretKey: string): string {
  const SECRET_KEY_BUFFER = crypto.createHash('sha256').update(secretKey).digest();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', SECRET_KEY_BUFFER, iv);

  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag(); // Generate authentication tag

  // Store as Base64 (IV + Ciphertext + Auth Tag)
  const encryptedString = Buffer.concat([iv, encrypted, authTag]).toString('base64');

  console.log('✅ Encryption Successful!');
  return encryptedString;
}

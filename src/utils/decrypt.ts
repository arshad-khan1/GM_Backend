import crypto from 'crypto';

const IV_LENGTH = 12; // 12-byte IV for AES-GCM

export function decryptData(encryptedText: string, secretKey: string): string {
  try {
    const SECRET_KEY_BUFFER = crypto.createHash('sha256').update(secretKey).digest();
    const encryptedData = Buffer.from(encryptedText, 'base64');

    if (encryptedData.length < IV_LENGTH + 16) {
      throw new Error('Invalid encrypted data length');
    }

    // Extract IV, Ciphertext, and Auth Tag
    const iv = encryptedData.slice(0, IV_LENGTH);
    const ciphertext = encryptedData.slice(IV_LENGTH, -16);
    const authTag = encryptedData.slice(-16);

    const decipher = crypto.createDecipheriv('aes-256-gcm', SECRET_KEY_BUFFER, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');

    console.log('✅ Decryption Successful!');
    return decrypted;
  } catch (error) {
    console.error('❌ Decryption Error:', error.message);
    return 'Decryption failed';
  }
}

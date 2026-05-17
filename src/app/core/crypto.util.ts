import * as CryptoJS from 'crypto-js';

export function decryptValue(encryptedValue: string, passphrase: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, passphrase);
  return bytes.toString(CryptoJS.enc.Utf8);
}

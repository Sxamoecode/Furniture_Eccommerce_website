// Nodejs encryption with CTR

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = /*process.env.key*/crypto.randomBytes(32); // Security Key
const iv = /*process.env.IV*/crypto.randomBytes(16);  // init vector

function encrypt(data) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    //console.log(key);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    decipher.setAutoPadding(true)
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    //console.log(decrypted);
    return decrypted.toString();
}

/* 
const hw = encrypt("Encrypting")

console.log(typeof hw, hw)
hww = decrypt(hw)
console.log(hww)
console.log(encrypt(hww))
 */
module.exports = {
    encrypt,
    decrypt,
}
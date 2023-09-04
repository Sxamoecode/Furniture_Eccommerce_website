const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;


function hashit(plaintextPassword) {
    const hash = bcrypt.hashSync(plaintextPassword, saltRounds);
    return hash;
}
 
// compare password
function compare(plaintextPassword, hash) {
    const result = bcrypt.compareSync(plaintextPassword, hash);
    return result;
}
/* 
const pw = 'password'
const hashed = hashit(pw);
console.log(hashed);
comp = compare(pw, hashed);
console.log(comp);
 */

module.exports = {
    hashit,
    compare
}
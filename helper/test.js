const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync('test', salt)

console.log(hash);
console.log(bcrypt.compareSync('test', hash));
console.log(bcrypt.compareSync('test123', hash));
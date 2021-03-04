const db = require('quick.db');

module.exports = () => {
    var economy = new db.table('economy')
    economy.set('myNewBalance', 800) // -> 500
    console.log(economy.get('myBalance')) // -> 500
}
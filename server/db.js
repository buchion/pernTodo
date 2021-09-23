const Pool = require("pg").Pool

const MYDB = new Pool({
	user: "postgres",
	password: "babybottle",
	database: "perntodo",
	host: "localhost",
	port: 5432,
})

module.exports = MYDB

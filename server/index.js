const express = require("express")
const app = express()
const cors = require("cors")
const MYDB = require("./db")

//middleware

app.use(cors())
app.use(express.json())

//ROUTES

// Get all Todos

app.get("/todos", async (req, res) => {
	try {
		const allTodos = await MYDB.query("SELECT * FROM todo")
		res.json(allTodos.rows)
	} catch (error) {
		console.error(error.message)
	}
})

//Get Specific Todo Item
// app.get("/todos/:id", async (req, res) => {
// 	try {
// 		const { id } = req.params
// 		const todo = await MYDB.query("SELECT * FROM todo WHERE todo_id = $1", [id])
// 		res.json(todo.row[0])
// 	} catch (error) {
// 		console.error(error.message)
// 	}
// })

app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params
		const getPtcl = await MYDB.query("SELECT * FROM todo WHERE todo_id = $1", [
			id,
		])
		res.json(getPtcl.rows)
	} catch (error) {
		console.error(error.message)
	}
})

//Create a Todo

app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body
		const newTodo = await MYDB.query(
			"INSERT INTO todo (description) VALUES ($1) RETURNING *",
			[description]
		)
		res.json(newTodo.rows[0])
	} catch (error) {
		console.error(error.message)
	}
})

// Update a Todo
app.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { description } = req.body
		const updateTodo = await MYDB.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		)
		res.json("Todo Was Updated")
	} catch (error) {
		console.error(error.message)
	}
})

app.listen(5000, () => {
	console.log("Server is starting on port 5000")
})

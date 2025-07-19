import express from "express"
import pkg from "pg"
import trainRouter from "./train/index.js"

const { Pool } = pkg

const pool = new Pool({
  host: process.env.PGHOST, // ← PGHOST を使用
  user: process.env.PGUSER, // ← PGUSER を使用
  password: process.env.PGPASSWORD, // ← PGPASSWORD を使用
  database: process.env.PGDATABASE, // ← PGDATABASE を使用
  port: process.env.PGPORT || 5432,
})

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/train", trainRouter(pool))

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})

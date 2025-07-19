import express from "express"
import cors from "cors"
import pkg from "pg"
import trainRouter from "./train/index.js"

const { Pool } = pkg

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
})

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/train", trainRouter(pool))

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})

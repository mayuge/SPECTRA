import express from "express"
import pkg from "pg"
const { Pool } = pkg

const app = express()
const port = 4000

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
})

app.get("/", (req, res) => {
  res.send("API is running")
})

app.get("/station", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(
          jsonb_build_object(
            'type',       'Feature',
            'geometry',   ST_AsGeoJSON(geometry)::jsonb,
            'properties', to_jsonb(row) - 'geometry'
          )
        )
      ) AS geojson
      FROM (
        SELECT * FROM "n05_23_station2"
      ) row
    `)
    res.json(rows[0].geojson)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch geojson" })
  }
})

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`)
})

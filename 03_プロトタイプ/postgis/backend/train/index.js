import express from "express"

export default function (pool) {
  const router = express.Router()

  // 駅一覧
  router.get("/station", async (req, res) => {
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
      console.error("DB error:", err)
      res.status(500).json({ error: "Failed to fetch geojson" })
    }
  })

  // 駅詳細
  router.get("/station/:id", async (req, res) => {
    const id = req.params.id
    try {
      const { rows } = await pool.query(
        `SELECT jsonb_build_object(
         'type',       'Feature',
         'geometry',   ST_AsGeoJSON(geometry)::jsonb,
         'properties', to_jsonb(row) - 'geometry'
       ) AS geojson
       FROM "n05_23_station2" row
       WHERE "n05_011" = $1`,
        [id]
      )
      if (rows.length === 0) return res.status(404).json({ error: "Not found" })
      res.json(rows[0].geojson)
    } catch (err) {
      console.error("DB error:", err)
      res.status(500).json({ error: "Failed to fetch station" })
    }
  })

  return router
}

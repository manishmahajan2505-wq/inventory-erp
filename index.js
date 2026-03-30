const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// 🔹 Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 🔹 Home Route (DB Test)
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send("Database Connected ✅ Time: " + result.rows[0].now);
  } catch (err) {
    res.send("Database Error ❌ " + err.message);
  }
});

// 🔹 Create Product Table
app.get("/create-product-table", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_code VARCHAR(50) UNIQUE,
        product_name VARCHAR(100),
        unit VARCHAR(20),
        type VARCHAR(10), -- RM / FG
        is_approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    res.send("Product table created ✅");
  } catch (err) {
    res.send("Error ❌ " + err.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

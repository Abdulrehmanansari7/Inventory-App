import pool from "./pool.js";

const getCompany = async () => {
  const { rows } = await pool.query("SELECT * FROM companies");
  return rows;
};

const searchCompany = async (search) => {
  const { rows } = await pool.query(
    `SELECT * FROM companies WHERE name ILIKE $1 OR country ILIKE $1`,
    [`%${search || ""}%`],
  );
  return rows;
};

const getCars = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM cars WHERE company_id = $1`,
    [id],
  );
  return rows;
};

const submitCar = async (model,year,price,id) => {
  const { rows } = await pool.query(
    `INSERT INTO cars(company_id,model,year,price) VALUES($1,$2,$3,$4) RETURNING *`,[id,model,year,price]
  );
  return rows;
}

const deleteCar = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM cars WHERE id = $1 RETURNING company_id`,
    [id],
  );
  return rows[0]?.company_id;
};

const searchCar = async (companyId, minPrice, maxPrice) => {
  const {rows} = await pool.query(`SELECT * FROM cars WHERE company_id = $1 AND price BETWEEN $2 AND $3`, [companyId, minPrice || 0, maxPrice || 99999999]);
  return rows;
}

export default {
  getCompany,
  getCars,
  submitCar,
  deleteCar,
  searchCar,
  searchCompany
};

const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
require("dotenv").config();
const BASE_ID = process.env.BASE_ID;
const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.get("/products", async (req, res) => {
  const prodData = await getProduct();
  res.json(prodData);
});

const getProduct = async () => {
  try {
    const products = await axios.get(
      `https://api.airtable.com/v0/${BASE_ID}/products?&view=Grid%20view`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return products.data;
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const BASE_ID = process.env.BASE_ID;
const API_KEY = process.env.API_KEY;
const port = process.env.PORT || 80;

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.get("/products", async (req, res) => {
  const prodData = await getProduct();
  res.json(prodData);
});

app.get("/ads", async (req, res) => {
  const adsData = await getAd();
  adsData.src = adsData.src[0].thumbnails.large.url;
  res.json(adsData);
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

const getAd = async () => {
  try {
    const ads = await axios.get(
      "https://api.airtable.com/v0/appWbbrXlt6MTAISZ/Table%201?view=Grid%20view",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );
    return ads.data.records[0].fields;
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

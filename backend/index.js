const dotenv = require('dotenv');
const path = require('path');

// Charger d'abord .env.local s'il existe
const localEnvPath = path.resolve(__dirname, '.env.local');
const defaultEnvPath = path.resolve(__dirname, '.env');

// Tenter de charger .env.local d'abord
const localEnvResult = dotenv.config({ path: localEnvPath });

// Si .env.local n'existe pas, charger .env
if (localEnvResult.error) {
    console.log('Utilisation du fichier .env par défaut');
    dotenv.config({ path: defaultEnvPath });
} else {
    console.log('Utilisation du fichier .env.local');
}

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server is running on Port : ${port}`);
});

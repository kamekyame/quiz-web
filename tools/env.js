const fs = require("node:fs")
require('dotenv').config()

const env = {
  API_BASE: process.env["API_BASE"]
}

fs.mkdirSync("src/environments", { recursive: true })
fs.writeFileSync("src/environments/environment.json", JSON.stringify(env, null, 2))

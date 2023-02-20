import { createPool } from "mysql2/promise";
import { Config } from "../config/config";

export const pool = createPool({
  host: Config.dbHost,
  user: Config.dbUser,
  database: Config.dbDatabase,
  password: Config.dbPassword,
  namedPlaceholders: true,
  decimalNumbers: true,
});

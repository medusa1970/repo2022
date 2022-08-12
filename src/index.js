import express from 'express';
import "dotenv/config";
import "./database/db_connect.js"
import authRoutes from "./routes/users/authRoutes.js";
import serveStatic from 'serve-static';
import history from 'connect-history-api-fallback';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Puerto corriendo en: ${port}`));
// lib/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { app } from "electron";

export async function openDb() {
  const isDev = !app.isPackaged; // Check if we're in development mode

  const dbPath = isDev
    ? path.join(app.getAppPath(), "public", "teacherWorkManagement.db") // Development path
    : path.join(process.resourcesPath, "teacherWorkManagement.db"); // Production path

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

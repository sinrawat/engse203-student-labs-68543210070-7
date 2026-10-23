import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');
const DB_FILE =
  process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db');

const db = new DatabaseSync(DB_FILE);

db.exec('PRAGMA foreign_keys = ON');

export function findAllUsers() {
  return db
    .prepare(`
      SELECT
        id,
        name,
        department,
        email
      FROM users
      ORDER BY id
    `)
    .all();
}

export function findRequestsByUserId(userId) {
  return db
    .prepare(`
      SELECT
        r.id,
        u.name AS requesterName,
        r.request_type AS requestType,
        r.location,
        r.details,
        r.priority,
        r.status
      FROM requests r
      JOIN users u ON u.id = r.requester_id
      WHERE u.id = ?
      ORDER BY r.id
    `)
    .all(userId);
}

export function findUserById(userId) {
  return db
    .prepare(`
      SELECT id, name, department, email
      FROM users
      WHERE id = ?
    `)
    .get(userId) ?? null;
}
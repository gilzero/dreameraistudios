import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { join } from 'path';
import { contactMessages } from '@shared/schema';

// Initialize SQLite database
const sqlite = new Database(join(process.cwd(), 'sqlite.db'));

// Create Drizzle ORM client
export const db = drizzle(sqlite);

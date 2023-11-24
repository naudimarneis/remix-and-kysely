import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("contacts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("first_name", "varchar")
    .addColumn("last_name", "varchar")
    .addColumn("avatar", "varchar")
    .addColumn("notes", "varchar")
    .addColumn("favorite", "boolean")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("contacts").execute();
}

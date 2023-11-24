import { db } from "./database";
import type { UpdateContact, NewContact } from "./types";

export async function getContacts(q: string | null) {
  let query = db.selectFrom("contacts");

  if (q) {
    query = query.where((eb) =>
      eb.or([
        eb("first_name", "ilike", `%${q.trim()}%`),
        eb("last_name", "ilike", `%${q.trim()}%`),
      ])
    );
  }

  return await query.selectAll().execute();
}

export async function getContact(id: number) {
  return await db
    .selectFrom("contacts")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function createContact(contact: NewContact) {
  return await db
    .insertInto("contacts")
    .values(contact)
    .returning("id")
    .executeTakeFirstOrThrow();
}

export async function updateContact(id: number, updateWith: UpdateContact) {
  await db
    .updateTable("contacts")
    .set(updateWith)
    .where("id", "=", id)
    .executeTakeFirst();
}

export async function deleteContact(id: number) {
  return await db
    .deleteFrom("contacts")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();
}

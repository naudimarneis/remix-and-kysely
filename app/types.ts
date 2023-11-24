import type { Insertable, Generated, Selectable, Updateable } from "kysely";

export interface Database {
  contacts: ContactTable;
}

export interface ContactTable {
  id: Generated<number>;
  first_name?: string;
  last_name?: string;
  favorite?: boolean;
  notes?: string;
  avatar?: string;
}

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

export type Contacts = Selectable<ContactTable>;
export type NewContact = Insertable<ContactTable>;
export type UpdateContact = Updateable<ContactTable>;

import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import { createContact } from "~/contactRepository";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const newContact = Object.fromEntries(formData);
  const contact = await createContact(newContact);
  return redirect(`/contacts/${contact.id}`);
};

export default function NewContact() {
  const navigate = useNavigate();

  return (
    <Form id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          aria-label="First name"
          name="first_name"
          type="text"
          placeholder="First"
        />
        <input
          aria-label="Last name"
          name="last_name"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}

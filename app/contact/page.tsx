"use client";

import { useActionState } from "react";
import { submitContactForm, ContactResult } from "./actions";

// Inline marker forces this client chunk to differ between builds.
const _CHUNK_MARKER = `contact-form-build-${process.env.NEXT_PUBLIC_BUILD_LABEL ?? "dev"}-inline-marker-58291`;
console.debug("Contact chunk:", _CHUNK_MARKER);

export default function ContactPage() {
  const [state, formAction, pending] = useActionState<ContactResult | null, FormData>(
    submitContactForm,
    null
  );

  return (
    <>
      <h1>Contact us</h1>
      <p style={{ color: "#666" }}>
        This form submits via a Next.js Server Action. The action is identified
        by a build-specific hash. After a redeploy, a stale form holding the
        old action id will either receive a 404 from the new build (if the
        action no longer exists) or get a response with a different field
        shape (e.g., <code>caseRef</code> instead of <code>ticketId</code>).
      </p>
      <form action={formAction} style={{ marginTop: "2rem", maxWidth: 500 }}>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          <strong>Name</strong>
          <input
            type="text"
            name="name"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.25rem",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          <strong>Email</strong>
          <input
            type="email"
            name="email"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.25rem",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          <strong>Message</strong>
          <textarea
            name="message"
            required
            rows={5}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.25rem",
              border: "1px solid #ccc",
              borderRadius: 4,
              fontFamily: "inherit",
            }}
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          style={{
            background: "#1f6feb",
            color: "white",
            border: "none",
            padding: "0.6rem 1.25rem",
            borderRadius: 4,
            cursor: pending ? "wait" : "pointer",
          }}
        >
          {pending ? "Submitting..." : "Send"}
        </button>
      </form>

      {state && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: state.success ? "#f0f9eb" : "#fef0f0",
            border: `1px solid ${state.success ? "#67c23a" : "#f56c6c"}`,
            borderRadius: 4,
            maxWidth: 500,
          }}
        >
          <p>
            <strong>{state.success ? "Sent" : "Error"}</strong> (responded by
            build {state.build})
          </p>
          <p>{state.message}</p>
          {state.ticketId && (
            <p>
              Ticket id: <code>{state.ticketId}</code>
            </p>
          )}
          {state.caseRef && (
            <p>
              Case ref: <code>{state.caseRef}</code>
            </p>
          )}
        </div>
      )}
    </>
  );
}

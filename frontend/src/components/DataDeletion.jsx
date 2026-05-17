import React from "react";
import LegalLayout, { LegalList } from "./LegalLayout";

export default function DataDeletion() {
  return (
    <LegalLayout title="Data Deletion" updated="May 17, 2026">
      <p>
        You can request deletion of your ChatApp account and associated data at
        any time.
      </p>

      <h2>How to Request Deletion</h2>
      <LegalList>
        <li>
          Email us from your registered email address at{" "}
          <b>support@yourdomain.com</b> with the subject line{" "}
          <b>“Data Deletion Request”</b>.
        </li>
        <li>
          Include your account identifier (email/username) and confirm you want
          your account deleted.
        </li>
      </LegalList>

      <h2>What We Delete</h2>
      <LegalList>
        <li>Your account profile information.</li>
        <li>Your chat history stored on our servers (if applicable).</li>
        <li>Associated metadata related to your account.</li>
      </LegalList>

      <h2>What We May Retain</h2>
      <p>
        We may retain limited information where required by law, for security,
        fraud prevention, or to comply with legal obligations.
      </p>

      <h2>Timing</h2>
      <p>
        We typically process deletion requests within 30 days. If additional
        verification is needed, we will contact you.
      </p>
    </LegalLayout>
  );
}


import React from "react";
import LegalLayout, { LegalList } from "./LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="May 17, 2026">
      <p>
        These Terms of Service ("Terms") govern your use of the ChatApp web
        application ("ChatApp", "we", "us"). By using ChatApp, you agree to
        these Terms.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 13 years old (or the minimum age required in your
        country) to use ChatApp.
      </p>

      <h2>Acceptable Use</h2>
      <LegalList>
        <li>Do not use ChatApp for illegal activities.</li>
        <li>Do not harass, threaten, or abuse others.</li>
        <li>Do not attempt to break, exploit, or reverse engineer the service.</li>
        <li>Do not upload or share malware or harmful content.</li>
      </LegalList>

      <h2>Your Content</h2>
      <p>
        You are responsible for the content you send through ChatApp. You
        represent that you have the rights to share it.
      </p>

      <h2>AI Features</h2>
      <p>
        AI responses may be inaccurate or incomplete. You are responsible for
        how you use AI-generated content. Do not rely on AI outputs as
        professional advice (medical, legal, financial, etc.).
      </p>

      <h2>Accounts</h2>
      <p>
        Keep your login credentials secure. You are responsible for activity on
        your account.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate access if you violate these Terms or if
        required for security and operational reasons.
      </p>

      <h2>Disclaimer</h2>
      <p>
        ChatApp is provided "as is" without warranties of any kind. To the
        maximum extent permitted by law, we disclaim all warranties.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect,
        incidental, special, or consequential damages.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms: <b>support@yourdomain.com</b>
      </p>
    </LegalLayout>
  );
}


import React from "react";
import LegalLayout, { LegalList } from "./LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="May 17, 2026">
      <p>
        This Privacy Policy explains how the ChatApp web application ("ChatApp",
        "we", "us") collects, uses, and protects information when you use our
        service.
      </p>

      <h2>Information We Collect</h2>
      <LegalList>
        <li>
          Account information you provide, such as your name, email, and login
          credentials.
        </li>
        <li>
          Chat content you send and receive through the app (messages, prompts,
          and responses).
        </li>
        <li>
          Technical data such as device/browser type, IP address, and basic
          usage logs for reliability and security.
        </li>
      </LegalList>

      <h2>How We Use Information</h2>
      <LegalList>
        <li>To provide and operate the service (authentication, chat, AI tools).</li>
        <li>To improve performance, diagnose issues, and prevent abuse.</li>
        <li>To communicate important service or security updates.</li>
      </LegalList>

      <h2>AI Processing</h2>
      <p>
        If you use AI features, your submitted text may be sent to an AI provider
        to generate responses. Do not submit sensitive personal data if you do
        not want it processed by an AI provider.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell your personal information. We may share information with
        service providers that help us run the app (hosting, analytics, AI
        processing) and only as needed to provide the service.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable measures to protect data, but no method of
        transmission or storage is 100% secure.
      </p>

      <h2>Data Retention</h2>
      <p>
        We keep information only as long as necessary to provide the service,
        comply with legal obligations, and resolve disputes.
      </p>

      <h2>Your Choices</h2>
      <LegalList>
        <li>You can request deletion of your account and associated data.</li>
        <li>You can stop using the service at any time.</li>
      </LegalList>

      <h2>Contact</h2>
      <p>
        For privacy questions or requests, contact us at: <b>support@yourdomain.com</b>
      </p>
    </LegalLayout>
  );
}


import React from "react";

const containerStyle = {
  maxWidth: 860,
  margin: "0 auto",
  padding: "48px 20px",
  color: "#111827",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid rgba(17,24,39,0.12)",
  borderRadius: 14,
  padding: 28,
  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
};

const headingStyle = {
  fontSize: 28,
  fontWeight: 800,
  letterSpacing: "-0.02em",
  margin: 0,
};

const metaStyle = {
  marginTop: 8,
  color: "rgba(17,24,39,0.7)",
  fontSize: 13,
};

const bodyStyle = {
  marginTop: 18,
  lineHeight: 1.65,
  fontSize: 15,
};

const listStyle = {
  margin: "10px 0 0 18px",
};

export default function LegalLayout({ title, updated, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>{title}</h1>
          <div style={metaStyle}>Last updated: {updated}</div>
          <div style={bodyStyle}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export const LegalList = ({ children }) => <ul style={listStyle}>{children}</ul>;


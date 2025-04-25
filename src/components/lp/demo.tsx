/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const Demo: React.FC = () => {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "1rem" }}>
        Welcome to the Demo Page
      </h1>
      <h2 style={{ fontSize: "1.5rem", color: "#555", marginBottom: "2rem" }}>
        Explore the amazing features we have to offer
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <img
          src="/saas.gif"
          alt="Demo Gif"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Demo;

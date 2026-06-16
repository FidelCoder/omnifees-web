import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101412",
        paper: "#f7f8f3",
        line: "#d9ded6",
        mint: "#2f6b4f",
        marine: "#145d73",
        amber: "#c47a22"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(16, 20, 18, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;

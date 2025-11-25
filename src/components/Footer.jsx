import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px 0",
        background: "#0b0f19",
        borderTop: "1px solid #1e293b",
        display: "flex",
        justifyContent: "center",
        gap: "25px",
      }}
    >
      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#e33490", fontSize: "24px" }}
      >
        <FaInstagram />
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#3b82f6", fontSize: "24px" }}
      >
        <FaFacebook />
      </a>

      {/* Email */}
      <a
        href="mailto:contacto@lvlup.cl"
        style={{ color: "#cbd5e1", fontSize: "24px" }}
      >
        <FaEnvelope />
      </a>
    </footer>
  );
}

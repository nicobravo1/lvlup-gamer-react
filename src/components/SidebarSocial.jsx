import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function SidebarSocial() {
  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        zIndex: 50,
      }}
    >
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#e33490", fontSize: "26px" }}
      >
        <FaInstagram />
      </a>

      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#3b82f6", fontSize: "26px" }}
      >
        <FaFacebook />
      </a>

      <a
        href="mailto:contacto@lvlup.cl"
        style={{ color: "#cbd5e1", fontSize: "26px" }}
      >
        <FaEnvelope />
      </a>
    </div>
  );
}

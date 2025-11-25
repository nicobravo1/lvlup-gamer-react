import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Contacto() {
  return (
    <div
      style={{
        padding: "50px 20px",
        color: "white",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Contáctanos</h1>
      <p style={{ fontSize: "18px", marginBottom: "30px", color: "#cbd5e1" }}>
        Si tienes dudas, consultas o deseas comunicarte con nosotros, puedes
        hacerlo mediante las siguientes plataformas:
      </p>

      {/* Iconos */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#e33490", fontSize: "40px" }}
        >
          <FaInstagram />
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3b82f6", fontSize: "40px" }}
        >
          <FaFacebook />
        </a>

        {/* Email */}
        <a
          href="mailto:contacto@lvlup.cl"
          style={{ color: "#cbd5e1", fontSize: "40px" }}
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
}

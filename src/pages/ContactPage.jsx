import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">Contáctanos</h1>

      <p className="text-gray-300 mb-8 text-center max-w-xl">
        Si tienes dudas, sugerencias o necesitas ayuda con tu compra,
        puedes escribirnos directamente por nuestras redes.
      </p>

      <div className="flex gap-8">
        <a
          href="https://instagram.com"
          target="_blank"
          className="text-pink-500 hover:text-pink-400 text-5xl"
        >
          <FaInstagram />
        </a>

        <a
          href="mailto:contacto@lvlup.cl"
          className="text-blue-400 hover:text-blue-300 text-5xl"
        >
          <FaEnvelope />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          className="text-blue-600 hover:text-blue-500 text-5xl"
        >
          <FaFacebook />
        </a>
      </div>
    </div>
  );
}

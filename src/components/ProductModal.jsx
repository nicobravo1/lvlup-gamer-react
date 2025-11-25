import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import specsData from "../data/specs.json";
import { FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { add } = useCart();
  const [specs, setSpecs] = useState([]);

  // Cargar especificaciones
  useEffect(() => {
    if (product?.id && specsData[product.id]) {
      setSpecs(specsData[product.id]);
    } else {
      setSpecs([]);
    }
  }, [product]);

  // 🔥 Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!product) return null;

  return (
    <AnimatePresence>
      {/* BACKDROP — oscurece el fondo y pone todo en segundo plano */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          backdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.55)",  //  Más oscuro
        }}
        onClick={onClose}                //  cerrar al hacer click afuera
      >

        {/* MODAL */}
        <motion.div
          onClick={(e) => e.stopPropagation()} // evitar cierre al hacer click dentro
          className="relative bg-[#0b1220] rounded-xl shadow-2xl"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{
            width: "min(900px, 92%)",
            maxHeight: "85vh",
            overflowY: "auto",
            paddingBottom: 10,
            border: "1px solid rgba(255,255,255,0.05)"
          }}
        >

          {/* HEADER */}
          <div
            style={{
              padding: "18px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <div>
              <h3 style={{ margin: 0, color: "#fff" }}>{product.name}</h3>
              <p style={{ margin: 0, color: "#9aa4b2" }}>
                ${product.price.toLocaleString("es-CL")}
              </p>
            </div>

            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: "#cbd5e1",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* CONTENIDO */}
          <div
            style={{
              display: "flex",
              gap: 20,
              padding: 22,
              flexWrap: "wrap"
            }}
          >
            {/* IMAGEN */}
            <div style={{ flex: "0 0 40%", minWidth: "260px" }}>
              <img
                src={product.img}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  objectFit: "cover",
                }}
              />
            </div>

            {/* ESPECIFICACIONES */}
            <div style={{ flex: 1, color: "#e6eef8", minWidth: "260px" }}>
              <h4>Especificaciones</h4>

              {specs.length > 0 ? (
                <ul style={{ paddingLeft: 20 }}>
                  {specs.map((s, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay especificaciones disponibles.</p>
              )}

              {/* BOTÓN AGREGAR */}
              <button
                className="btn-glow mt-3"
                onClick={() => {
                  add(product, 1);
                  onClose();
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

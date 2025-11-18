// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  Shield,
  CheckCircle2,
  Vote,
} from "lucide-react";

export default function VotoDigital() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const secciones = [
    {
      id: "fechas",
      titulo: "Fechas importantes",
      icono: Calendar,
      accent: "border-t-red-500",
      items: [
        { titulo: "Fecha de elecciones", descripcion: "12 de abril de 2026." },
        { titulo: "Inicio de campaña", descripcion: "1 de marzo de 2026." },
        { titulo: "Cierre de campaña", descripcion: "10 de abril de 2026." },
        { titulo: "Publicación de resultados", descripcion: "13 de abril de 2026." },
      ],
    },
    {
      id: "requisitos",
      titulo: "Requisitos para votar",
      icono: CheckCircle2,
      accent: "border-t-red-500",
      items: [
        { titulo: "DNI vigente", descripcion: "Documento Nacional de Identidad actualizado." },
        { titulo: "Estar en el padrón", descripcion: "Verificar tu inscripción en el padrón electoral." },
        { titulo: "Mayoría de edad", descripcion: "Tener 18 años cumplidos al día de las elecciones." },
        { titulo: "Conexión a internet", descripcion: "Contar con una conexión estable para el voto digital." },
      ],
    },
    {
      id: "proceso",
      titulo: "Etapas del proceso",
      icono: FileText,
      accent: "border-t-red-500",
      items: [
        { titulo: "1. Autenticación", descripcion: "Ingreso al sistema con tu DNI y verificación de identidad." },
        { titulo: "2. Selección", descripcion: "Elección de las cédulas y cargos que te corresponden." },
        { titulo: "3. Emisión del voto", descripcion: "Marcación de tus opciones de forma segura y secreta." },
        { titulo: "4. Confirmación", descripcion: "Revisión del resumen de tu voto antes de enviarlo." },
      ],
    },
    {
      id: "seguridad",
      titulo: "Seguridad del sistema",
      icono: Shield,
      accent: "border-t-red-500",
      items: [
        { titulo: "Encriptación", descripcion: "Los votos viajan cifrados de extremo a extremo." },
        { titulo: "Anonimato", descripcion: "Tu identidad se guarda separada de tu elección de voto." },
        { titulo: "Auditoría", descripcion: "El sistema puede ser revisado por organismos independientes." },
        { titulo: "Integridad", descripcion: "Una vez registrado, el voto no puede ser alterado ni eliminado." },
      ],
    },
  ];

  const pasosVotoDigital = [
    { paso: 1, titulo: "Acceso al sistema", descripcion: "Ingresas con tu DNI..." },
    { paso: 2, titulo: "Verificación de datos", descripcion: "El sistema verifica..." },
    { paso: 3, titulo: "Selección de opciones", descripcion: "Visualizas las cédulas..." },
    { paso: 4, titulo: "Revisión del voto", descripcion: "Se muestra un resumen..." },
    { paso: 5, titulo: "Envío y registro", descripcion: "Tu voto se cifra..." },
    { paso: 6, titulo: "Comprobante digital", descripcion: "Recibes un comprobante..." },
  ];

  return (
    <div className="bg-[#FEF2F2] text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#7F1D1D] text-white text-center py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7F1D1D] via-[#991B1B] to-[#7F1D1D] opacity-95" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            ¿Qué es el voto digital?
          </h1>
          <p className="text-red-100 text-base md:text-lg mb-8 leading-relaxed">
            Es la modalidad que te permite participar en las elecciones a través de internet.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/votar"
              className="bg-red-600 hover:bg-red-700 px-7 py-2.5 rounded-lg text-sm md:text-base font-medium transition-all shadow-lg shadow-red-900/30 flex items-center gap-2"
            >
              <Vote className="w-4 h-4" />
              Ir al sistema de votación
            </Link>
            <a
              href="#proceso"
              className="border border-red-200 text-red-100 px-7 py-2.5 rounded-lg text-sm md:text-base font-medium hover:bg-white hover:text-[#7F1D1D] transition-all flex items-center gap-2"
            >
              Conocer cómo funciona
            </a>
          </div>
        </motion.div>
      </section>

      {/* INFO CLAVE */}
      <section className="py-20 px-6 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#7F1D1D] mb-4">Información clave</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Antes de votar, revisa las fechas, requisitos, etapas y seguridad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {secciones.map((seccion, index) => {
              const Icono = seccion.icono;
              return (
                <motion.article
                  key={seccion.id}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  transition={{ delay: index * 0.08 }}
                  className={`bg-[#FEF2F2] rounded-2xl border border-gray-200 shadow-sm p-6 md:p-7 ${seccion.accent}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-red-50">
                      <Icono className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#7F1D1D]">{seccion.titulo}</h3>
                  </div>

                  <ul className="space-y-3">
                    {seccion.items.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-4 h-4 text-red-600 mt-1" />
                        <div>
                          <p className="font-medium text-sm text-slate-900">{item.titulo}</p>
                          <p className="text-sm text-gray-600">{item.descripcion}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESO PASO A PASO */}
      <section id="proceso" className="py-20 px-6 bg-gradient-to-b from-[#FEE2E2] to-[#FECACA]">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" variants={fadeUp}>
            <h2 className="text-3xl font-bold text-[#7F1D1D] mb-4">¿Cómo funciona el voto digital?</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pasosVotoDigital.map((item, index) => (
              <motion.div
                key={item.paso}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-xs font-semibold text-red-600">
                    {item.paso}
                  </div>
                  <h3 className="font-semibold text-sm text-[#7F1D1D]">{item.titulo}</h3>
                </div>
                <p className="text-sm text-gray-700">{item.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

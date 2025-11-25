import { motion } from "framer-motion";
import { Calendar, Users, Building2, Vote, FileSearch, CheckCircle2, Shield, Laptop, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  // Cálculo de días y meses restantes hasta las elecciones
  const fechaElecciones = new Date("2026-04-12T00:00:00").getTime();
  const ahora = new Date().getTime();
  const diferencia = fechaElecciones - ahora;
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const meses = Math.floor(dias / 30);
  const diasRestantes = dias % 30;

  // Configuración de animaciones
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* ===== HERO PRINCIPAL CON DISEÑO ONPE ===== */}
      <section className="relative overflow-hidden">
        {/* Background con gradiente (simulando imagen) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E31E24]/95 via-[#C41E3A]/90 to-[#8B0000]/95" />
          {/* Patrón de puntos para simular textura */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Elementos decorativos animados */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center text-white"
          >
            {/* Badge superior */}
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/30">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Elecciones Generales 2026</span>
              </div>
            </motion.div>

            {/* Título principal */}
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              Tu Voto,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200">
                Tu Futuro
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-xl md:text-2xl text-red-50 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Participa en las Elecciones Generales del Perú de forma <strong>segura</strong>, 
              <strong> transparente</strong> y <strong>accesible</strong>. Elige tu modalidad y ejerce tu derecho democrático.
            </motion.p>

            {/* Botones de acción */}
            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={() => window.location.href = '/votar'}
                className="group relative bg-white text-[#E31E24] px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105 flex items-center gap-3 overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-50 to-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <Vote className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Votar Ahora</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => window.location.href = '/informacion'}
                className="group bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full text-lg font-bold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all transform hover:scale-105 flex items-center gap-3 cursor-pointer"
              >
                <FileSearch className="w-6 h-6" />
                <span>Más Información</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Onda decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,64 C360,96 720,96 1080,64 C1440,32 1440,120 1440,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== CONTADOR DE TIEMPO REDISEÑADO - MÁS SERIO ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="relative -mt-16 pb-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 overflow-hidden">
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full mb-4">
                  <Clock className="w-5 h-5 text-[#E31E24]" />
                  <span className="text-[#E31E24] font-bold text-sm">Cuenta Regresiva</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Faltan para las elecciones
                </h2>
                <p className="text-gray-600 text-base font-medium">12 de Abril, 2026</p>
              </div>

              {/* Contenedor principal: Reloj + Calendario */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                
                {/* RELOJ MINIMALISTA */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <div className="relative w-64 h-64">
                    {/* Círculo del reloj */}
                    <div className="absolute inset-0 rounded-full bg-gray-50 shadow-lg border-8 border-gray-300 flex items-center justify-center">
                      {/* Centro del reloj */}
                      <div className="absolute w-3 h-3 bg-gray-800 rounded-full z-20" />
                      
                      {/* Marcadores de horas */}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 - 90) * (Math.PI / 180);
                        const x = Math.cos(angle) * 85;
                        const y = Math.sin(angle) * 85;
                        const isMainHour = i % 3 === 0;
                        return (
                          <div
                            key={i}
                            className={isMainHour ? "absolute w-1 h-3 bg-gray-800 rounded-full" : "absolute w-1 h-1.5 bg-gray-400 rounded-full"}
                            style={{
                              left: `calc(50% + ${x}px - 2px)`,
                              top: `calc(50% + ${y}px - 6px)`,
                              transform: `rotate(${i * 30}deg)`,
                            }}
                          />
                        );
                      })}
                      
                      {/* Manecilla de horas */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                        className="absolute w-1.5 h-16 bg-gray-800 rounded-full origin-bottom"
                        style={{ bottom: '50%', left: 'calc(50% - 3px)' }}
                      />
                      
                      {/* Manecilla de minutos */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-1 h-20 bg-gray-600 rounded-full origin-bottom"
                        style={{ bottom: '50%', left: 'calc(50% - 2px)' }}
                      />
                      
                      {/* Manecilla de segundos */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute w-0.5 h-24 bg-[#E31E24] rounded-full origin-bottom"
                        style={{ bottom: '50%', left: 'calc(50% - 1px)' }}
                      />
                    </div>

                    {/* Texto en el centro */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center mt-16">
                        <div className="text-4xl font-bold text-gray-900">{dias}</div>
                        <div className="text-xs text-gray-600 font-semibold mt-1">DÍAS</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* TARJETAS DE INFORMACIÓN - DISEÑO SOBRIO */}
                <div className="space-y-4">
                  {/* Meses */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-200 rounded-lg">
                          <Calendar className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Meses</div>
                          <div className="text-3xl font-bold text-gray-900">{meses}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Días restantes */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-200 rounded-lg">
                          <Clock className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Días Restantes</div>
                          <div className="text-3xl font-bold text-gray-900">{diasRestantes}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Total de días */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-[#E31E24] rounded-xl p-6 shadow-md text-white border border-[#C41E3A]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-lg">
                          <FileSearch className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-red-100 font-semibold uppercase tracking-wide">Total de Días</div>
                          <div className="text-3xl font-bold">{dias}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== MODALIDADES DE VOTO - DISEÑO SOBRIO ===== */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full mb-6">
              <Vote className="w-5 h-5 text-[#E31E24]" />
              <span className="font-bold text-gray-700 text-sm">Modalidades de Votación</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              ¿Cómo Quieres Votar?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elige la modalidad que mejor se adapte a ti. Ambas garantizan seguridad y transparencia.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Voto Presencial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="bg-gray-100 p-8 border-b border-gray-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#E31E24]/10 rounded-lg">
                    <Building2 className="w-8 h-8 text-[#E31E24]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-bold uppercase tracking-wide">Modalidad</div>
                    <h3 className="text-2xl font-bold text-gray-900">Voto Presencial</h3>
                  </div>
                </div>
                <p className="text-gray-700 text-sm font-medium">La experiencia clásica y confiable</p>
              </div>

              {/* Contenido */}
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed mb-8 text-base">
                  Acude a tu local de votación asignado y ejerce tu derecho de manera presencial con todas las garantías de seguridad.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: MapPin, text: "Local de votación asignado" },
                    { icon: CheckCircle2, text: "DNI vigente requerido" },
                    { icon: Shield, text: "Proceso supervisado" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://eg2026.onpe.gob.pe/para-electores/elige-tu-local-de-votacion/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#E31E24] text-white py-4 rounded-lg font-bold hover:bg-[#C41E3A] transition-colors"
                >
                  <span>Consultar Local</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Voto Digital */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="bg-gray-100 p-8 border-b border-gray-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Laptop className="w-8 h-8 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-bold uppercase tracking-wide">Modalidad</div>
                    <h3 className="text-2xl font-bold text-gray-900">Voto Digital</h3>
                  </div>
                </div>
                <p className="text-gray-700 text-sm font-medium">El futuro de la democracia hoy</p>
              </div>

              {/* Contenido */}
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed mb-8 text-base">
                  Vota desde cualquier lugar con conexión a Internet. Seguro, rápido y accesible las 24 horas del día.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: Laptop, text: "Desde cualquier dispositivo" },
                    { icon: Shield, text: "Encriptación de datos" },
                    { icon: Clock, text: "Disponible 24/7" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => window.location.href = '/voto-digital'}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  <span>Conocer Más</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
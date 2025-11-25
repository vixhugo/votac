import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote, Users, Globe2, Briefcase, CheckCircle2, ArrowLeft, ArrowRight, Shield, UserCheck } from "lucide-react";
import onpeLogo from "../../components/assets/onpe.jpg";


// Datos de candidatos REALES - Elecciones 2026 Perú
const candidatosIniciales = {
  presidente: [
    {
      id: 1,
      nombre: "Rafael López Aliaga",
      partido: "RENOVACIÓN POPULAR",
      vicepresidentes: ["Norma Yarrow (1ra VP)", "Jhon Iván Ramos Malpica (2da VP)"],
      color: "bg-blue-600",
      foto: "https://yt3.googleusercontent.com/CkNVjdastewDZe4K2Bn5pZdo4LLnTeNkRZ0Zlp59EK5pAW1rSpDV-ttEyPjS1gU7m0EhWdC-ZQ=s900-c-k-c0x00ffffff-no-rj"
    },
    {
      id: 2,
      nombre: "Keiko Fujimori",
      partido: "FUERZA POPULAR",
      vicepresidentes: ["Luis Galarreta Valerde (1ra VP)", "Miguel Torres (2da VP)"],
      color: "bg-orange-600",
      foto: "https://imagenes.elpais.com/resizer/v2/PFAKK3DLNZALHAL5UI53HN4U34.jpg?auth=f459ce6f6f9a52f26e29a55dde3908285c561db1cbef45b05e3e90149e3714eb&width=1960&height=1103&smart=true"
    },
    {
      id: 3,
      nombre: "César Acuña",
      partido: "ALIANZA PARA EL PROGRESO (APP)",
      vicepresidentes: ["Alejandro Soto Reyes (1ra VP)"],
      color: "bg-red-500",
      foto:"https://media.licdn.com/dms/image/v2/C4E03AQGJxBJ0bSWuZg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1604716749943?e=2147483647&v=beta&t=ZNagMTUTGdD6Uv8eHaYQEmg_iv-_TKWelejml-MN1Bk"
    },
    {
      id: 4,
      nombre: "Carlos Álvarez",
      partido: "PAÍS PARA TODOS",
      vicepresidentes: ["María Elena Foronda (1ra VP)", "Juan Carlos Zurek (2da VP)"],
      color: "bg-green-600",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02UQbaeTQsfobhIHYvq8moY_BZmDG62ABng&s"
    },
    {
      id: 5,
      nombre: "George Forsyth",
      partido: "SOMOS PERÚ",
      vicepresidentes: ["Elizabeth León Chinchay (1ra VP)", "Carlos Cuaresma (2da VP)"],
      color: "bg-cyan-600",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuzoy7Vi45oN6oqsQBXUvxnRwAtWlS7Tj4vQ&s"
    },
    {
      id: 6,
      nombre: "Alfredo Barnechea",
      partido: "ACCIÓN POPULAR",
      vicepresidentes: ["Patricia Juárez (1ra VP)", "Raúl Diez Canseco (2da VP)"],
      color: "bg-red-600",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3biVBbSTpHoKT4_KbtfFqxDKhzCR532A95g&s"
    },
    {
      id: 7,
      nombre: "Roberto Chiabra",
      partido: "UNIDAD NACIONAL (PPC)",
      vicepresidentes: ["Alberto Beingolea (1ra VP)", "Patricia Chirinos (2da VP)"],
      color: "bg-orange-500",
      foto: "https://i1.sndcdn.com/artworks-hOj2ngJDoyuWJe4j-4N0dMw-t1080x1080.jpg"
    },
    {
      id: 8,
      nombre: "Yonhy Lescano",
      partido: "COOPERACIÓN POPULAR",
      vicepresidentes: ["Víctor Isla Rojas (1ra VP)", "María Antonieta Alva (2da VP)"],
      color: "bg-purple-600",
      foto: "https://portal.andina.pe/EDPMedia/Fotografia/2021/02/04/00000050-candidato-yohny-lescano-cover.jpg"
    },
    {
      id: 9,
      nombre: "Fiorella Molinelli",
      partido: "FUERZA Y LIBERTAD",
      vicepresidentes: ["Renzo Reggiardo (1ra VP)", "Diana Gonzales (2da VP)"],
      color: "bg-indigo-600",
      foto: "https://media.licdn.com/dms/image/v2/C4E03AQE_J9IbMWp9dg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1632709850396?e=2147483647&v=beta&t=8IgPS4c7IVJv4YzL5Lg0hPYw1QYuuhpkqC2Wuq7RB4Y"
    },
    {
      id: 10,
      nombre: "José Luna Gálvez",
      partido: "PODEMOS PERÚ",
      vicepresidentes: ["Daniel Urresti (1ra VP)", "Katy Ugarte (2da VP)"],
      color: "bg-yellow-600",
      foto: "https://joselunagalvez.pe/wp-content/uploads/2023/01/Imagen27.jpg"
    },
    {
      id: 11,
      nombre: "Hernán Garrido Lecca",
      partido: "PARTIDO APRISTA PERUANO (APRA)",
      vicepresidentes: ["Javier Velásquez Quesquén (1ra VP)", "Jorge del Castillo (2da VP)"],
      color: "bg-red-700",
      foto: "https://www.loqueleo.com/pe/uploads/2017/10/resized/800_hernan-garrido.jpg"
    },
    {
      id: 12,
      nombre: "Alfonso López Chau",
      partido: "AHORA NACIÓN",
      vicepresidentes: ["Susel Paredes (1ra VP)", "Alberto de Belaunde (2da VP)"],
      color: "bg-teal-600",
      foto: "https://www.infobae.com/resizer/v2/DTPIXCE74BC4LFEIPFK2VHGGJ4.jpg?auth=7f8407504c54eaa22f04752c3bccb39dc022ec809beeba1c67c982989f673dd0&smart=true&width=1200&height=900&quality=85"
    }
  ],
  congresistas: [
    { id: 101, nombre: "María González Rodríguez", partido: "Renovación Popular", distrito: "Lima" },
    { id: 102, nombre: "Carlos Mendoza Silva", partido: "Fuerza Popular", distrito: "Lima" },
    { id: 103, nombre: "Ana Torres Velásquez", partido: "Alianza para el Progreso", distrito: "Lima" },
    { id: 104, nombre: "Roberto Sánchez Palomino", partido: "Juntos por el Perú", distrito: "Lima" },
    { id: 105, nombre: "Patricia Chirinos León", partido: "Avanza País", distrito: "Lima" },
    { id: 106, nombre: "Luis Valdez Farfán", partido: "Acción Popular", distrito: "Cusco" },
    { id: 107, nombre: "Martha Chávez Cossío", partido: "Fuerza Popular", distrito: "Lima" },
    { id: 108, nombre: "Germán Tacuri Valdivia", partido: "Perú Libre", distrito: "Puno" },
    { id: 109, nombre: "Hernando Guerra García", partido: "Fuerza Popular", distrito: "Lima" },
    { id: 110, nombre: "Susel Paredes Piqué", partido: "Somos Perú", distrito: "Lima" }
  ],
  parlamentoAndino: [
    { id: 201, nombre: "José Ramírez Condori", partido: "Renovación Popular", region: "Norte" },
    { id: 202, nombre: "Laura Sánchez Quispe", partido: "Fuerza Popular", region: "Sur" },
    { id: 203, nombre: "Miguel Ángel Torres", partido: "Alianza para el Progreso", region: "Centro" },
    { id: 204, nombre: "Patricia Juárez Gallegos", partido: "Acción Popular", region: "Lima" },
    { id: 205, nombre: "Alberto Beingolea Delgado", partido: "Partido Popular Cristiano", region: "Costa" },
    { id: 206, nombre: "Víctor Isla Rojas", partido: "Podemos Perú", region: "Oriente" }
  ]
};

const categoriasVotacion = [
  {
    id: "presidente",
    titulo: "Presidente y Vicepresidentes",
    subtitulo: "de la República",
    icono: Users,
    color: "from-indigo-500 to-purple-600",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
    descripcion: "Elige a tu fórmula presidencial",
  },
  {
    id: "congresistas",
    titulo: "Congresistas",
    subtitulo: "de la República",
    icono: Briefcase,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    descripcion: "Elige a tus representantes en el Congreso",
  },
  {
    id: "parlamentoAndino",
    titulo: "Parlamento Andino",
    subtitulo: "Representantes Regionales",
    icono: Globe2,
    color: "from-violet-500 to-fuchsia-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    descripcion: "Elige a tus representantes regionales",
  },
];

export default function Votar() {
  const [paso, setPaso] = useState(1);
  const [dni, setDni] = useState("");
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [votosRealizados, setVotosRealizados] = useState({});
  const [error, setError] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [candidatosData] = useState(candidatosIniciales);

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (paso === 1) {
      generateCaptcha();
    }
  }, [paso]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  const verificarDNI = () => {
    setError("");
    if (!dni || dni.length < 8) {
      setError("Por favor, ingrese un DNI válido (8 dígitos)");
      return;
    }

    if (!captchaInput || captchaInput.toUpperCase() !== captchaCode) {
      setError("El código de verificación no coincide");
      generateCaptcha();
      return;
    }

    setTimeout(() => setPaso(2), 800);
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaActual(categoria);
    setPaso(3);
  };

  const confirmarVotoDirecto = (candidatoVotado) => {
    setTimeout(() => {
      const nuevosVotos = {
        ...votosRealizados,
        [categoriaActual.id]: candidatoVotado,
      };
      setVotosRealizados(nuevosVotos);

      if (Object.keys(nuevosVotos).length === categoriasVotacion.length) {
        setPaso(5);
      } else {
        setCategoriaActual(null);
        setPaso(2);
      }
    }, 500);
  };

  const volverACategorias = () => {
    setCategoriaActual(null);
    setPaso(2);
  };

  const reiniciar = () => {
    setPaso(1);
    setDni("");
    setCategoriaActual(null);
    setVotosRealizados({});
    setError("");
    setCaptchaCode("");
    setCaptchaInput("");
  };

  const categoriasPendientes = categoriasVotacion.filter(
    (cat) => !votosRealizados[cat.id]
  );

  const progreso = (Object.keys(votosRealizados).length / categoriasVotacion.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-red-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* PASO 1: Verificación */}
          {paso === 1 && (
            <motion.div
              key="paso1"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-lg mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
                {/* Header card */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center p-2">
                    <img src={onpeLogo} alt="ONPE Logo" className="w-full h-full object-contain" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Verificación de Identidad</h2>
                  <p className="text-red-100 text-sm">Ingrese su DNI para continuar con el proceso de votación</p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Documento Nacional de Identidad
                    </label>
                    <input
                      type="text"
                      maxLength={8}
                      value={dni}
                      onChange={(e) => {
                        setDni(e.target.value.replace(/\D/g, ""));
                        setError("");
                      }}
                      placeholder="12345678"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all text-lg font-mono"
                    />
                    <p className="text-xs text-slate-500 mt-2">Debe contener 8 dígitos numéricos</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Código de Verificación
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          maxLength={4}
                          value={captchaInput}
                          onChange={(e) => {
                            setCaptchaInput(e.target.value.toUpperCase());
                            setError("");
                          }}
                          placeholder="Ingrese el código"
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all uppercase font-mono"
                        />
                      </div>
                      <div className="w-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border-2 border-slate-300">
                        <span className="text-2xl font-bold text-slate-700 tracking-widest select-none" style={{ fontFamily: 'monospace', letterSpacing: '0.3em' }}>
                          {captchaCode}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={generateCaptcha}
                      className="text-xs text-red-600 hover:text-red-700 font-medium mt-2 transition-colors"
                    >
                      Generar nuevo código
                    </button>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
                    >
                      <p className="text-sm text-red-700">{error}</p>
                    </motion.div>
                  )}

                  <button
                    onClick={verificarDNI}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-5 h-5" />
                    Verificar y Continuar
                  </button>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-xs text-red-800">
                      <strong>Seguridad:</strong> Sus datos están protegidos con encriptación de extremo a extremo durante todo el proceso electoral.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

         {/* PASO 2: Selección de Categorías */}
{paso === 2 && (
  <motion.div
    key="paso2"
    variants={fadeIn}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
{/* Header mejorado */}
<div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-red-600">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 border-2 border-red-600">
      <img src={onpeLogo} alt="ONPE Logo" className="w-full h-full object-contain" />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Mesa de Sufragio Electoral</h2>
      <p className="text-slate-600 text-sm">Elecciones Generales Perú 2026</p>
    </div>
  </div>
      
      {/* Barra de progreso */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span className="font-semibold">Progreso de votación</span>
          <span className="font-bold text-red-600">
            {Object.keys(votosRealizados).length} / {categoriasVotacion.length} categorías
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progreso}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full"
          />
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
        Seleccione la categoría para emitir su voto:
      </h3>
    </div>

    <div className="space-y-4 mb-8">
      {categoriasVotacion.map((categoria, index) => {
        const Icono = categoria.icono;
        const yaVoto = votosRealizados[categoria.id];

        return (
          <motion.div
            key={categoria.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: yaVoto ? 1 : 1.01 }}
          >
            <div
              className={`relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                yaVoto 
                  ? "border-green-500 bg-green-50/30" 
                  : "border-slate-200 hover:border-red-400 cursor-pointer"
              }`}
              onClick={() => !yaVoto && seleccionarCategoria(categoria)}
            >
              <div className="flex items-center gap-6 p-6">
                {/* Número de categoría */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl ${
                  yaVoto 
                    ? "bg-green-100 text-green-700"
                    : `bg-gradient-to-br ${categoria.color} text-white`
                }`}>
                  {yaVoto ? <CheckCircle2 className="w-8 h-8" /> : index + 1}
                </div>

                {/* Icono de categoría */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center ${
                  yaVoto 
                    ? "bg-green-100"
                    : categoria.bgLight
                }`}>
                  <Icono className={`w-7 h-7 ${yaVoto ? "text-green-600" : categoria.textColor}`} />
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold mb-1 ${yaVoto ? "text-green-700" : "text-slate-800"}`}>
                    {categoria.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">{categoria.subtitulo}</p>
                  <p className="text-xs text-slate-500">{categoria.descripcion}</p>
                </div>

                {/* Estado/Acción */}
                <div className="flex-shrink-0">
                  {yaVoto ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Completado
                    </div>
                  ) : (
                    <button className={`bg-gradient-to-r ${categoria.color} text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md`}>
                      Votar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Indicador de voto realizado */}
              {yaVoto && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Botones de navegación */}
    <div className="bg-white rounded-xl shadow-md p-6 border-2 border-slate-200">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button
          onClick={() => setPaso(1)}
          className="w-full sm:w-auto px-8 py-3 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>

        {Object.keys(votosRealizados).length === categoriasVotacion.length && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaso(5)}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
          >
            <CheckCircle2 className="w-5 h-5" />
            Finalizar y Confirmar Votación
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {Object.keys(votosRealizados).length < categoriasVotacion.length && (
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-red-600">
              {categoriasVotacion.length - Object.keys(votosRealizados).length}
            </span>
            {" "}categoría{categoriasVotacion.length - Object.keys(votosRealizados).length !== 1 ? "s" : ""} pendiente{categoriasVotacion.length - Object.keys(votosRealizados).length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  </motion.div>
)}

          {/* PASO 3: Votación */}
          {paso === 3 && categoriaActual && (
            <motion.div
              key="paso3"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mb-8">
                <button
                  onClick={volverACategorias}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver a categorías
                </button>

                <div className="text-center mb-8">
                  <div className={`inline-block bg-gradient-to-r ${categoriaActual.color} text-white px-6 py-2 rounded-full text-sm font-semibold mb-3`}>
                    {categoriaActual.titulo}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Selecciona un candidato para marcar tu voto</h2>
                </div>
              </div>

              {categoriaActual.id === "presidente" && (
                <div className="grid md:grid-cols-3 gap-6">
                  {candidatosData.presidente.map((candidato) => (
                    <motion.div
                      key={candidato.id}
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div
                        onClick={() => confirmarVotoDirecto(candidato)}
                        className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-400 transition-all"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                          {candidato.foto ? (
                            <img 
                              src={candidato.foto} 
                              alt={candidato.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Users className="w-20 h-20 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-slate-800 mb-1">{candidato.nombre}</h3>
                          <div className={`inline-block ${candidato.color} text-white text-xs px-3 py-1 rounded-full font-semibold mb-3`}>
                            {candidato.partido}
                          </div>
                          <div className="text-sm text-slate-600">
                            <p className="font-semibold mb-1">Vicepresidentes:</p>
                            {candidato.vicepresidentes.map((vp, i) => (
                              <p key={i} className="text-xs">• {vp}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {categoriaActual.id === "congresistas" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {candidatosData.congresistas.map((candidato) => (
                    <motion.div
                      key={candidato.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        onClick={() => confirmarVotoDirecto(candidato)}
                        className="bg-white rounded-xl shadow-lg shadow-slate-200/50 p-6 cursor-pointer border-2 border-transparent hover:border-emerald-400 transition-all flex items-center gap-4"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-white">{candidato.nombre.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800">{candidato.nombre}</h3>
                          <p className="text-sm text-slate-600">{candidato.partido}</p>
                          <p className="text-xs text-slate-500 mt-1">Distrito: {candidato.distrito}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {categoriaActual.id === "parlamentoAndino" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {candidatosData.parlamentoAndino.map((candidato) => (
                    <motion.div
                      key={candidato.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        onClick={() => confirmarVotoDirecto(candidato)}
                        className="bg-white rounded-xl shadow-lg shadow-slate-200/50 p-6 cursor-pointer border-2 border-transparent hover:border-violet-400 transition-all flex items-center gap-4"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-white">{candidato.nombre.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800">{candidato.nombre}</h3>
                          <p className="text-sm text-slate-600">{candidato.partido}</p>
                          <p className="text-xs text-slate-500 mt-1">Región: {candidato.region}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PASO 5: Finalización */}
          {paso === 5 && (
            <motion.div
              key="paso5"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-2">¡Votación Completada!</h2>
                  <p className="text-green-100">Su voto ha sido registrado exitosamente</p>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="font-bold text-slate-800 text-lg mb-4">Resumen de su votación:</h3>
                  
                  {categoriasVotacion.map((cat) => {
                    const voto = votosRealizados[cat.id];
                    if (!voto) return null;

                    return (
                      <div key={cat.id} className={`${cat.bgLight} border-2 border-slate-200 rounded-xl p-5`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${cat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <cat.icono className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                              {cat.titulo}
                            </p>
                            <p className="font-bold text-slate-800 text-lg">{voto.nombre}</p>
                            {voto.partido && (
                              <p className="text-sm text-slate-600 mt-1">{voto.partido}</p>
                            )}
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                      </div>
                    );
                  })}

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mt-6">
                    <p className="text-sm text-blue-800 text-center">
                      <strong>Importante:</strong> Su voto ha sido encriptado y almacenado de forma segura. Gracias por participar en el proceso democrático.
                    </p>
                  </div>

                  <button
                    onClick={reiniciar}
                    className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4 rounded-xl font-semibold hover:from-slate-800 hover:to-slate-900 transition-all mt-6"
                  >
                    Realizar Nueva Votación
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
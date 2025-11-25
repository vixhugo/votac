import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, FileText, Clock, Activity, ChevronDown } from 'lucide-react';

// --- Componente para Contador Animado ---
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const easing = (t) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    let startTime;
    const startValue = countRef.current;
    const endValue = value;
    const changeInValue = endValue - startValue;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easing(progress);
      const currentValue = Math.floor(startValue + changeInValue * easedProgress);
      
      setCount(currentValue);
      countRef.current = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, duration]);

  return <span>{count.toLocaleString('es-PE')}</span>;
};

// --- Datos de Ejemplo por Región ---
const resultadosPorRegion = {
  Nacional: [
    { nombre: "Fuerza Popular", votos: 2350123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 1924102, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 1625987, color: "#EA580C" },
    { nombre: "Alianza para el Progreso", votos: 1435115, color: "#16A34A" },
    { nombre: "Juntos por el Perú", votos: 1238220, color: "#9333EA" },
    { nombre: "Partido Morado", votos: 1068765, color: "#7C3AED" },
    { nombre: "Unidad Nacional", votos: 915123, color: "#F59E0B" },
    { nombre: "Somos Perú", votos: 775876, color: "#64748B" },
    { nombre: "Otros", votos: 2017689, color: "#6B7280" },
  ],
  Lima: [
    { nombre: "Fuerza Popular", votos: 980123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 824102, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 645987, color: "#EA580C" },
    { nombre: "Alianza para el Progreso", votos: 535115, color: "#16A34A" },
    { nombre: "Partido Morado", votos: 445876, color: "#7C3AED" },
    { nombre: "Otros", votos: 914673, color: "#6B7280" },
  ],
  Cusco: [
    { nombre: "Juntos por el Perú", votos: 245987, color: "#9333EA" },
    { nombre: "Unidad Nacional", votos: 198765, color: "#F59E0B" },
    { nombre: "Fuerza Popular", votos: 180123, color: "#DC2626" },
    { nombre: "Acción Popular", votos: 154102, color: "#EA580C" },
    { nombre: "Renovación Popular", votos: 124876, color: "#2563EB" },
    { nombre: "Otros", votos: 251023, color: "#6B7280" },
  ],
  Arequipa: [
    { nombre: "Renovación Popular", votos: 412102, color: "#2563EB" },
    { nombre: "Fuerza Popular", votos: 380123, color: "#DC2626" },
    { nombre: "Juntos por el Perú", votos: 245987, color: "#9333EA" },
    { nombre: "Acción Popular", votos: 154102, color: "#EA580C" },
    { nombre: "Otros", votos: 251023, color: "#6B7280" },
  ],
  Junín: [
    { nombre: "Alianza para el Progreso", votos: 235115, color: "#16A34A" },
    { nombre: "Fuerza Popular", votos: 180123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 124876, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 154102, color: "#EA580C" },
    { nombre: "Otros", votos: 251023, color: "#6B7280" },
  ],
  "La Libertad": [
    { nombre: "Fuerza Popular", votos: 280123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 224102, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 145987, color: "#EA580C" },
    { nombre: "Alianza para el Progreso", votos: 135115, color: "#16A34A" },
    { nombre: "Otros", votos: 151023, color: "#6B7280" },
  ],
  Piura: [
    { nombre: "Renovación Popular", votos: 312102, color: "#2563EB" },
    { nombre: "Fuerza Popular", votos: 280123, color: "#DC2626" },
    { nombre: "Acción Popular", votos: 145987, color: "#EA580C" },
    { nombre: "Juntos por el Perú", votos: 138220, color: "#9333EA" },
    { nombre: "Otros", votos: 151023, color: "#6B7280" },
  ],
  Lambayeque: [
    { nombre: "Alianza para el Progreso", votos: 198765, color: "#16A34A" },
    { nombre: "Renovación Popular", votos: 176543, color: "#2563EB" },
    { nombre: "Fuerza Popular", votos: 145987, color: "#DC2626" },
    { nombre: "Acción Popular", votos: 124102, color: "#EA580C" },
    { nombre: "Otros", votos: 151023, color: "#6B7280" },
  ],
  Cajamarca: [
    { nombre: "Fuerza Popular", votos: 245987, color: "#DC2626" },
    { nombre: "Juntos por el Perú", votos: 198765, color: "#9333EA" },
    { nombre: "Acción Popular", votos: 176543, color: "#EA580C" },
    { nombre: "Renovación Popular", votos: 145102, color: "#2563EB" },
    { nombre: "Otros", votos: 151023, color: "#6B7280" },
  ],
  Ancash: [
    { nombre: "Renovación Popular", votos: 212102, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 198765, color: "#EA580C" },
    { nombre: "Fuerza Popular", votos: 180123, color: "#DC2626" },
    { nombre: "Alianza para el Progreso", votos: 135115, color: "#16A34A" },
    { nombre: "Otros", votos: 151023, color: "#6B7280" },
  ],
  Apurímac: [
    { nombre: "Juntos por el Perú", votos: 145987, color: "#9333EA" },
    { nombre: "Fuerza Popular", votos: 125123, color: "#DC2626" },
    { nombre: "Unidad Nacional", votos: 98765, color: "#F59E0B" },
    { nombre: "Acción Popular", votos: 87654, color: "#EA580C" },
    { nombre: "Otros", votos: 101023, color: "#6B7280" },
  ],
  Ayacucho: [
    { nombre: "Unidad Nacional", votos: 178765, color: "#F59E0B" },
    { nombre: "Juntos por el Perú", votos: 156987, color: "#9333EA" },
    { nombre: "Fuerza Popular", votos: 135123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 98654, color: "#2563EB" },
    { nombre: "Otros", votos: 111023, color: "#6B7280" },
  ],
  Huancavelica: [
    { nombre: "Acción Popular", votos: 125987, color: "#EA580C" },
    { nombre: "Juntos por el Perú", votos: 108765, color: "#9333EA" },
    { nombre: "Fuerza Popular", votos: 95123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 76654, color: "#2563EB" },
    { nombre: "Otros", votos: 91023, color: "#6B7280" },
  ],
  Ica: [
    { nombre: "Renovación Popular", votos: 178102, color: "#2563EB" },
    { nombre: "Fuerza Popular", votos: 156123, color: "#DC2626" },
    { nombre: "Acción Popular", votos: 125987, color: "#EA580C" },
    { nombre: "Alianza para el Progreso", votos: 98765, color: "#16A34A" },
    { nombre: "Otros", votos: 111023, color: "#6B7280" },
  ],
  Puno: [
    { nombre: "Juntos por el Perú", votos: 198765, color: "#9333EA" },
    { nombre: "Unidad Nacional", votos: 176543, color: "#F59E0B" },
    { nombre: "Fuerza Popular", votos: 145987, color: "#DC2626" },
    { nombre: "Acción Popular", votos: 124102, color: "#EA580C" },
    { nombre: "Otros", votos: 151023, color: "#6B7280" },
  ],
  Moquegua: [
    { nombre: "Renovación Popular", votos: 98765, color: "#2563EB" },
    { nombre: "Fuerza Popular", votos: 87123, color: "#DC2626" },
    { nombre: "Acción Popular", votos: 65987, color: "#EA580C" },
    { nombre: "Alianza para el Progreso", votos: 54102, color: "#16A34A" },
    { nombre: "Otros", votos: 61023, color: "#6B7280" },
  ],
  Tacna: [
    { nombre: "Fuerza Popular", votos: 92123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 87654, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 76543, color: "#EA580C" },
    { nombre: "Alianza para el Progreso", votos: 65432, color: "#16A34A" },
    { nombre: "Otros", votos: 71023, color: "#6B7280" },
  ],
  Tumbes: [
    { nombre: "Alianza para el Progreso", votos: 78765, color: "#16A34A" },
    { nombre: "Renovación Popular", votos: 65432, color: "#2563EB" },
    { nombre: "Fuerza Popular", votos: 54123, color: "#DC2626" },
    { nombre: "Acción Popular", votos: 43210, color: "#EA580C" },
    { nombre: "Otros", votos: 51023, color: "#6B7280" },
  ],
  Huancayo: [
    { nombre: "Alianza para el Progreso", votos: 145115, color: "#16A34A" },
    { nombre: "Fuerza Popular", votos: 120123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 98876, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 87654, color: "#EA580C" },
    { nombre: "Otros", votos: 101023, color: "#6B7280" },
  ],
  Ucayali: [
    { nombre: "Fuerza Popular", votos: 156123, color: "#DC2626" },
    { nombre: "Juntos por el Perú", votos: 134987, color: "#9333EA" },
    { nombre: "Renovación Popular", votos: 102654, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 87432, color: "#EA580C" },
    { nombre: "Otros", votos: 111023, color: "#6B7280" },
  ],
  Loreto: [
    { nombre: "Juntos por el Perú", votos: 178765, color: "#9333EA" },
    { nombre: "Fuerza Popular", votos: 145123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 108654, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 96432, color: "#EA580C" },
    { nombre: "Otros", votos: 121023, color: "#6B7280" },
  ],
  "Madre de Dios": [
    { nombre: "Renovación Popular", votos: 65432, color: "#2563EB" },
    { nombre: "Fuerza Popular", votos: 54123, color: "#DC2626" },
    { nombre: "Juntos por el Perú", votos: 43210, color: "#9333EA" },
    { nombre: "Acción Popular", votos: 32109, color: "#EA580C" },
    { nombre: "Otros", votos: 41023, color: "#6B7280" },
  ],
  "San Martín": [
    { nombre: "Alianza para el Progreso", votos: 125115, color: "#16A34A" },
    { nombre: "Fuerza Popular", votos: 108123, color: "#DC2626" },
    { nombre: "Renovación Popular", votos: 87654, color: "#2563EB" },
    { nombre: "Acción Popular", votos: 76543, color: "#EA580C" },
    { nombre: "Otros", votos: 91023, color: "#6B7280" },
  ],
};

const regiones = Object.keys(resultadosPorRegion);

export default function Resultados() {
  const [selectedRegion, setSelectedRegion] = useState('Nacional');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const currentResults = useMemo(() => resultadosPorRegion[selectedRegion] || [], [selectedRegion]);
  const totalVotes = useMemo(() => currentResults.reduce((sum, p) => sum + p.votos, 0), [currentResults]);
  const maxVotes = useMemo(() => Math.max(...currentResults.map(p => p.votos)), [currentResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} 
      className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resultados en Tiempo Real</h1>
            <p className="text-sm text-gray-600">Monitoreo del conteo de votos - Elecciones 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <Clock className="w-4 h-4" />
          {lastUpdate.toLocaleTimeString('es-PE')}
        </div>
      </motion.div>

      {/* Selector de Región Dropdown */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative"
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white p-4 rounded-xl shadow-md border border-gray-200 flex items-center justify-between hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            <span className="font-semibold text-gray-900 text-lg">{selectedRegion}</span>
          </div>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
                {regiones.map((region) => (
                  <motion.button
                    key={region}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                      selectedRegion === region
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Votos Emitidos</h3>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <AnimatedCounter value={totalVotes} />
          </p>
          <p className="text-sm text-gray-600 mt-2">En {selectedRegion}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Participación</h3>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">73.84%</p>
          <p className="text-sm text-gray-600 mt-2">Del padrón electoral</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Actas Procesadas</h3>
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">52.14%</p>
          <p className="text-sm text-gray-600 mt-2">44,324 de 85,000</p>
        </motion.div>
      </div>

      {/* Gráfico de Barras y Tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Distribución de Votos</h2>
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {currentResults.map((partido, index) => (
                <motion.div
                  key={`${selectedRegion}-${partido.nombre}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-32 text-sm font-medium text-gray-700 truncate">{partido.nombre}</div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-200 rounded-full h-7 overflow-hidden shadow-sm">
                      <motion.div
                        className="h-full rounded-full flex items-center justify-end pr-2 shadow-md"
                        style={{ backgroundColor: partido.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(partido.votos / maxVotes) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                      >
                        <span className="text-white text-xs font-bold drop-shadow">
                          {((partido.votos / totalVotes) * 100).toFixed(2)}%
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tabla de Resultados Detallados */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resultados Detallados</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Partido</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Votos</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Porcentaje</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentResults.map((partido) => (
                  <motion.tr 
                    key={partido.nombre}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{partido.nombre}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                      <AnimatedCounter value={partido.votos} duration={1.5} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-right">
                      <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2.5 py-1 rounded-full">
                        {((partido.votos / totalVotes) * 100).toFixed(3)}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
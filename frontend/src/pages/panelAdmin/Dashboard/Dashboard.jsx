import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Activity,
  Eye,
  Award,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const estadisticas = {
  mesasProcesadas: 52.14,
  votantesRegistrados: 12763599,
  participacion: 73.84,
  incidencias: 126,
};

const resultadosPartidos = [
  { partido: "FP", nombre: "Fuerza Popular", porcentaje: 18.5, votos: 2361366, color: "#EF4444" },
  { partido: "RP", nombre: "Renovación Popular", porcentaje: 15.2, votos: 1940067, color: "#3B82F6" },
  { partido: "AP", nombre: "Acción Popular", porcentaje: 12.8, votos: 1633740, color: "#F97316" },
  { partido: "APP", nombre: "APP", porcentaje: 11.3, votos: 1442287, color: "#10B981" },
  { partido: "JPP", nombre: "Juntos por el Perú", porcentaje: 9.7, votos: 1238069, color: "#8B5CF6" },
  { partido: "PM", nombre: "Partido Morado", porcentaje: 8.4, votos: 1072142, color: "#6366F1" },
  { partido: "UN", nombre: "Unidad Nacional", porcentaje: 7.2, votos: 918979, color: "#F59E0B" },
  { partido: "SP", nombre: "Somos Perú", porcentaje: 6.1, votos: 778579, color: "#64748B" },
  { partido: "Otros", nombre: "Otros", porcentaje: 11.0, votos: 1403970, color: "#94A3B8" },
];

const participacionRegional = [
  { region: "Lima", participacion: 78 },
  { region: "Arequipa", participacion: 73 },
  { region: "Cusco", participacion: 69 },
  { region: "Piura", participacion: 71 },
  { region: "Junín", participacion: 68 },
  { region: "Loreto", participacion: 65 },
];

const top5Partidos = resultadosPartidos.slice(0, 5);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Panel de Resultados Electorales</h1>
          <p className="text-slate-600">Elecciones Generales 2026 - Actualización en tiempo real</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-blue-100">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  EN VIVO
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 mb-2">Mesas Procesadas</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-slate-800">{estadisticas.mesasProcesadas}%</p>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="mt-4 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${estadisticas.mesasProcesadas}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-purple-100">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  REGISTRO
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 mb-2">Votantes Registrados</h3>
              <p className="text-4xl font-bold text-slate-800">{(estadisticas.votantesRegistrados / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-slate-500 mt-3">
                {estadisticas.votantesRegistrados.toLocaleString('es-PE')} ciudadanos
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-emerald-100">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                  ACTIVO
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 mb-2">Participación Actual</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-slate-800">{estadisticas.participacion}%</p>
                <Award className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="mt-4 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${estadisticas.participacion}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-orange-100">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  ALERTAS
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 mb-2">Incidencias Reportadas</h3>
              <p className="text-4xl font-bold text-slate-800">{estadisticas.incidencias}</p>
              <p className="text-xs text-slate-500 mt-3">En proceso de resolución</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Resultados Presidenciales</h2>
                <p className="text-sm text-slate-500 mt-1">Distribución de votos por partido político</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resultadosPartidos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis 
                    dataKey="partido" 
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="porcentaje" radius={[8, 8, 0, 0]}>
                    {resultadosPartidos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Top 5 Partidos</h2>
                <p className="text-sm text-slate-500 mt-1">Distribución porcentual</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={top5Partidos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ partido, porcentaje }) => `${partido}: ${porcentaje}%`}
                    outerRadius={100}
                    dataKey="porcentaje"
                  >
                    {top5Partidos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Participación por Región</h2>
                <p className="text-sm text-slate-500 mt-1">Análisis de participación ciudadana</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={participacionRegional}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="region" 
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="participacion" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Ranking de Partidos</h2>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {resultadosPartidos.slice(0, 8).map((partido, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 text-sm">
                    {index + 1}
                  </div>
                  <div 
                    className="w-1 h-12 rounded-full" 
                    style={{ backgroundColor: partido.color }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{partido.nombre}</p>
                    <p className="text-xs text-slate-500">{partido.votos.toLocaleString('es-PE')} votos</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{partido.porcentaje}%</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">Tabla Detallada de Resultados</h2>
            <p className="text-sm text-slate-500 mt-1">Información completa de todos los partidos</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Pos</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Partido</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Votos</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Porcentaje</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                {resultadosPartidos.map((partido, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 text-sm">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: partido.color }}
                        />
                        <div>
                          <p className="font-semibold text-slate-800">{partido.nombre}</p>
                          <p className="text-xs text-slate-500">{partido.partido}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {partido.votos.toLocaleString('es-PE')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[120px]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${partido.porcentaje * 5}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: partido.color }}
                          />
                        </div>
                        <span className="font-bold text-slate-800 min-w-[50px]">{partido.porcentaje}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Activo
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
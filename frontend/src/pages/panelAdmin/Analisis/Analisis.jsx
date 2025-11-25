import React, { useState, useEffect } from "react";
import { Upload, Sparkles, Cpu, CheckCircle, BarChart3, TrendingUp, FileText, Download, Filter, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from "recharts";

// Generar datos sucios y limpios de 100 registros
const generarDatosConSuciedad = () => {
  const regiones = ["Lima", "Cusco", "Arequipa", "Piura", "Junín", "La Libertad", "Lambayeque"];
  const distritos = ["Cusco", "Yanahuara", "San Isidro", "Trujillo", "Huancayo", "Chiclayo", "Piura"];
  const nombres = ["Juan", "María", "Carlos", "Ana", "Roberto", "Laura", "Diego", "Patricia", "Miguel", "Sofía"];
  const apellidos = ["Pérez", "García", "López", "Sánchez", "Flores", "Morales", "Ruiz", "Martínez", "Rodríguez", "Hernández"];

  const sucios = [];
  const limpios = [];
  let usedDNIs = new Set();

  for (let i = 0; i < 100; i++) {
    const isSucio = Math.random() < 0.3; // 30% datos sucios

    if (isSucio) {
      const razonesError = [
        { razón: "DNI vacío", data: { DNI: "", Nombres: nombres[Math.floor(Math.random() * nombres.length)], Apellidos: apellidos[Math.floor(Math.random() * apellidos.length)], Región: regiones[Math.floor(Math.random() * regiones.length)], Mesa: String(1000 + i).slice(1) + String.fromCharCode(65 + Math.floor(Math.random() * 26)) } },
        { razón: "Nombres/Apellidos vacíos", data: { DNI: String(10000000 + i).slice(0, 8), Nombres: "", Apellidos: "", Región: regiones[Math.floor(Math.random() * regiones.length)], Mesa: String(1000 + i).slice(1) + String.fromCharCode(65 + Math.floor(Math.random() * 26)) } },
        { razón: "Región inválida", data: { DNI: String(10000000 + i).slice(0, 8), Nombres: nombres[Math.floor(Math.random() * nombres.length)], Apellidos: apellidos[Math.floor(Math.random() * apellidos.length)], Región: "Unknown", Mesa: String(1000 + i).slice(1) + String.fromCharCode(65 + Math.floor(Math.random() * 26)) } },
        { razón: "Mesa vacía", data: { DNI: String(10000000 + i).slice(0, 8), Nombres: nombres[Math.floor(Math.random() * nombres.length)], Apellidos: apellidos[Math.floor(Math.random() * apellidos.length)], Región: regiones[Math.floor(Math.random() * regiones.length)], Mesa: "" } },
      ];
      const error = razonesError[Math.floor(Math.random() * razonesError.length)];
      sucios.push({ ...error.data, Razón: error.razón });
    } else {
      let dni;
      do {
        dni = String(10000000 + i).slice(0, 8);
      } while (usedDNIs.has(dni));
      usedDNIs.add(dni);

      const region = regiones[Math.floor(Math.random() * regiones.length)];
      limpios.push({
        DNI: dni,
        Nombres: nombres[Math.floor(Math.random() * nombres.length)],
        Apellidos: apellidos[Math.floor(Math.random() * apellidos.length)],
        Región: region,
        Provincia: region,
        Distrito: distritos[Math.floor(Math.random() * distritos.length)],
        Mesa: String(1000 + i).slice(1) + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      });
    }
  }

  return { sucios, limpios };
};

const datosIniciales = generarDatosConSuciedad();

// Datos simulados para training
const trainingData = [
  { epoch: 1, loss: 0.85, accuracy: 0.65, val_loss: 0.82, val_accuracy: 0.67 },
  { epoch: 2, loss: 0.72, accuracy: 0.73, val_loss: 0.70, val_accuracy: 0.75 },
  { epoch: 3, loss: 0.61, accuracy: 0.79, val_loss: 0.62, val_accuracy: 0.81 },
  { epoch: 4, loss: 0.52, accuracy: 0.84, val_loss: 0.55, val_accuracy: 0.85 },
  { epoch: 5, loss: 0.45, accuracy: 0.87, val_loss: 0.48, val_accuracy: 0.88 },
  { epoch: 6, loss: 0.38, accuracy: 0.90, val_loss: 0.42, val_accuracy: 0.91 },
  { epoch: 7, loss: 0.32, accuracy: 0.92, val_loss: 0.36, val_accuracy: 0.93 },
  { epoch: 8, loss: 0.28, accuracy: 0.94, val_loss: 0.31, val_accuracy: 0.94 },
];

// Generar 100 registros simulados
const generarRegistrosSimulados = () => {
  const regiones = ["Lima", "Cusco", "Arequipa", "Piura", "Junín", "La Libertad", "Lambayeque"];
  const distritos = ["Cusco", "Yanahuara", "San Isidro", "Trujillo", "Huancayo", "Chiclayo", "Piura"];
  const nombres = ["Juan", "María", "Carlos", "Ana", "Roberto", "Laura", "Diego", "Patricia", "Miguel", "Sofía"];
  const apellidos = ["Pérez", "García", "López", "Sánchez", "Flores", "Morales", "Ruiz", "Martínez", "Rodríguez", "Hernández"];

  const registros = [];
  for (let i = 0; i < 100; i++) {
    const dni = String(10000000 + i).slice(0, 8);
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    const region = regiones[Math.floor(Math.random() * regiones.length)];
    const distrito = distritos[Math.floor(Math.random() * distritos.length)];
    const mesa = String(1000 + i).slice(1) + String.fromCharCode(65 + Math.floor(Math.random() * 26));

    registros.push({
      DNI: dni,
      Nombres: nombre,
      Apellidos: apellido,
      Región: region,
      Provincia: region,
      Distrito: distrito,
      Mesa: mesa,
    });
  }
  return registros;
};

// Datasets predefinidos
const datasetsDisponibles = [
  {
    nombre: "Electoral_Lima_2026.csv",
    registros: generarRegistrosSimulados(),
    tamaño: "2.45 MB"
  },
  {
    nombre: "Padrón_Nacional_2026.xlsx",
    registros: generarRegistrosSimulados(),
    tamaño: "5.87 MB"
  },
];

export default function Analisis() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedCleaning, setSelectedCleaning] = useState([]);
  const [cleaningResults, setCleaningResults] = useState(null);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDatasetSelect = (dataset) => {
    setFileName(dataset.nombre);
    setIsUploading(true);
    setUploadProgress(0);

    // Simular progreso de carga
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFileData({
            totalRows: dataset.registros.length,
            columns: ["DNI", "Nombres", "Apellidos", "Región", "Provincia", "Distrito", "Mesa"],
            fileSize: dataset.tamaño,
            sampleRows: dataset.registros.slice(0, 10),
            allRows: dataset.registros,
          });
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true);
      setUploadProgress(0);

      // Simular progreso de carga del archivo
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            const simulatedData = {
              totalRows: 100,
              columns: ["DNI", "Nombres", "Apellidos", "Región", "Provincia", "Distrito", "Mesa"],
              fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
              sampleRows: generarRegistrosSimulados().slice(0, 10),
              allRows: generarRegistrosSimulados(),
            };
            setFileData(simulatedData);
            return 100;
          }
          return prev + Math.random() * 30;
        });
      }, 200);
    }
  };

  const handleCleaningToggle = (item) => {
    setSelectedCleaning((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleApplyCleaning = () => {
    if (selectedCleaning.length === 0) {
      alert("Por favor selecciona al menos una operación de limpieza");
      return;
    }
    
    const totalRows = fileData?.totalRows || 100;
    const registrosEliminados = datosIniciales.sucios.length;
    const registrosLimpios = datosIniciales.limpios.length;
    const precision = ((registrosLimpios / totalRows) * 100).toFixed(1);
    const completitud = precision;

    setCleaningResults({
      registrosEliminados,
      registrosLimpios,
      precision: parseFloat(precision),
      completitud: parseFloat(completitud),
      operacionesAplicadas: selectedCleaning,
    });
  };

  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setCurrentEpoch([]);
    
    let epochIdx = 0;
    const interval = setInterval(() => {
      if (epochIdx < trainingData.length) {
        setCurrentEpoch(trainingData.slice(0, epochIdx + 1));
        epochIdx++;
        setTrainingProgress((epochIdx / trainingData.length) * 100);
      } else {
        clearInterval(interval);
        setIsTraining(false);
        setTrainingProgress(100);
      }
    }, 300);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!fileData) {
        alert("Por favor carga un archivo primero");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!cleaningResults) {
        alert("Por favor aplica la limpieza de datos primero");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (trainingProgress < 100) {
        alert("Por favor espera a que termine el entrenamiento");
        return;
      }
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setShowResults(false);
    setStep(1);
    setFileName("");
    setFileData(null);
    setSelectedCleaning([]);
    setCleaningResults(null);
    setTrainingProgress(0);
    setIsTraining(false);
    setCurrentEpoch([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análisis de Datos Electorales</h1>
            <p className="text-sm text-gray-600">Procesa, limpia y entrena modelos predictivos</p>
          </div>
        </div>
      </motion.div>

      {showResults ? (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Registros Procesados", value: cleaningResults?.registrosLimpios.toLocaleString(), color: "blue" },
                { label: "Precisión", value: cleaningResults?.precision + "%", color: "green" },
                { label: "Registros Eliminados", value: cleaningResults?.registrosEliminados.toLocaleString(), color: "orange" },
                { label: "Completitud", value: cleaningResults?.completitud + "%", color: "purple" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-lg bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border border-${stat.color}-200`}
                >
                  <p className={`text-sm text-${stat.color}-700 mb-1`}>{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end gap-3"
          >
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all font-medium"
            >
              Nuevo Análisis
            </button>
          </motion.div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-12">
            {[
              { id: 1, icon: Upload, label: "Cargar Dataset" },
              { id: 2, icon: Sparkles, label: "Limpieza" },
              { id: 3, icon: Cpu, label: "Entrenamiento" },
            ].map(({ id, icon: Icon, label }) => (
              <div key={id} className="flex flex-col items-center flex-1">
                <motion.div
                  animate={{ scale: step === id ? 1.1 : 1 }}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 ${
                    step >= id
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-indigo-600"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {step > id ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </motion.div>
                <p className={`text-xs font-medium text-center ${step >= id ? "text-indigo-600" : "text-gray-500"}`}>
                  {label}
                </p>
                {id < 3 && <div className={`absolute h-1 w-16 mt-6 ml-12 ${step > id ? "bg-indigo-600" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Upload */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-600 mb-2">Paso 1: Carga de Dataset</h3>
                <p className="text-gray-600">Selecciona el archivo con los datos electorales</p>
              </div>

              {!fileData ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Datasets disponibles */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Datasets Disponibles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {datasetsDisponibles.map((dataset, i) => (
                        <motion.button
                          key={i}
                          onClick={() => handleDatasetSelect(dataset)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 border-2 border-indigo-300 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-all text-left"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold text-gray-900">{dataset.nombre}</p>
                              <p className="text-sm text-gray-600 mt-1">100 registros • {dataset.tamaño}</p>
                            </div>
                            <Upload className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t-2 border-gray-300" />
                    <span className="text-sm text-gray-600 font-medium">O</span>
                    <div className="flex-1 border-t-2 border-gray-300" />
                  </div>

                  {/* Cargar archivo manual */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 transition-all">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 mb-4 font-medium">Sube tu propio archivo</p>
                    <label className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer transition-all">
                      Seleccionar archivo
                      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  {/* Barra de progreso de carga */}
                  {isUploading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-blue-700">Cargando archivo...</span>
                        <span className="font-bold text-blue-700">{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-green-800">Archivo cargado exitosamente</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Nombre</p>
                      <p className="font-bold text-gray-900">{fileName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total de registros</p>
                      <p className="font-bold text-gray-900">{fileData.totalRows.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Cleaning */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-600 mb-2">Paso 2: Limpieza de Datos</h3>
                <p className="text-gray-600">Selecciona las operaciones de limpieza a aplicar</p>
              </div>

              <div className="space-y-3">
                {[
                  "Eliminar filas vacías",
                  "Corregir nombres geográficos",
                  "Eliminar duplicados",
                  "Normalizar variables numéricas",
                ].map((op, i) => (
                  <label key={i} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-indigo-50 transition-all">
                    <input
                      type="checkbox"
                      checked={selectedCleaning.includes(op)}
                      onChange={() => handleCleaningToggle(op)}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                    <span className="ml-3 font-medium text-gray-900">{op}</span>
                  </label>
                ))}
              </div>

              {selectedCleaning.length > 0 && (
                <button
                  onClick={handleApplyCleaning}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-bold transition-all"
                >
                  Aplicar Limpieza
                </button>
              )}

              {cleaningResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Datos Sucios */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-bold text-red-700">Registros Eliminados ({datosIniciales.sucios.length})</h4>
                    </div>
                    <div className="overflow-x-auto border border-red-200 rounded-lg max-h-64">
                      <table className="w-full text-sm">
                        <thead className="bg-red-50 sticky top-0">
                          <tr>
                            {["DNI", "Nombres", "Región", "Razón"].map((h) => (
                              <th key={h} className="px-4 py-2 text-left text-xs font-bold text-red-700 uppercase whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-red-200">
                          {datosIniciales.sucios.map((row, i) => (
                            <tr key={i} className="bg-red-50 hover:bg-red-100">
                              <td className="px-4 py-2 text-sm">{row.DNI || "-"}</td>
                              <td className="px-4 py-2 text-sm">{row.Nombres || "-"}</td>
                              <td className="px-4 py-2 text-sm">{row.Región || "-"}</td>
                              <td className="px-4 py-2 text-sm font-medium text-red-700">{row.Razón}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Datos Limpios */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-green-700">Registros Limpios ({datosIniciales.limpios.length})</h4>
                    </div>
                    <div className="overflow-x-auto border border-green-200 rounded-lg max-h-64">
                      <table className="w-full text-sm">
                        <thead className="bg-green-50 sticky top-0">
                          <tr>
                            {["DNI", "Nombres", "Apellidos", "Región", "Distrito", "Mesa"].map((h) => (
                              <th key={h} className="px-4 py-2 text-left text-xs font-bold text-green-700 uppercase whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-green-200">
                          {datosIniciales.limpios.map((row, i) => (
                            <tr key={i} className="bg-green-50 hover:bg-green-100">
                              <td className="px-4 py-2 text-sm font-medium">{row.DNI}</td>
                              <td className="px-4 py-2 text-sm">{row.Nombres}</td>
                              <td className="px-4 py-2 text-sm">{row.Apellidos}</td>
                              <td className="px-4 py-2 text-sm">{row.Región}</td>
                              <td className="px-4 py-2 text-sm">{row.Distrito}</td>
                              <td className="px-4 py-2 text-sm">{row.Mesa}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Training */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-600 mb-2">Paso 3: Entrenamiento del Modelo</h3>
                <p className="text-gray-600">Entrena el modelo con los datos limpios</p>
              </div>

              {!isTraining && trainingProgress === 0 && (
                <div className="text-center py-8">
                  <Cpu className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                  <button
                    onClick={handleStartTraining}
                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-3 rounded-lg font-bold transition-all"
                  >
                    Iniciar Entrenamiento
                  </button>
                </div>
              )}

              {(isTraining || trainingProgress > 0) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {isTraining && <Cpu className="w-5 h-5 text-indigo-600 animate-spin" />}
                        <span className="font-bold text-indigo-700">
                          {isTraining ? "Entrenando..." : "Entrenamiento Completado"}
                        </span>
                      </div>
                      <span className="font-bold text-indigo-700">{Math.round(trainingProgress)}%</span>
                    </div>
                    <div className="w-full bg-indigo-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-3 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${trainingProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {currentEpoch.length > 0 && (
                    <div className="border-2 border-gray-200 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Progreso del Entrenamiento</h4>
                      <div className="w-full h-72">
                        <ResponsiveContainer>
                          <LineChart data={currentEpoch}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="epoch" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#DC2626" isAnimationActive={isTraining} />
                            <Line yAxisId="left" type="monotone" dataKey="val_loss" stroke="#F97316" isAnimationActive={isTraining} />
                            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#16A34A" isAnimationActive={isTraining} />
                            <Line yAxisId="right" type="monotone" dataKey="val_accuracy" stroke="#06B6D4" isAnimationActive={isTraining} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-xs text-gray-600">Pérdida (Loss)</p>
                          <p className="font-bold text-red-600">{currentEpoch[currentEpoch.length - 1]?.loss.toFixed(3)}</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <p className="text-xs text-gray-600">Val Loss</p>
                          <p className="font-bold text-orange-600">{currentEpoch[currentEpoch.length - 1]?.val_loss.toFixed(3)}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600">Accuracy</p>
                          <p className="font-bold text-green-600">{(currentEpoch[currentEpoch.length - 1]?.accuracy * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-3 bg-cyan-50 rounded-lg">
                          <p className="text-xs text-gray-600">Val Accuracy</p>
                          <p className="font-bold text-cyan-600">{(currentEpoch[currentEpoch.length - 1]?.val_accuracy * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-12 pt-8 border-t-2 border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                step === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              ← Atrás
            </button>

            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !fileData) ||
                (step === 2 && !cleaningResults) ||
                (step === 3 && trainingProgress < 100)
              }
              className={`px-8 py-3 rounded-lg font-bold transition-all ${
                (step === 1 && !fileData) ||
                (step === 2 && !cleaningResults) ||
                (step === 3 && trainingProgress < 100)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white"
              }`}
            >
              {step === 3 && trainingProgress === 100 ? "Ver Resultados →" : "Continuar →"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
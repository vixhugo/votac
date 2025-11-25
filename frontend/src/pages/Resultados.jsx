import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Resultados() {
  // Función para importar imágenes dinámicamente
  const getImageUrl = (imageName) => {
    try {
      return new URL(`../assets/images/${imageName}`, import.meta.url).href;
    } catch {
      return null;
    }
  };

  const getLogoUrl = (logoName) => {
    try {
      return new URL(`../assets/logos/${logoName}`, import.meta.url).href;
    } catch {
      return null;
    }
  };

  const [resultados, setResultados] = useState({
    'Fuerza Popular': { 
      votos: 2450000, 
      color: '#FF6B35', 
      candidato: 'Keiko Fujimori', 
      imagenName: 'keiko_fujimori.jpg',
      logoName: 'fuerza_popular.png'
    },
    'Perú Libre': { 
      votos: 2380000, 
      color: '#DC143C', 
      candidato: 'Rafael López Aliaga', 
      imagenName: 'rafael_lopez_aliaga.jpg',
      logoName: 'renovacion_popular.png'
    },
    'Renovación Popular': { 
      votos: 2120000, 
      color: '#4169E1', 
      candidato: 'César Acuña', 
      imagenName: 'cesar_acuna.jpg',
      logoName: 'app.png'
    },
    'Alianza para el Progreso': { 
      votos: 1980000, 
      color: '#00CED1', 
      candidato: 'Phillip Butters', 
      imagenName: 'phillip_butters.jpg',
      logoName: 'avanza_pais.png'
    },
    'Avanza País': { 
      votos: 1750000, 
      color: '#32CD32', 
      candidato: 'Carlos Álvarez', 
      imagenName: 'carlos_alvarez.jpg',
      logoName: 'primero_la_gente.png'
    }
  });

  const [historico, setHistorico] = useState([
    { tiempo: '20:00', 'Fuerza Popular': 2400000, 'Perú Libre': 2350000, 'Renovación Popular': 2100000, 'Alianza para el Progreso': 1950000, 'Avanza País': 1720000 }
  ]);

  const [hoveredGeo, setHoveredGeo] = useState(null);

  const departamentos = [
    { nombre: 'Tumbes', ganador: 'Alianza para el Progreso', coords: [-3.5, -80.4] },
    { nombre: 'Piura', ganador: 'Alianza para el Progreso', coords: [-5.2, -79.5] },
    { nombre: 'Lambayeque', ganador: 'Alianza para el Progreso', coords: [-6.4, -79.2] },
    { nombre: 'La Libertad', ganador: 'Alianza para el Progreso', coords: [-7.5, -78.6] },
    { nombre: 'Cajamarca', ganador: 'Perú Libre', coords: [-7.1, -78.5] },
    { nombre: 'Amazonas', ganador: 'Perú Libre', coords: [-6.0, -77.0] },
    { nombre: 'Loreto', ganador: 'Avanza País', coords: [-3.7, -73.2] },
    { nombre: 'San Martín', ganador: 'Avanza País', coords: [-6.5, -76.4] },
    { nombre: 'Áncash', ganador: 'Fuerza Popular', coords: [-9.0, -77.8] },
    { nombre: 'Huánuco', ganador: 'Renovación Popular', coords: [-9.9, -76.2] },
    { nombre: 'Ucayali', ganador: 'Avanza País', coords: [-10.2, -72.7] },
    { nombre: 'Pasco', ganador: 'Fuerza Popular', coords: [-10.6, -75.5] },
    { nombre: 'Junín', ganador: 'Fuerza Popular', coords: [-11.8, -75.2] },
    { nombre: 'Lima', ganador: 'Fuerza Popular', coords: [-12.0, -76.9] },
    { nombre: 'Huancavelica', ganador: 'Perú Libre', coords: [-12.8, -74.9] },
    { nombre: 'Ica', ganador: 'Fuerza Popular', coords: [-13.5, -76.2] },
    { nombre: 'Ayacucho', ganador: 'Perú Libre', coords: [-13.1, -74.2] },
    { nombre: 'Apurímac', ganador: 'Perú Libre', coords: [-13.6, -72.9] },
    { nombre: 'Cusco', ganador: 'Perú Libre', coords: [-13.5, -71.9] },
    { nombre: 'Madre de Dios', ganador: 'Avanza País', coords: [-12.6, -69.2] },
    { nombre: 'Puno', ganador: 'Perú Libre', coords: [-15.5, -70.1] },
    { nombre: 'Arequipa', ganador: 'Renovación Popular', coords: [-16.4, -71.5] },
    { nombre: 'Moquegua', ganador: 'Renovación Popular', coords: [-17.2, -70.9] },
    { nombre: 'Tacna', ganador: 'Renovación Popular', coords: [-18.0, -70.2] }
  ];

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Inicializar mapa
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([-12, -75], 6);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(mapInstance.current);

      // Establecer límites para que solo muestre el Perú
      const peruBounds = L.latLngBounds(
        [-18.3, -81.3],  // Esquina suroeste (Tacna/Tumbes)
        [-0.4, -68.6]    // Esquina noreste (Loreto)
      );
      
      mapInstance.current.setMaxBounds(peruBounds);
      mapInstance.current.on('drag', function() {
        mapInstance.current.panInsideBounds(peruBounds, { animate: false });
      });

      // Agregar marcadores para cada departamento
      departamentos.forEach(dep => {
        const ganador = resultados[dep.ganador];
        const circle = L.circleMarker(dep.coords, {
          radius: 12,
          fillColor: ganador.color,
          color: '#fff',
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.8
        }).addTo(mapInstance.current);

        circle.bindPopup(`<div class="text-center"><strong>${dep.nombre}</strong><br/>${dep.ganador}</div>`);
        
        circle.on('mouseover', function() {
          this.setStyle({ radius: 15, weight: 3, opacity: 1, fillOpacity: 1 });
          setHoveredGeo(dep.nombre);
        });
        
        circle.on('mouseout', function() {
          this.setStyle({ radius: 12, weight: 2, opacity: 0.8, fillOpacity: 0.8 });
          setHoveredGeo(null);
        });
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setResultados(prev => {
        const nuevo = { ...prev };
        Object.keys(nuevo).forEach(partido => {
          const cambio = Math.floor(Math.random() * 50000) - 20000;
          nuevo[partido] = {
            ...nuevo[partido],
            votos: Math.max(0, nuevo[partido].votos + cambio)
          };
        });
        return nuevo;
      });

      setHistorico(prev => {
        const ahora = new Date();
        const tiempo = `${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2, '0')}`;
        const nuevosDatos = { tiempo };
        Object.keys(resultados).forEach(partido => {
          nuevosDatos[partido] = resultados[partido].votos;
        });
        return [...prev.slice(-9), nuevosDatos];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [resultados]);

  const partidosOrdenados = Object.entries(resultados)
    .sort((a, b) => b[1].votos - a[1].votos);

  const lider = partidosOrdenados[0];
  const totalVotos = Object.values(resultados).reduce((sum, p) => sum + p.votos, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-900 mb-2">Resultados Electorales 2026</h1>
          <p className="text-gray-600 text-lg">Actualización en tiempo real • {totalVotos.toLocaleString()} votos contabilizados</p>
        </div>

        {/* Card del Líder */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-8 mb-8 border-4 border-yellow-300">
          <div className="flex items-center justify-between flex-col md:flex-row gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                  <img 
                    src={getImageUrl(lider[1].imagenName)} 
                    alt={lider[1].candidato}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400" style={{display: 'none'}}>
                    {lider[1].candidato.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <span className="text-3xl">👑</span>
                </div>
              </div>
              <div>
                <div className="text-white text-sm font-semibold mb-1 uppercase tracking-wider">Liderando las Elecciones</div>
                <h2 className="text-4xl font-bold text-white mb-2">{lider[1].candidato}</h2>
                <div className="text-white text-lg font-semibold">{lider[0]}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold text-white mb-2">{((lider[1].votos / totalVotos) * 100).toFixed(1)}%</div>
              <div className="text-white text-xl font-semibold">{lider[1].votos.toLocaleString()} votos</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mapa del Perú con Leaflet */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative z-0">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Mapa Electoral por Departamentos</h3>
            <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ height: '350px', zIndex: 0 }}>
              <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'relative', zIndex: 0 }}></div>
              
              {hoveredGeo && (
                <div className="absolute top-4 left-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg z-10">
                  <div>{hoveredGeo}</div>
                  <div className="text-amber-300">{departamentos.find(d => d.nombre === hoveredGeo)?.ganador}</div>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {Object.entries(resultados).map(([partido, data]) => (
                <div key={partido} className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: data.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{partido}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabla de Resultados */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Resultados por Partido</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {partidosOrdenados.map(([partido, data], index) => (
                <div key={partido} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img 
                          src={getLogoUrl(data.logoName)} 
                          alt={partido}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center text-white font-bold" 
                             style={{ backgroundColor: data.color, display: 'none' }}>
                          {partido.substring(0, 2)}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{partido}</div>
                        <div className="text-sm text-gray-600">{data.candidato}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{((data.votos / totalVotos) * 100).toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">{data.votos.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${(data.votos / totalVotos) * 100}%`,
                        backgroundColor: data.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráfico de Líneas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Tendencia en Tiempo Real</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tiempo" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              {Object.entries(resultados).map(([partido, data]) => (
                <Line
                  key={partido}
                  type="monotone"
                  dataKey={partido}
                  stroke={data.color}
                  strokeWidth={3}
                  dot={{ fill: data.color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
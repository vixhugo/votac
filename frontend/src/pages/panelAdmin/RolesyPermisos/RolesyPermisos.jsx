import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Plus, Edit, Trash2, Lock, Search, Filter } from "lucide-react";
import RolCrear from "./RolCrear";
import RolEditar from "./RolEditar";
import RolEliminar from "./RolEliminar";

// Datos iniciales simulados
const initialRoles = [
  {
    id: 1,
    nombre: "Super Admin",
    descripcion: "Acceso total al sistema y configuración global.",
    permisos: ["Usuarios", "Centros", "Resultados", "Configuración", "Auditoría", "Análisis de Datos"],
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Admin Regional",
    descripcion: "Gestiona centros y resultados dentro de su región.",
    permisos: ["Centros", "Resultados", "Reportes"],
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Presidente de Mesa",
    descripcion: "Registra y valida los resultados de mesa electoral.",
    permisos: ["Resultados"],
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Soporte Técnico",
    descripcion: "Da soporte al sistema y usuarios regionales.",
    permisos: ["Usuarios", "Reportes"],
    estado: "Inactivo",
  },
];

export default function RolesyPermisos() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");

  const handleCreate = (data) => {
    setRoles([...roles, { ...data, id: Date.now() }]);
    setModalCreate(false);
  };

  const handleEdit = (data) => {
    setRoles(roles.map((r) => (r.id === data.id ? data : r)));
    setModalEdit(false);
  };

  const handleDelete = () => {
    setRoles(roles.filter((r) => r.id !== selectedRole.id));
    setModalDelete(false);
  };

  // Filtros y búsqueda
  const filteredRoles = roles.filter((r) => {
    const matchesSearch =
      r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.permisos.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesEstado = filterEstado === "Todos" || r.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      {/* 🧭 Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Roles y Permisos</h1>
            <p className="text-sm text-gray-600">
              Define los niveles de acceso y responsabilidades dentro del sistema.
            </p>
          </div>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalCreate(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" /> Crear Nuevo Rol
        </motion.button>
      </div>

      {/* 🔍 Búsqueda y Filtros */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, descripción o permisos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          >
            <option value="Todos">Todos los Estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <div className="flex items-center justify-center text-sm font-semibold text-purple-700 bg-purple-50 rounded-lg px-3 border border-purple-200">
            <Filter className="w-4 h-4 mr-2" />
            {filteredRoles.length} roles encontrados
          </div>
        </div>
      </motion.div>

      {/* 🧾 Tabla */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-purple-50 via-purple-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Permisos</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredRoles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No se encontraron roles</p>
                    <p className="text-sm text-gray-500 mt-1">Intenta ajustar los filtros de búsqueda</p>
                  </td>
                </tr>
              ) : (
                filteredRoles.map((rol, idx) => (
                  <motion.tr 
                    key={rol.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className="hover:bg-purple-50 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
                          {rol.estado === "Activo" ? (
                            <ShieldCheck className="w-5 h-5 text-purple-600" />
                          ) : (
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{rol.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{rol.descripcion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {rol.permisos.map((p, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 rounded-full border border-purple-200"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border ${
                          rol.estado === "Activo"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
                            : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200"
                        }`}
                      >
                        {rol.estado === "Activo" ? (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Lock className="w-3.5 h-3.5" />
                        )}
                        {rol.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedRole(rol);
                            setModalEdit(true);
                          }}
                          className="p-2 text-gray-400 hover:text-white hover:bg-green-500 rounded-lg transition-all duration-200"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedRole(rol);
                            setModalDelete(true);
                          }}
                          className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 🧩 Modales */}
      <RolCrear
        isOpen={modalCreate}
        onClose={() => setModalCreate(false)}
        onSave={handleCreate}
      />
      <RolEditar
        isOpen={modalEdit}
        onClose={() => setModalEdit(false)}
        onSave={handleEdit}
        role={selectedRole}
      />
      <RolEliminar
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={handleDelete}
        role={selectedRole}
      />
    </motion.div>
  );
}
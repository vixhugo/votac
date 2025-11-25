import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, UserCheck, UserX, Users, Shield, Award, User, Headphones } from "lucide-react";
import UsuarioCrear from "./UsuarioCrear";
import UsuarioEditar from "./UsuarioEditar";
import UsuarioEliminar from "./UsuarioEliminar";
import { ROLES_USUARIO, DEPARTAMENTOS_PERU } from "../../../constants/electoralConstants";

const roles = ROLES_USUARIO;
const departamentos = DEPARTAMENTOS_PERU;

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { 
      id: 1, 
      nombre: "Ana García Castillo", 
      dni: "87654321", 
      email: "ana.garcia@onpe.gob.pe", 
      rol: "Super Admin", 
      estado: "Activo", 
      departamento: "Lima",
      telefono: "+51 987 654 321"
    },
    { 
      id: 2, 
      nombre: "Carlos Ruiz Mendoza", 
      dni: "12345678", 
      email: "carlos.ruiz@onpe.gob.pe", 
      rol: "Admin Regional", 
      estado: "Activo", 
      departamento: "Cusco",
      telefono: "+51 987 654 322"
    },
    { 
      id: 3, 
      nombre: "María Fernández López", 
      dni: "45678901", 
      email: "maria.fernandez@onpe.gob.pe", 
      rol: "Presidente de Mesa", 
      estado: "Activo", 
      departamento: "Arequipa",
      telefono: "+51 987 654 323"
    },
    { 
      id: 4, 
      nombre: "Juan Peña Torres", 
      dni: "23456789", 
      email: "juan.pena@onpe.gob.pe", 
      rol: "Soporte Técnico", 
      estado: "Inactivo", 
      departamento: "Junín",
      telefono: "+51 987 654 324"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const filtered = usuarios.filter((u) =>
    [u.nombre, u.email, u.dni, u.rol].some((v) =>
      v.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCreate = (data) => {
    setUsuarios([...usuarios, { ...data, id: Date.now() }]);
    setModalCreate(false);
  };

  const handleEdit = (data) => {
    setUsuarios(usuarios.map((u) => (u.id === data.id ? data : u)));
    setModalEdit(false);
  };

  const handleDelete = () => {
    setUsuarios(usuarios.filter((u) => u.id !== selectedUser.id));
    setModalDelete(false);
  };

  const getRoleIcon = (rol) => {
    switch (rol) {
      case "Super Admin":
        return <Shield className="w-4 h-4" />;
      case "Admin Regional":
        return <Award className="w-4 h-4" />;
      case "Presidente de Mesa":
        return <Users className="w-4 h-4" />;
      case "Soporte Técnico":
        return <Headphones className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (rol) => {
    switch (rol) {
      case "Super Admin":
        return "from-purple-100 to-purple-200 text-purple-800 border-purple-200";
      case "Admin Regional":
        return "from-blue-100 to-blue-200 text-blue-800 border-blue-200";
      case "Presidente de Mesa":
        return "from-amber-100 to-amber-200 text-amber-800 border-amber-200";
      case "Soporte Técnico":
        return "from-cyan-100 to-cyan-200 text-cyan-800 border-cyan-200";
      default:
        return "from-gray-100 to-gray-200 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      {/* 🧭 Encabezado con icono y descripción */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p className="text-sm text-gray-600">
              Administra la información de los usuarios, sus roles y estados dentro del sistema.
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalCreate(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" /> Nuevo Usuario
        </button>
      </div>

      {/* 🔍 Buscador */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, DNI, email o rol..."
            className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* 🧾 Tabla de usuarios con diseño mejorado */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Departamento</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-blue-50 transition-all duration-200 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{u.nombre}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-2 inline-flex items-center gap-1.5 text-xs leading-5 font-bold rounded-lg bg-gradient-to-r ${getRoleColor(u.rol)} border`}>
                      {getRoleIcon(u.rol)}
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">{u.departamento}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border ${
                        u.estado === "Activo"
                          ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
                          : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200"
                      }`}
                    >
                      {u.estado === "Activo" ? (
                        <UserCheck className="w-3.5 h-3.5" />
                      ) : (
                        <UserX className="w-3.5 h-3.5" />
                      )}
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setModalEdit(true);
                        }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-green-500 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setModalDelete(true);
                        }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧩 Modales */}
      <UsuarioCrear
        isOpen={modalCreate}
        onClose={() => setModalCreate(false)}
        onSave={handleCreate}
        roles={roles}
        departamentos={departamentos}
      />
      <UsuarioEditar
        isOpen={modalEdit}
        onClose={() => setModalEdit(false)}
        onSave={handleEdit}
        user={selectedUser}
        roles={roles}
        departamentos={departamentos}
      />
      <UsuarioEliminar
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        onConfirm={handleDelete}
        user={selectedUser}
      />
    </motion.div>
  );
}
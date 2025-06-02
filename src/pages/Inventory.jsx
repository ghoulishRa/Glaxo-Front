// src/pages/Inventory.jsx
import React, { useEffect, useState } from 'react';
import CodeIcon from '../assets/icons/codeIcon';
import BuildingsIcon from '../assets/icons/buildingIcon';
import './styles/inventory.css'; // <-- Importamos los estilos

const columns = [
  { id: 'sku', label: 'SKU' },
  { id: 'producto', label: 'Producto' },
  { id: 'institucion', label: 'Institución' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'stock_inicial', label: 'Stock inicial' },
  { id: 'entrada', label: 'Entrada' },
  { id: 'salida', label: 'Salida' },
  { id: 'stock_total', label: 'Stock total' },
];

const mockData = [
  { sku: 'A001', producto: 'Sensor', institucion: 'TecNM', descripcion: 'Sensor digital', stock_inicial: 100, entrada: 20, salida: 5, stock_total: 5 },
  { sku: 'A002', producto: 'Motor DC', institucion: 'UNAM', descripcion: 'Motor 12V', stock_inicial: 50, entrada: 10, salida: 8, stock_total: 52 },
  { sku: 'A003', producto: 'ESP32', institucion: 'TecNM', descripcion: 'WiFi+BT', stock_inicial: 80, entrada: 25, salida: 15, stock_total: 90 },
  { sku: 'A004', producto: 'RFID', institucion: 'IPN', descripcion: 'Lector RC522', stock_inicial: 30, entrada: 15, salida: 3, stock_total: 42 },
  { sku: 'A005', producto: 'Raspberry', institucion: 'UNAM', descripcion: 'Pi 4', stock_inicial: 40, entrada: 10, salida: 7, stock_total: 43 },
  { sku: 'A006', producto: 'Batería', institucion: 'IPN', descripcion: 'LiPo 3.7V', stock_inicial: 60, entrada: 30, salida: 20, stock_total: 70 },
  { sku: 'A007', producto: 'Arduino', institucion: 'TecNM', descripcion: 'UNO R3', stock_inicial: 90, entrada: 10, salida: 15, stock_total: 85 },
  { sku: 'A008', producto: 'Cámara', institucion: 'UNAM', descripcion: 'para Pi', stock_inicial: 20, entrada: 5, salida: 2, stock_total: 19 },
  { sku: 'A009', producto: 'Bluetooth', institucion: 'IPN', descripcion: 'HC-05', stock_inicial: 70, entrada: 20, salida: 10, stock_total: 80 },
  { sku: 'A010', producto: 'Ultrasónico', institucion: 'TecNM', descripcion: 'HC-SR04', stock_inicial: 100, entrada: 50, salida: 90, stock_total: 60 },
];

export default function Inventory() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [skuFilter, setSkuFilter] = useState('');
  const [institucionFilter, setInstitucionFilter] = useState('');

  useEffect(() => {
    setRows(mockData);
    setFilteredRows(mockData);
  }, []);

  useEffect(() => {
    const filtered = rows.filter((row) => {
      const skuMatch = row.sku.toLowerCase().includes(skuFilter.toLowerCase());
      const institucionMatch = row.institucion.toLowerCase().includes(institucionFilter.toLowerCase());
      return skuMatch && institucionMatch;
    });
    setFilteredRows(filtered);
    setPage(0);
  }, [skuFilter, institucionFilter, rows]);

  const handlePrevPage = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredRows.length / rowsPerPage) - 1;
    setPage((p) => Math.min(p + 1, maxPage));
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="inventory-container">
      {/* Encabezado con título y filtros */}
      <div className="inventory-header">
        <h2 className="inventory-title">Inventario</h2>
        <div className="inventory-filters">

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Filtrar por SKU"
              value={skuFilter}
              onChange={(e) => setSkuFilter(e.target.value)}
              className="inventory-input"
            />
            <CodeIcon className="input-icon" />
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Filtrar por Institucion"
              value={institucionFilter}
              onChange={(e) => setInstitucionFilter(e.target.value)}
              className="inventory-input"
            />
            <BuildingsIcon className="input-icon" />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id} className="inventory-th">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <tr key={row.sku} className="inventory-tr">
                  {columns.map((column) => {
                    const value = row[column.id] ?? '-';
                    if (column.id === 'stock_total' && row.stock_total <= 20) {
                      return (
                        <td key={column.id} className="inventory-td-low">
                          {value}
                        </td>
                      );
                    }
                    return (
                      <td key={column.id} className="inventory-td">
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="inventory-no-data">
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="inventory-pagination">
        <div className="pagination-info">
          <label>Filas por página:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="pagination-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="pagination-controls">
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className="pagination-button"
          >
            Anterior
          </button>
          <span className="pagination-text">
            Página {page + 1} de {Math.max(1, Math.ceil(filteredRows.length / rowsPerPage))}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}
            className="pagination-button"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

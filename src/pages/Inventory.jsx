// src/pages/Inventario.jsx
import React, { useEffect, useState } from 'react';
import CodeIcon from '../assets/icons/codeIcon';
import BuildingsIcon from '../assets/icons/buildingIcon';
import './styles/inventory.css';  // Asegúrate de que la ruta esté correcta
import { useFetchData } from '../hooks/getData'; // Ajusta esta ruta si tu hook está en otra carpeta

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

export default function Inventario() {
 
  const { paquetes, loading, error } = useFetchData('all', '/paquetes');

  // 2) Estados para filtros y paginación
  const [filteredRows, setFilteredRows] = useState([]);   // aquí guardaremos los “paquetes” filtrados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [skuFilter, setSkuFilter] = useState('');
  const [institucionFilter, setInstitucionFilter] = useState('');

  // 3) Cada vez que cambien paquetes, skuFilter o institucionFilter, recalculamos filteredRows
  useEffect(() => {
    // Si está cargando o hay error, no filtramos aún
    if (loading || error) {
      setFilteredRows([]);
      return;
    }

    const filtro = paquetes.filter((p) => {
      const skuMatch = p.id.toString().toLowerCase().includes(skuFilter.toLowerCase());
      const institucionMatch = p.institucion
        .toLowerCase()
        .includes(institucionFilter.toLowerCase());
      return skuMatch && institucionMatch;
    });

    setFilteredRows(filtro);
    setPage(0);
  }, [paquetes, skuFilter, institucionFilter, loading, error]);

  // 4) Handlers de paginación
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

  // 5) Creamos el array de filas que vamos a paginar
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 6) Renderizado condicional
  if (loading) {
    return (
      <div className="inventory-container">
        <p>Cargando datos del inventario…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inventory-container">
        <p>Error al cargar inventario: {error.message}</p>
      </div>
    );
  }

  // 7) JSX principal
  return (
    <div className="inventory-container">
      {/* Encabezado con título y filtros */}
      <div className="inventory-header">
        <h2 className="inventory-title">Inventario</h2>
        <div className="inventory-filters">
          {/* Filtro por SKU */}
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

          {/* Filtro por Institución */}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Filtrar por Institución"
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
                <tr key={row.id} className="inventory-tr">
                  {columns.map((column) => {
                    // Tomamos cada valor: el hook tiene que mapear estas propiedades
                    // (sku == row.id, producto == row.nombre, etc.)
                    let value = '-';
                    switch (column.id) {
                      case 'sku':
                        value = row.sku;
                        break;
                      case 'producto':
                        value = row.nombre;
                        break;
                      case 'institucion':
                        value = row.institucion;
                        break;
                      case 'descripcion':
                        value = row.descripcion;
                        break;
                      case 'stock_inicial':
                        value = row.stock_inicial;
                        break;
                      case 'entrada':
                        value = row.entrada; // tu backend debe devolverlo
                        break;
                      case 'salida':
                        value = row.salida;  // tu backend debe devolverlo
                        break;
                      case 'stock_total':
                        value = row.stock_total; // tu backend debe devolverlo
                        break;
                    }

                    // Si la columna es “stock_total” y es ≤ 20, aplicamos clase “low”
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

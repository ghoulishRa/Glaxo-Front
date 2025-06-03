// src/pages/Inventario.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeIcon from '../assets/icons/codeIcon';
import BuildingsIcon from '../assets/icons/buildingIcon';
import './styles/inventory.css';

const columns = [
  { id: 'sku', label: 'SKU' },
  { id: 'producto', label: 'Producto' },
  { id: 'institucion', label: 'Institución' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'stock_total', label: 'Stock' },
];

export default function Inventario() {
  // 1) Estados para los datos, loading y error
  const [rows, setRows] = useState([]);               // Datos crudos transformados
  const [filteredRows, setFilteredRows] = useState([]); // Filas tras aplicar filtros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2) Estados para filtros
  const [skuFilter, setSkuFilter] = useState('');
  const [institucionFilter, setInstitucionFilter] = useState('');

  // 3) Estados para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 4) Fetch de datos (solo al montar el componente)
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get('http://localhost:3000/stock/get')
      .then((response) => {
        const transformed = response.data.map((item) => ({
          sku: item.sku,
          producto: item.producto,
          descripcion: item.descripcion,
          institucion: `ID ${item.institucion_id}`, 
          stock_total: item.stock,
        }));

        setRows(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener datos:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // 5) Cada vez que cambie `rows`, `skuFilter` o `institucionFilter`, recalculamos `filteredRows`
  useEffect(() => {
    if (loading || error) {
      setFilteredRows([]);
      return;
    }

    const filtro = rows.filter((p) => {
      const skuMatch = p.sku.toString().toLowerCase().includes(skuFilter.toLowerCase());
      const institucionMatch = p.institucion.toLowerCase().includes(institucionFilter.toLowerCase());
      return skuMatch && institucionMatch;
    });

    setFilteredRows(filtro);
    setPage(0);
  }, [rows, skuFilter, institucionFilter, loading, error]);

  // 6) Handlers de paginación
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

  // 7) Filas que se mostrarán en la página actual
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 8) Renderizado condicional: loading / error
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

  // 9) JSX principal
  return (
    <div className="inventory">
      {/* Filtros */}
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

      <div className="inventory-container">
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
                      let value = '-';

                      switch (column.id) {
                        case 'sku':
                          value = row.sku;
                          break;
                        case 'producto':
                          value = row.producto;
                          break;
                        case 'institucion':
                          value = row.institucion;
                          break;
                        case 'descripcion':
                          value = row.descripcion;
                          break;
                        case 'stock_total':
                          value = row.stock_total;
                          break;
                        default:
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
    </div>
  );
}

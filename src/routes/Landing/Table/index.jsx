import React, { useContext } from 'react';
import { useTable, usePagination } from 'react-table';
import AppContext from '../../../App/AppContext';
import tableFormat from './tableFormat';

export default function Table() {
  const { users } = useContext(AppContext);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns: tableFormat,
      data: users,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps({
          className: 'table table-light table-striped'
        })}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav className="navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              type="button"
              onClick={() => gotoPage(0)}
              className="page-link"
              disabled={!canPreviousPage}
            >
              {'<<'}
            </button>
          </li>
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'<'}
            </button>
          </li>
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {'>'}
            </button>
          </li>
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>
          </li>
        </ul>
        <div className="d-flex justify-content-center">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </>
  );
}

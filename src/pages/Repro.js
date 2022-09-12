import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Axios from 'axios'

function Repro() {
  const [repros, setRepros] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    let mount = true
    if (mount) {
      Axios.get(
        'http://192.168.1.100:5006/kqeA9XnmTgU1CUMnONapgDfHxpI51VBBy3USKsXrLO42UbwfKJMXRvxz6WeyQQ21tcBtywicaKXucH0jyVlNj236orKjp9Guu6yNfgGgUftG4i2dv4piPDKSMaiU1lLY',
      ).then((res) => {
        setRepros(res.data)
      })
    }
    return () => {
      mount = false
    }
  }, [refresh])

  const column = [
    {
      name: 'Repro Name',
      selector: (row) => row.Product_name,
    },
    {
      name: 'Warehouse Stocks',
      selector: (row) => row.repros,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <button className="btn btn-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
        )
      },
    },
  ]
  const customStyles = {
    rows: {
      style: {
        height: '16px',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
      },
    },
    cells: {
      style: { fontSize: '15px' },
    },
  }
  return (
    <div>
      <DataTable
        customStyles={customStyles}
        keyField="ID"
        data={repros}
        columns={column}
      ></DataTable>
    </div>
  )
}

export default Repro

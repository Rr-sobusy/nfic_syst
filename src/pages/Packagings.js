import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component'
import Modal from 'react-bootstrap/Modal'
import Axios from 'axios'
import Form from 'react-bootstrap/Form'

function Packagings() {
  const [packagings, setPackagings] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [datas, setDatas] = useState({ packagingName: '', currentStocks: 0 })
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let mount = true
    if (mount) {
      Axios.get('http://192.168.1.100:5006/getpackagings').then((res) => {
        setPackagings(res.data)
      })
    }
    return () => {
      mount = false
    }
  }, [refresh])
  const column = [
    {
      name: 'Packaging Name',
      selector: (row) => row.packaging_name,
    },
    {
      name: 'Type',
      selector: (row) => row.type,
    },
    {
      name: 'Warehouse Stocks',
      selector: (row) => row.current_stocks,
    },
    {
      name: 'Annotations',
      selector: (row) => row.annotation,
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

  function post() {
    Axios.post('http://192.168.1.100:5006/insertpackagings', {
      packagingName: datas.packagingName,
      currentStocks: datas.currentStocks,
    }).then((res) => {
      console.log(res)
      setRefresh(!refresh)
    })
    handleClose()
  }
  return (
    <div>
      <div align="right">
        <Button onClick={handleShow} className="mb-3">
          Add New Packaging
        </Button>
      </div>
      <DataTable
        customStyles={customStyles}
        data={packagings}
        columns={column}
        keyField="ID"
      ></DataTable>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Packaging</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <Form.Label>Packaging Name:</Form.Label>
          <Form.Control
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                packagingName: event.target.value,
              }))
            }}
            type="text"
            className="w-75"
          />
          <Form.Label className="mt-1">Initial Quantity:</Form.Label>
          <Form.Control
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                currentStocks: event.target.value,
              }))
            }}
            type="number"
            className="w-75"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={post} variant="primary">
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Packagings

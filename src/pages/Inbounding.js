import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Axios from 'axios'
import { Context } from 'src/App'

function Inbounding() {
  const [suppliers, setSuppliers] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [datas, setDatas] = useState({ suppName: '', itemName: '', quantity: '', po_number: '' })
  const [inbounds, setInbounds] = useState([])
  const [refresh, setRefresh] = useState(false)

  const sample = React.useContext(Context)
  const API = sample.laravelAPI

  useEffect(() => {
    let mount = true
    if (mount) {
      Axios.get(
        'http://192.168.1.100:5006/zj31D2dcD0apzqmc6obb1XtF1pJDD1X2uy4pTpoLYQ9HAHFr0cW6mXbIpOD4PJIk9qcMj50yv65qSr9hga6ZuBoEOkeE6oUvmtGWdNbKqkoNBasnDLu2JuuayLObR4mN',
      ).then((res) => {
        setSuppliers(res.data)
      })
    }
    return () => {
      mount = false
    }
  }, [])
  useEffect(() => {
    let mount = true
    if (mount) {
      Axios.get('http://192.168.1.100:5006/getinbounding').then((res) => {
        setInbounds(res.data)
      })
    }
    return () => {
      mount = false
    }
  }, [refresh])

  const column = [
    {
      name: 'Supplier',
      selector: (row) => row.supplier,
    },
    {
      name: 'Item Name',
      selector: (row) => row.product_name,
    },
    {
      name: 'P.O Quantity',
      selector: (row) => row.po_quantity,
    },
    {
      name: 'P.O No.',
      selector: (row) => row.po_number,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
            <Button
              onClick={() => {
                Axios.post('http://192.168.1.100:5006/deleteinbounding', {
                  pname: row.product_name,
                  pnumber: row.po_number,
                }).then((res) => {
                  console.log(res)
                  setRefresh(!refresh)
                })
              }}
              variant="danger"
            >
              Remove
            </Button>
          </div>
        )
      },
    },
  ]

  function post() {
    Axios.post('http://192.168.1.100:5006/postinbounding', {
      supplier: datas.suppName,
      pname: datas.itemName,
      quantity: datas.quantity,
      number: datas.po_number,
    }).then((res) => {
      console.log(res)
      setRefresh(!refresh)
    })
    handleClose()
  }
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
      <div align="right">
        <Button className="mb-3" onClick={handleShow}>
          Add
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Inbounding Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                suppName: event.target.value,
              }))
            }}
            className="w-75"
            aria-label="Default select example"
          >
            <option>Select Supplier</option>
            {suppliers.map((val, key) => {
              return (
                <option key={key} value={val.supplier_name}>
                  {val.supplier_name}
                </option>
              )
            })}
          </Form.Select>
          <Form.Control
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                itemName: event.target.value,
              }))
            }}
            className="w-75 mt-2"
            type="text"
            placeholder="Material Name"
          />
          <Form.Control
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                quantity: event.target.value,
              }))
            }}
            className="w-75 mt-2"
            type="number"
            placeholder="P.O Quantity"
          />
          <Form.Control
            onChange={(event) =>
              setDatas((prevState) => ({
                ...prevState,
                po_number: event.target.value,
              }))
            }
            className="w-75 mt-2"
            type="text"
            placeholder="P.O Number"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              post()
            }}
            variant="primary"
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      <DataTable
        customStyles={customStyles}
        columns={column}
        keyField="ID"
        data={inbounds}
      ></DataTable>
    </div>
  )
}

export default Inbounding

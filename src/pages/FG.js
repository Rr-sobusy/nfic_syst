import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Axios from 'axios'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import swal from 'sweetalert'
import DataTable from 'react-data-table-component'

function FG() {
  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false)
  const [pname, setPname] = useState('')
  const [psize, setPsize] = useState(0)
  const [iquantity, setIquantity] = useState(0)
  const [id, setId] = useState('')
  const [clicked, setClicked] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    Axios.get(
      'http://192.168.1.100:5006/kqeA9XnmTgU1CUMnONapgDfHxpI51VBBy3USKsXrLO42UbwfKJMXRvxz6WeyQQ21tcBtywicaKXucH0jyVlNj236orKjp9Guu6yNfgGgUftG4i2dv4piPDKSMaiU1lLY',
    ).then((res) => {
      setProducts(res.data)
    })
  }, [clicked])

  const handleInput = () => {
    Axios.post(
      'http://192.168.1.100:5006/M2ioH1bN7l5rSvpzesC6a6QeYUEgG0VYYHsaEYplll2kUFRthoFHSEZCDLUMfBHoK5olXyXRmIi64bmWAQcg1LEsU6TnDFEjXRjgKFiiVxMRC8rntOfTABui6Z68AOcU',
      {
        pname: pname,
        psize: psize,
        iquantity: iquantity,
      },
    ).then((rex) => {
      console.log(rex)
      setClicked(!clicked)
    })
    handleClose()
    swal('', 'Product Added!', 'success')
  }

  const column = [
    {
      name: 'Product Name',
      selector: (row) => row.Product_name,
    },
    {
      name: 'Packaging Size',
      selector: (row) => row.Packaging_in_kls,
    },
    {
      name: 'Warehouse Stocks',
      selector: (row) => row.Quantity,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
            <Button variant="success">
              {' '}
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
            </Button>
            <Button
              onClick={() => {
                swal({
                  title: `Are you sure you want to delete ${row.Product_name} ?`,
                  text: '',
                  icon: 'warning',
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal('Enter authorization key to continue', {
                      content: 'input',
                    }).then((value) => {
                      if (value == 'rex') {
                        Axios.post('http://192.168.1.100:5006/deletefg', {
                          productName: row.Product_name,
                        }).then((res) => {
                          console.log(res)
                          setClicked(!clicked)
                        })
                      }
                    })
                  } else {
                  }
                })
              }}
              variant="danger"
              className="ms-1"
            >
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </Button>
          </div>
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
  const defaultSorted = [
    {
      dataField: 'Quantity',
      order: 'desc',
    },
  ]
  function post() {
    Axios.post('http://192.168.1.100:5006/test', {
      id: 1,
    }).then((rex) => {
      console.log(rex)
    })
    handleClose()
  }
  return (
    <div className="container-sm table-responsive" align="right">
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="product_name">Product Name:</Form.Label>
          <Form.Control
            onChange={(event) => {
              setPname(event.target.value)
            }}
            placeholder="Product Name"
            className="w-75"
            type="text"
            id="product_name"
          />
          <Form.Label className="mt-1" htmlFor="packaging_size">
            Packaging Size:
          </Form.Label>
          <Form.Control
            onChange={(event) => {
              setPsize(event.target.value)
            }}
            placeholder="Packaging Size"
            className="w-75"
            type="text"
            id="packaging_size"
          />
          <Form.Label className="mt-1" htmlFor="quantity">
            Initial Quantity:
          </Form.Label>
          <Form.Control
            onChange={(event) => {
              setIquantity(event.target.value)
            }}
            placeholder="Initial Quantity"
            className="w-75"
            type="text"
            id="quantity"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleInput}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <button className="btn btn-primary mb-4" onClick={handleShow}>
        Add New Product
      </button>

      <div className="table">
        <DataTable
          customStyles={customStyles}
          keyField="ID"
          data={products}
          columns={column}
          highlightOnHover={true}
        ></DataTable>
      </div>
    </div>
  )
}

export default FG

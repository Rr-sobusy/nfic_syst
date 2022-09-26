import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component'
import Modal from 'react-bootstrap/Modal'
import Axios from 'axios'
import Form from 'react-bootstrap/Form'
import swal from 'sweetalert'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

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

  const renderTooltip1 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  )
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  )

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
      name: 'Annotation',
      selector: (row) => row.annotation,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={renderTooltip1}>
            <button onClick={() => {}} className="btn btn-success">
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
          </OverlayTrigger>
          <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={renderTooltip2}>
            <button
              onClick={() => {
                swal({
                  title: `Are you sure you want to delete ${row.micro_name} ?`,
                  text: '',
                  icon: 'warning',
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal({
                      text: 'Enter the authorization key',
                      content: 'input',
                      button: {
                        text: 'Delete',
                        closeModal: false,
                      },
                    }).then((rex) => {
                      if (rex == 'rex') {
                        Axios.post('http://192.168.1.100:5006/deletemicro', {
                          microname: row.micro_name,
                        }).then((rex) => {
                          setRefresh(!refresh)
                          console.log(rex)
                        })
                        swal.close()
                      }
                    })
                  } else {
                    swal.close()
                  }
                })
              }}
              className="btn btn-danger ms-1"
            >
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
            </button>
          </OverlayTrigger>
        </div>
      ),
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
        <Button onClick={handleShow} className="mb-4">
          Add New Packaging
        </Button>
      </div>
      <div className="mt-5">
        <DataTable
          customStyles={customStyles}
          data={packagings}
          columns={column}
          keyField="ID"
        ></DataTable>
      </div>

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
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Packagings

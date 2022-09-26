import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'
import swal from 'sweetalert'

function Rawmat() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [mats, setMats] = useState([])
  const [rmname, setRmname] = useState('')
  const [rmtype, setRmtype] = useState('')
  const [rmquantity, setRmquantity] = useState(0)
  const [filtertext, setTofiltertext] = useState('')
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    let mounted = true
    if (mounted) {
      Axios.get('http://192.168.1.100:8011/api/warehouse/selectMacros').then((res) => {
        setMats(res.data)
        console.log('materials mounted')
      })
    }
    return () => {
      mounted = false
    }
  }, [refresh])

  const column = [
    {
      name: 'Macro Name',
      selector: (row) => row.rawmat_name,
    },
    {
      name: 'Type',
      selector: (row) => row.rawmat_type,
    },
    {
      name: 'Warehouse Stocks (kls.)',
      selector: (row) => row.current_stocks,
    },
    {
      name: 'Annotation',
      selector: (row) => row.annotation,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
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
            <button
              onClick={() => {
                swal({
                  title: 'Are you sure?',
                  text: 'Once deleted, you will not be able to recover this imaginary file!',
                  icon: 'warning',
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal({
                      text: 'Enter the authorization key.',
                      content: 'input',
                      button: {
                        text: 'Delete',
                        closeModal: false,
                      },
                    }).then((rex) => {
                      if (rex == 'rex') {
                        Axios.post('http://192.168.1.100:5006/deletemacro', {
                          macroname: row.rawmat_name,
                        }).then((rex) => {
                          setRefresh(!refresh)
                        })
                        swal.close()
                      }
                    })
                  } else {
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
          </div>
        )
      },
    },
  ]
  async function input() {
    await Axios.post(
      'http://192.168.1.100:8011/api/insertmacroGemWucT5jtVsPfNqzozHjP0FaCMFSfGBnNwrxFGXlYMF07L2xtpf6',
      {
        macroName: rmname,
        quantity: rmquantity,
      },
    ).then((rex) => {
      console.log(rex)
      setRefresh(!refresh)
    })
    handleClose()
    swal('', 'Macro Added!', 'success')
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
  const filtermacro = mats.filter(
    (item) => item.rawmat_name && item.rawmat_name.toLowerCase().includes(filtertext.toLowerCase()),
  )
  return (
    <div>
      <div className="container-sm table-responsive">
        <div align="right">
          <button onClick={handleShow} className="btn btn-primary mb-3">
            Add New R.M
          </button>
        </div>
        <Form.Control
          onChange={(event) => {
            setTofiltertext(event.target.value)
          }}
          placeholder="Search for macros"
          className="mb-3 w-25"
          type="text"
        />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Macro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="matname">Raw-Mat Name</Form.Label>
            <Form.Control
              onChange={(event) => {
                setRmname(event.target.value)
              }}
              className="w-75"
              type="text"
              id="matname"
              placeholder="Raw-mat Name"
            />

            <Form.Label htmlFor="quantity" className="mt-2">
              Initial quantity (kls.)
            </Form.Label>
            <Form.Control
              className="w-75"
              type="number"
              id="quanity"
              placeholder="Inital Quantity"
              onChange={(event) => {
                setRmquantity(event.target.value)
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={input}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="table-responsive">
          <DataTable
            keyField="ID"
            highlightOnHover
            customStyles={customStyles}
            key="id"
            columns={column}
            data={filtermacro}
            bordered={false}
            dense={false}
            responsive
            defaultSortFieldId={1}
          ></DataTable>
        </div>
      </div>
    </div>
  )
}

export default Rawmat

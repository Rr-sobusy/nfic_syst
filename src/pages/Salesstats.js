import React, { useState, useEffect, useContext } from 'react'
import { ReactPropTypes } from 'react'
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Context } from 'src/App'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import swal from 'sweetalert'

function Salesstats() {
  const [comp, setComps] = useState([{ id: uuidv4(), nameField: '', quantityField: '' }])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show1, setShow1] = useState(false)

  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)

  const [show2, setShow2] = useState(false)

  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)
  const [fgs, setFgs] = useState([])
  const [testing, setTest] = useState([])
  const [salesdata, setSalesdata] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [initialdata, setInitialdata] = useState({
    date: '',
    custName: '',
    si_no: '',
  })
  const [custnames, setCustnames] = useState([])
  const [sample, setSample] = useState({ date: '', custName: '', inv_no: '', order_details: '' })

  const sample1 = React.useContext(Context)
  const API = sample1.API_URi

  useEffect(() => {
    let mount = true
    if (mount) {
      Axios.get(`${API}/api/warehouse/selectfg`).then((res) => {
        setFgs(res.data)
      })
    }
    return () => {
      mount = false
    }
  }, [refresh])
  useEffect(() => {
    let mount = true
    if (mount) {
      Axios.get(`${API}/api/salesdata`).then((res) => {
        setSalesdata(res.data)
      })
    }
    return () => {
      mount = false
    }
  }, [fgs])
  useEffect(() => {
    let mount = true
    if (mount) {
      Axios.get(`${API}/api/customernames`).then((res) => {
        setCustnames(res.data)
      })
    }
    return () => {
      mount = false
    }
  }, [refresh])
  const renderTooltip1 = (props) => <Tooltip {...props}>View</Tooltip>
  const column = [
    {
      name: 'Sales Date',
      selector: (row) => row.date,
    },
    {
      name: 'Customer Name',
      selector: (row) => row.cust_name,
    },
    {
      name: 'S.I No.',
      selector: (row) => row.inv_no,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 100 }}
              overlay={renderTooltip1}
            >
              <Button
                onClick={() => {
                  handleShow2()
                  setSample({
                    date: row.date,
                    custName: row.cust_name,
                    inv_no: row.inv_no,
                    order_details: row.product_and_quantity,
                  })
                }}
                variant="info"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </Button>
            </OverlayTrigger>
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
  const handleChangeInput = (id, event) => {
    const newInputFields = comp.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setComps(newInputFields)
  }

  function resetStates() {
    setComps([{ id: uuidv4(), nameField: '', quantityField: '' }])
  }
  function saveRecords() {}

  return (
    <div>
      <div align="right">
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              Sales Inv. No: {initialdata.si_no}
              <br></br>
              <h6>Customer: {initialdata.custName}</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'list-item', padding: '10px' }}>
              {comp.map((value, index) => {
                return (
                  <div key={value.id}>
                    <div style={{ display: 'flex' }}>
                      <Form.Select
                        onChange={(event) => handleChangeInput(value.id, event)}
                        name="nameField"
                        aria-label="Default select example"
                        value={value.nameField}
                      >
                        <option>Select Product</option>
                        {fgs.map((val, key) => {
                          return (
                            <option key={val.id} value={val.Product_name}>
                              {val.Product_name}
                            </option>
                          )
                        })}
                      </Form.Select>

                      <Form.Control
                        onChange={(event) => handleChangeInput(value.id, event)}
                        name="quantityField"
                        className="ms-1"
                        type="number"
                        placeholder="Quantity"
                        value={value.quantityField}
                      />
                    </div>
                    <br></br>
                    {comp.length - 1 === index && (
                      <button
                        type="button"
                        onClick={() => {
                          setComps([...comp, { id: uuidv4(), nameField: '', quantityField: '' }])
                        }}
                        className="btn btn-primary"
                      >
                        <span>Add Item...</span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                resetStates()
                handleClose()
              }}
            >
              Close
            </Button>
            <Button
              onClick={async () => {
                comp.forEach((value) => {
                  const filtered = fgs.find((newval) => {
                    return newval.Product_name === value.nameField
                  })
                  const newvalue =
                    parseInt(filtered.Quantity, 10) - parseInt(value.quantityField, 10)
                  Axios.post(
                    `${API}/api/updatefg3GRaAoVsbKpFu7fpUabkS1ygipWThEKsTSoC0VFtc66J333bzf6nb6Rw`,
                    {
                      fgname: value.nameField,
                      quantity: newvalue,
                    },
                  ).then((res) => {
                    setRefresh(!refresh)
                  })
                })
                Axios.post(
                  `${API}/api/postsalesFW7IvMZbVrvsDsB7g0B2lR31xKQwFfJEOk0A5F4VvBHtUDXcf0EFMqn`,
                  {
                    date: initialdata.date,
                    custName: initialdata.custName,
                    si_no: initialdata.si_no,
                    data: comp.map((val) => {
                      return `Item: ${val.nameField} Quantity: ${val.quantityField} ||`
                    }),
                  },
                ).then((res) => {
                  console.log(res)
                  setRefresh((prevState) => !prevState)
                })

                handleClose()
              }}
              variant="primary"
            >
              Post
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          className="mb-3"
          onClick={() => {
            handleShow1()
            setRefresh(!refresh)
          }}
        >
          Add Sales
        </Button>
        {/********************SECOND MODAL *************** */}
        <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Sales</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              onChange={(event) => {
                setInitialdata((prevState) => ({
                  ...prevState,
                  date: event.target.value,
                }))
              }}
              type="date"
            ></input>
            <br></br>
            <Form.Select
              onChange={(event) => {
                setInitialdata((prevState) => ({
                  ...prevState,
                  custName: event.target.value,
                }))
              }}
              on
              className="mt-2 w-75"
              aria-label="Default select example"
            >
              <option>Select Customer</option>
              {custnames.map((val, key) => {
                return <option key="key">{val.cust_name}</option>
              })}
            </Form.Select>
            <Form.Control
              onChange={(event) => {
                setInitialdata((prevState) => ({
                  ...prevState,
                  si_no: event.target.value,
                }))
              }}
              className="mt-2 w-75"
              type="text"
              placeholder="Sales Inv. No."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (initialdata.date.length === 0 || initialdata.custName.length === 0) {
                  swal('Error!', 'Please validate missing field/s.', 'error')
                } else {
                  handleClose1()
                  handleShow()
                }
              }}
              variant="primary"
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <DataTable
        pagination={true}
        data={salesdata}
        columns={column}
        customStyles={customStyles}
      ></DataTable>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Sales Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex' }}>
            <h5>Sales Date : </h5>
            <h5 style={{ paddingLeft: '10px' }}>{sample.date}</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <h5>Customer : </h5>
            <h5 style={{ paddingLeft: '10px' }}>{sample.custName}</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <h5>Inv No. : </h5>
            <h5 style={{ paddingLeft: '10px' }}>{sample.inv_no}</h5>
          </div>
          <div className="mt-3 mb-4" align="center">
            <h5>-----Order details----- </h5>
          </div>
          <h5 style={{ paddingLeft: '10px' }}>{sample.order_details}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Salesstats

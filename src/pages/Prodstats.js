import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Axios from 'axios'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { TextField } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

function Prodstats() {
  const [prodrecords, setProdrecords] = useState([])
  const [macrocomps, setMacrocomps] = useState([{ id: uuidv4(), nameMacro: '', quantityMacro: '' }])
  const [microcomps, setMicrocomps] = useState([{ id: uuidv4(), nameMicro: '', quantityMicro: '' }])
  const [show, setShow] = useState(false)
  const [products, setProducts] = useState([])
  const [toplayer, setToplayer] = useState({ for: '', date: '', customer: '', product: '' })
  const [idetails, setIdetails] = useState({
    performula: 0,
    batches: 0,
    repro: 0,
    subt1: 0,
  })
  const [botlayer, setBotlayer] = useState({
    qtymade: 0,
    qtymadeinkls: '',
    forrepro: 0,
    waste: 0,
    subt2: '',
  })
  const [gain, setGain] = useState(0)
  const [percentgain, setPercentgain] = useState(0)
  const [micros, setMicros] = useState([])
  const [macros, setMacros] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [show1, setShow1] = useState(false)

  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)
  useEffect(() => {
    Axios.get('http://192.168.1.100:5006/prodrecords').then((res) => {
      setProdrecords(res.data)
    })
  }, [])
  useEffect(() => {
    Axios.get(
      'http://192.168.1.100:5006/kqeA9XnmTgU1CUMnONapgDfHxpI51VBBy3USKsXrLO42UbwfKJMXRvxz6WeyQQ21tcBtywicaKXucH0jyVlNj236orKjp9Guu6yNfgGgUftG4i2dv4piPDKSMaiU1lLY',
    ).then((res) => {
      setProducts(res.data)
    })
  }, [])
  React.useEffect(() => {
    let subscribe = true
    Axios.get('http://192.168.1.100:5006/searchmicros').then((response) => {
      if (subscribe) {
        setMicros(response.data)
        console.log('updated')
      }
    })

    return () => {
      subscribe = false
    }
  }, [])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      Axios.get(
        'http://192.168.1.100:5006/Ubua80poBcH8AeMxqtUIlBYqE2S7n9CX8Thnbd9R70GmpPVZ69nrjvyDA5gJOvsS3c6KULorOqmA7hRJUa2dKNSa4v0XMiYF887Td8FlkSOHrHRLCAFEMxEJCUhjI8HI',
      ).then((res) => {
        setMacros(res.data)
      })
    }
    return () => {
      mounted = false
    }
  }, [])
  const packagingsize = products.find((newval) => {
    return newval.Product_name === toplayer.product
  })
  const renderTooltip1 = (props) => <Tooltip {...props}>View</Tooltip>
  const renderTooltip2 = (props) => <Tooltip {...props}>Edit</Tooltip>

  const column = [
    {
      name: 'Production Date',
      selector: (row) => row.production_date,
    },
    {
      name: 'Product Name',
      selector: (row) => row.product_made,
    },
    {
      name: 'Total Quantity Made',
      selector: (row) => row.quantity_made,
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
              <button className="btn btn-info">
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
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 100 }}
              overlay={renderTooltip2}
            >
              <button className="btn btn-success ms-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </button>
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

  function handleChangeMacro(id, event) {
    const newInputFields = macrocomps.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setMacrocomps(newInputFields)
  }
  function handleChangeMicro(id, event) {
    const newInputFields = microcomps.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setMicrocomps(newInputFields)
  }

  function resetStates() {
    setIdetails({
      performula: 0,
      batches: 0,
      repro: 0,
      subt1: 0,
    })
  }
  return (
    <div>
      {/************************MODAL WORKS ********************************** */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Whole Production Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio2"
              name="optradio"
              value="NFIC"
              onChange={(event) => {
                const radio = event.target.value
                setToplayer((prevState) => ({
                  ...prevState,
                  for: radio,
                }))
              }}
            />
            NFIC Product
            <label className="form-check-label" htmlFor="radio2" />
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio2"
              name="optradio"
              value="Toller"
              onChange={(event) => {
                const radio = event.target.value
                setToplayer((prevState) => ({
                  ...prevState,
                  for: radio,
                }))
              }}
            />
            For Toller
            <label className="form-check-label" htmlFor="radio2" />
          </div>
          <input
            onChange={(event) => {
              const date = event.target.value
              setToplayer((prevState) => ({
                ...prevState,
                date: date,
              }))
            }}
            type="date"
          ></input>
          <Form.Control
            onChange={(event) => {
              const customer = event.target.value
              setToplayer((prevState) => ({
                ...prevState,
                customer: customer,
              }))
            }}
            placeholder="Customer"
            className="w-50 mt-2"
            type="text"
          />
          <Form.Select
            onChange={(event) => {
              setToplayer((prevState) => ({
                ...prevState,
                product: event.target.value,
              }))
            }}
            className="w-50 mt-2"
            aria-label="Default select example"
          >
            <option>Product Made</option>
            {products &&
              products.map((value, key) => {
                return <option key="key">{value.Product_name}</option>
              })}
          </Form.Select>
          <div align="center">
            <h5 className="mt-4">---------INPUT DETAILS---------</h5>
          </div>
          <div className="mt-3" style={{ display: 'flex' }}>
            <Form.Control
              onChange={(e) => {
                setIdetails((prevState) => ({
                  ...prevState,
                  performula: e.target.value,
                }))
              }}
              placeholder="Per Formula"
              className="w-50 mt-2"
              type="number"
            />
            <Form.Control
              onChange={(e) => {
                setIdetails((prevState) => ({
                  ...prevState,
                  batches: e.target.value,
                }))
              }}
              placeholder="Batches"
              className="w-50 mt-2 ms-1"
              type="number"
            />
            <Form.Control
              onChange={(e) => {
                setIdetails((prevState) => ({
                  ...prevState,
                  repro: e.target.value,
                }))
              }}
              placeholder="Re-Process"
              className="w-50 mt-2 ms-1"
              type="number"
            />
          </div>
          <div className="mb-3" align="center">
            <Form.Control
              onChange={(event) => {
                const test = idetails.performula
                const test1 = idetails.batches
                setIdetails((prevState) => ({
                  ...prevState,
                  subt1: event.target.value,
                }))
              }}
              placeholder="Sub-Total"
              className="w-50 mt-2 ms-1"
              type="number"
            />
            <button
              onClick={() => {
                handleShow1()
              }}
              className="btn btn-primary mt-2"
            >
              Consumed
            </button>
          </div>
          <div align="center">
            <h5 className="mt-4">---------OUTPUT DETAILS---------</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <Form.Control
              placeholder="Quantity Made in bags"
              className="w-50 mt-2"
              type="number"
              onChange={(event) => {
                setBotlayer((prevState) => ({
                  ...prevState,
                  qtymade: event.target.value,
                }))
              }}
            />
            <Form.Control
              placeholder="Quantity Made in kls."
              className="w-50 mt-2 ms-1"
              type="number"
              value={botlayer.qtymadeinkls}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Form.Control
              onChange={(event) => {
                setBotlayer((prevState) => ({
                  ...prevState,
                  forrepro: event.target.value,
                }))
              }}
              placeholder="FOR REPRO"
              className="w-50 mt-2 ms-0"
              type="number"
            />
            <Form.Control
              onChange={(event) => {
                setBotlayer((prevState) => ({
                  ...prevState,
                  waste: event.target.value,
                }))
              }}
              placeholder="WASTE"
              className="w-50 mt-2 ms-1"
              type="number"
            />
          </div>
          <div align="center">
            <button
              onClick={() => {
                const mult =
                  parseFloat(botlayer.qtymade, 10) * parseFloat(packagingsize.Packaging_in_kls)
                const total =
                  mult + parseFloat(botlayer.forrepro, 10) + parseFloat(botlayer.waste, 10)
                setBotlayer((prevState) => ({
                  ...prevState,
                  qtymadeinkls: mult,
                  subt2: total,
                }))
                const losses = total - parseFloat(idetails.subt1)
                setGain(losses.toFixed(2))
                const percentloss = (losses / total) * 100
                setPercentgain(percentloss.toFixed(1))
              }}
              className="btn btn-primary mt-2"
            >
              Calc.
            </button>
          </div>
          <div align="center">
            <Form.Control
              value={botlayer.subt2}
              placeholder="Sub-Total"
              className="w-50 mt-2 ms-1"
              type="number"
            />
          </div>
          <div align="center">
            <h6 className="mt-2">
              LOSSES/GAIN:{`  `} {gain}
            </h6>
            <h6 className="mt-2">
              % LOSSES/GAIN:{`  `}
              {percentgain}
            </h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>{' '}
      <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Consumed Materials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div align="center">
            <h5>------Macros consumed-------</h5>
          </div>
          <div style={{ display: 'list-item', padding: '10px' }}>
            {macrocomps.map((value, index) => {
              return (
                <div key={value.id}>
                  <div style={{ display: 'flex' }}>
                    <Form.Select
                      onChange={(event) => handleChangeMacro(value.id, event)}
                      value={value.nameMacro}
                      name="nameMacro"
                      aria-label="Default select example"
                    >
                      <option>Select Macro</option>
                      {macros.map((val, key) => {
                        return <option key={val.id}>{val.rawmat_name}</option>
                      })}
                    </Form.Select>

                    <Form.Control
                      onChange={(event) => handleChangeMacro(value.id, event)}
                      value={value.quantityMacro}
                      name="quantityMacro"
                      className="ms-1"
                      type="number"
                      placeholder="Quantity"
                    />
                  </div>
                  <br></br>
                  {macrocomps.length - 1 === index && (
                    <button
                      type="button"
                      onClick={() => {
                        setMacrocomps([
                          ...macrocomps,
                          { id: uuidv4(), nameMacro: '', quantityMacro: '' },
                        ])
                      }}
                      className="btn btn-primary"
                    >
                      <span>Add Field</span>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          <div align="center">
            <h5>------Micros consumed-------</h5>
          </div>
          <div style={{ display: 'list-item', padding: '10px' }}>
            {microcomps.map((value, index) => {
              return (
                <div key={value.id}>
                  <div style={{ display: 'flex' }}>
                    <Form.Select
                      value={value.nameMicro}
                      onChange={(event) => handleChangeMicro(value.id, event)}
                      name="nameMicro"
                      aria-label="Default select example"
                    >
                      <option>Select Micro</option>
                      {micros.map((val, key) => {
                        return <option key={val.id}>{val.micro_name}</option>
                      })}
                    </Form.Select>

                    <Form.Control
                      onChange={(event) => handleChangeMicro(value.id, event)}
                      value={value.quantityMicro}
                      name="quantityMicro"
                      className="ms-1"
                      type="number"
                      placeholder="Quantity"
                    />
                  </div>
                  <br></br>
                  {microcomps.length - 1 === index && (
                    <button
                      type="button"
                      onClick={() => {
                        setMicrocomps([
                          ...microcomps,
                          { id: uuidv4(), nameMicro: '', quantityMicro: '' },
                        ])
                      }}
                      className="btn btn-primary"
                    >
                      <span>Add Field</span>
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
              handleClose1()
              handleShow()
            }}
          >
            Back
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
      <div align="right">
        <button onClick={handleShow} className="btn btn-primary mb-3 me-3">
          Add Report
        </button>
      </div>
      <DataTable
        keyField="ID"
        customStyles={customStyles}
        columns={column}
        data={prodrecords}
        pagination={true}
      ></DataTable>
    </div>
  )
}

export default Prodstats

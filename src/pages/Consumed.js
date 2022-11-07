import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { v4 as uuidv4 } from 'uuid'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import { Context } from 'src/App'

function Consumed() {
  const [type, setType] = useState('')
  const [comp, setComps] = useState([{ id: uuidv4(), nameField: '', quantityField: '' }])
  const [macrocomp, setMacrocomp] = useState([{ id: uuidv4(), nameMacro: '', quantityMacro: '' }])
  const [micros, setMicros] = useState([])
  const [macro, setMacros] = useState([])
  const [consumed, setConsumed] = useState([])
  const [date, setDate] = useState('')
  const [sum, setSum] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [description, setDescription] = useState('')
  const [showtotal, setShowtotal] = useState(false)
  const [show, setShow] = useState(false)
  const [showbutton, setShowbutton] = useState(true)
  const [datas, setDatas] = useState({ date: '', type: '', desc: '', details: '' })
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //Modal For Micro
  const [show1, setShow1] = useState(false)
  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)
  //Modal For Macro
  const [show2, setShow2] = useState(false)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)
  //Viewing Modal
  const [show3, setShow3] = useState(false)
  const handleClose3 = () => setShow3(false)
  const handleShow3 = () => setShow3(true)

  const sample = React.useContext(Context)
  const API = sample.API_URi

  useEffect(() => {
    Axios.get(`${API}/api/warehouse/selectMicros`).then((res) => {
      setMicros(res.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`${API}/api/warehouse/selectMacros`).then((res) => {
      setMacros(res.data)
    })
  }, [])
  useEffect(() => {
    Axios.get(`${API}/api/getConsumed`).then((res) => {
      setConsumed(res.data)
    })
  }, [refresh])

  function proceedHandler() {
    if (type === 'Micro') {
      handleClose()
      handleShow1()
    }
    if (type === 'Macro') {
      handleClose()
      handleShow2()
    }
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

  const handleChangeInputMacro = (id, event) => {
    const newInputFields = macrocomp.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setMacrocomp(newInputFields)
  }
  function resetStates() {
    setComps([{ id: uuidv4(), nameField: '', quantityField: '' }])
    setMacrocomp([{ id: uuidv4(), nameField: '', quantityField: '' }])
    setShowbutton(true)
    setShowtotal(false)
    setSum(0)
  }

  function postHistoryMicro() {
    Axios.post(`${API}/api/addconsumedUmA9v5qCpwHVMB0BeVa5oVPTrHKgZmRdpco7jS5o5goCoKTqyNS9B`, {
      description: description,
      total: sum,
      type: type,
      date: date,
      items: comp.map((val) => {
        return `Material: ${val.nameField} Quantity: ${val.quantityField} ||`
      }),
    }).then(() => {
      setRefresh(!refresh)
    })
  }

  function postHistoryMacro() {
    Axios.post(`${API}/api/addconsumedUmA9v5qCpwHVMB0BeVa5oVPTrHKgZmRdpco7jS5o5goCoKTqyNS9B`, {
      description: description,
      total: sum,
      type: type,
      date: date,
      items: macrocomp.map((val) => {
        return `Material: ${val.nameMacro} Quantity: ${val.quantityMacro} ||`
      }),
    }).then(() => {
      setRefresh(!refresh)
    })
  }

  function submitHandler() {
    if (type === 'Micro') {
      handleClose1()
      resetStates()
      postHistoryMicro()
      comp.forEach((val) => {
        const filtered = micros.find((newval) => {
          return newval.micro_name === val.nameField
        })
        const diff = parseFloat(filtered.pending, 10) - parseFloat(val.quantityField, 10)
        Axios.post(`${API}/api/updatependingmicronRWSqmERLjHOuFxqoinfr5W51xxu9eWx02nVdXoiYvB9wB`, {
          difference: diff,
          microName: val.nameField,
        }).then(() => {
          setRefresh(!refresh)
        })
      })
    }
    if (type === 'Macro') {
      handleClose2()
      resetStates()
      postHistoryMacro()
      macrocomp.forEach((val) => {
        const filtered = macro.find((newval) => {
          return newval.rawmat_name === val.nameMacro
        })
        const diff = parseFloat(filtered.bin_content, 10) - parseFloat(val.quantityMacro, 10)
        Axios.post(`${API}/api/updatependingmacroFe29bmBW6iAxwWCPAMuBNi2mqQ2nmEUIhgyN6aZdWR8iH1`, {
          macroName: val.nameMacro,
          difference: diff,
        }).then(() => {
          setRefresh(!refresh)
        })
      })
    }
  }

  const column = [
    {
      name: 'Consumption Date',
      selector: (row) => row.date,
    },
    {
      name: 'Desciption',
      selector: (row) => row.description,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
            <Button
              onClick={() => {
                setDatas(() => ({
                  date: row.date,
                  type: row.type,
                  desc: row.description,
                  details: row.details,
                  total: row.total,
                }))
                handleShow3()
              }}
              variant="info"
            >
              View
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <div align="right">
        <Button className="mb-4" onClick={handleShow}>
          Add Consumed
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Consumed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={(event) => {
              setDate(event.target.value)
            }}
            className="mb-2"
            type="date"
          ></input>
          <Form.Control
            onChange={(event) => {
              setDescription(event.target.value)
            }}
            placeholder="Description"
            type="text"
            className="mb-2 w-75"
          />
          <Form.Select
            onChange={(event) => {
              setType(event.target.value)
            }}
            className="w-75"
            aria-label="Default select example"
          >
            <option>Select Material type</option>
            <option value="Micro">Micros</option>
            <option value="Macro">Macros</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose()
            }}
          >
            Close
          </Button>
          <Button onClick={proceedHandler} variant="primary">
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Consumed Micro</Modal.Title>
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
                      className="mb-1"
                      aria-label="Default select example"
                    >
                      <option>Open this select menu</option>
                      {micros &&
                        micros.map((val, key) => {
                          return <option key={key}>{val.micro_name}</option>
                        })}
                    </Form.Select>
                    <Form.Control
                      onChange={(event) => handleChangeInput(value.id, event)}
                      name="quantityField"
                      className="ms-1 mb-1"
                      type="number"
                      placeholder="Quantity"
                    />
                  </div>
                  {comp.length - 1 === index && (
                    <div>
                      <div style={{ display: 'flex' }}>
                        <Button
                          variant="info"
                          onClick={() => {
                            setComps([...comp, { id: uuidv4(), nameField: '', quantityField: '' }])
                          }}
                        >
                          <span>Add Item..</span>
                        </Button>
                        <div align="right">
                          {showbutton && (
                            <Button
                              onClick={() => {
                                setShowtotal(true)
                                setShowbutton(false)
                                comp.map((val) => {
                                  setSum((prev) => prev + parseFloat(val.quantityField, 10))
                                })
                              }}
                              className="ms-1"
                              variant="info"
                            >
                              Total
                            </Button>
                          )}{' '}
                        </div>
                      </div>
                      {showtotal && (
                        <div align="right">
                          <h6 style={{ marginRight: '40px' }} className="mt-3">
                            Total Product mixed: {comp.length}
                          </h6>
                          <h6 style={{ marginRight: '40px' }}>Total Quantity produced: {sum}</h6>
                        </div>
                      )}
                    </div>
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
              resetStates()
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      {/************************************Modal For Macro*********************************************** */}
      <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Consumed Macro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'list-item', padding: '10px' }}>
            {macrocomp.map((value, index) => {
              return (
                <div key={value.id}>
                  <div style={{ display: 'flex' }}>
                    <Form.Select
                      onChange={(event) => handleChangeInputMacro(value.id, event)}
                      name="nameMacro"
                      className="mb-1"
                      aria-label="Default select example"
                    >
                      <option>Open this select menu</option>
                      {macro &&
                        macro.map((val, key) => {
                          return <option key={key}>{val.rawmat_name}</option>
                        })}
                    </Form.Select>
                    <Form.Control
                      onChange={(event) => handleChangeInputMacro(value.id, event)}
                      name="quantityMacro"
                      className="ms-1 mb-1"
                      type="number"
                      placeholder="Quantity"
                    />
                  </div>
                  {macrocomp.length - 1 === index && (
                    <div>
                      <div style={{ display: 'flex' }}>
                        <Button
                          variant="info"
                          onClick={() => {
                            setMacrocomp([
                              ...macrocomp,
                              { id: uuidv4(), nameMacro: '', quantityMacro: '' },
                            ])
                          }}
                        >
                          <span>Add Item..</span>
                        </Button>
                        <div align="right">
                          {showbutton && (
                            <Button
                              onClick={() => {
                                setShowtotal(true)
                                setShowbutton(false)
                                macrocomp.map((val) => {
                                  setSum((prev) => prev + parseFloat(val.quantityMacro, 10))
                                })
                              }}
                              className="ms-1"
                              variant="info"
                            >
                              Total
                            </Button>
                          )}{' '}
                        </div>
                      </div>
                      {showtotal && (
                        <div align="right">
                          <h6 style={{ marginRight: '40px' }}>Total : {sum}</h6>
                        </div>
                      )}
                    </div>
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
              handleClose2()
              resetStates()
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      {/**************************************   Viewing Modal   **************************************************** */}
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Consumption Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ display: 'flex' }}>
              <h6>Description : </h6>
              <h6 style={{ paddingLeft: '10px' }}>{datas.desc}</h6>
            </div>
            <div style={{ display: 'flex' }}>
              <h6>Material type : </h6>
              <h6 style={{ paddingLeft: '10px' }}>{datas.type}</h6>
            </div>
            <div style={{ display: 'flex' }}>
              <h6>Date consumed : </h6>
              <h6 style={{ paddingLeft: '10px' }}>{datas.date}</h6>
            </div>
            <div style={{ display: 'flex' }}>
              <h6>Total quantity : </h6>
              <h6 style={{ paddingLeft: '10px' }}>{datas.total}</h6>
            </div>

            <div className="mt-4" align="center">
              <h5>---Details---</h5>
            </div>
            {datas.details}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <DataTable columns={column} data={consumed}></DataTable>
    </div>
  )
}

export default Consumed

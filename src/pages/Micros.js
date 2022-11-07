import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import Axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Context } from 'src/App'

function Micros() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show1, setShow1] = useState(false)

  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)

  const [micros, setMicros] = React.useState([])
  const [microname, setMicroname] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [filtertext, setFiltertext] = useState('')
  const [modaldata, setModaldata] = useState({
    microname: '',
    type: 'rex',
    whstocks: 0,
    annotation: '',
  })
  const [refresh, setRefresh] = useState(false)

  const sample = React.useContext(Context)
  const API = sample.API_URi

  React.useEffect(() => {
    let subscribe = true
    Axios.get(`${API}/api/warehouse/selectMicros`).then((response) => {
      if (subscribe) {
        setMicros(response.data)
        console.log('updated')
      }
    })

    return () => {
      subscribe = false
    }
  }, [refresh])

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
  const columns = [
    {
      name: 'Micro Name',
      selector: (row) => row.micro_name,
    },
    {
      name: 'Type',
      selector: (row) => row.type,
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
      name: `   Action`,
      cell: (row) => (
        <div>
          <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={renderTooltip1}>
            <button
              onClick={() => {
                setModaldata({
                  microname: row.micro_name,
                  type: 'rex',
                  type: 'rex',
                  quantity: 0,
                  annotation: 'rex',
                })
                console.log(modaldata.name)
                handleShow1()
              }}
              className="btn btn-success"
            >
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

  async function post(e) {
    await Axios.post(
      'http://192.168.1.100:8011/api/insertnewmicrouIYLT0Hiskg1XtkzxKXSGjkGMrVoQSEv2sMisG8rgvcKDPIvlH',
      {
        microName: microname,
        quantity: quantity,
      },
    ).then((rex) => {
      setRefresh(!refresh)
    })
  }
  function SubmitHandler(event) {
    post()
    handleClose()
    swal('', 'Micro Added!', 'success')
  }

  const filtermicro = micros.filter(
    (item) => item.micro_name && item.micro_name.toLowerCase().includes(filtertext.toLowerCase()),
  )

  return (
    <div className="container">
      <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title{modaldata.microname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-notification">
            <div className="chat-notification-logo-wrapper">
              <img className="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo" />
            </div>
            <div className="chat-notification-content">
              <h4 className="chat-notification-title">ChitChat</h4>
              <p className="chat-notification-message">You have a new message!</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
          <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            Message
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Micro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Micro Name</Form.Label>
          <Form.Control
            className="w-75 mb-3"
            type="text"
            placeholder="Micro Name"
            onChange={(event) => {
              setMicroname(event.target.value)
            }}
          />
          <Form.Label>Intitial quantity (kls.)</Form.Label>
          <Form.Control
            className="w-75 mb-3"
            type="number"
            placeholder="Initial quantity"
            onChange={(event) => {
              setQuantity(event.target.value)
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={SubmitHandler}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container-sm" align="right">
        <Button onClick={handleShow} variant="primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Add New Micro
        </Button>
      </div>
      <Form.Control
        onChange={(event) => {
          setFiltertext(event.target.value)
        }}
        className="w-25 mb-3 mt-3"
        type="text"
        placeholder={`Search for micros`}
      />
      <DataTable
        keyField="ID"
        customStyles={customStyles}
        highlightOnHover
        key="id"
        columns={columns}
        data={filtermicro}
        bordered={false}
        dense={false}
        responsive
        defaultSortFieldId={1}
      />
    </div>
  )
}

export default Micros

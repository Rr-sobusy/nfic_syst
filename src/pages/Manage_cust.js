import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Axios from 'axios'
import { Context } from 'src/App'

function Manage_cust() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [custnames, setCustnames] = useState([])
  const [names, setNames] = useState('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    Axios.get('http://192.168.1.100:5006/custnames').then((res) => {
      setCustnames(res.data)
    })
  }, [refresh])

  function insert() {
    handleClose()
    post()
  }
  function post() {
    Axios.post('http://192.168.1.100:5006/insertcustname', {
      names: names,
    }).then(() => {
      setRefresh(!refresh)
    })
  }
  return (
    <div>
      <div className="container-md">
        <div className="row ps-3">
          <div className="col-8 table-responsive" align="right">
            <Button className="mb-3" onClick={handleShow}>
              Add Customer
            </Button>
            <Table bordered={false} hover>
              <thead>
                <tr>
                  <th>Customers</th>
                </tr>
              </thead>
              <tbody>
                {custnames.map((val, key) => {
                  return <tr key={key}>{val.cust_name}</tr>
                })}
              </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Add Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Customer Name:</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    setNames(event.target.value)
                  }}
                  className="w-75"
                  type="text"
                  id="csname"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={insert}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-4"> </div>
        </div>
      </div>
    </div>
  )
}

export default Manage_cust

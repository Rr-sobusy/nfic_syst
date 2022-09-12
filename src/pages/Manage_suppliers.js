import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

function Manage_suppliers() {
  const [suppnames, setSuppnames] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [suppliers, setSuppliers] = useState('')
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    Axios.get(
      'http://192.168.1.100:5006/zj31D2dcD0apzqmc6obb1XtF1pJDD1X2uy4pTpoLYQ9HAHFr0cW6mXbIpOD4PJIk9qcMj50yv65qSr9hga6ZuBoEOkeE6oUvmtGWdNbKqkoNBasnDLu2JuuayLObR4mN',
    ).then((res) => {
      setSuppnames(res.data)
    })
  }, [refresh])
  function closeHandler() {
    handleClose()
    insert()
  }
  function insert() {
    Axios.post('http://192.168.1.100:5006/insertsuppnames', {
      suppliers: suppliers,
    }).then(() => {
      setRefresh(!refresh)
    })
  }
  return (
    <div>
      {' '}
      <div className="container-md">
        <div className="row ps-3">
          <div className="col-8 table-responsive" align="right">
            <Button className="mb-3" onClick={handleShow}>
              Add Supplier
            </Button>
            <Table bordered={false} hover>
              <thead>
                <tr>
                  <th>Suppliers</th>
                </tr>
              </thead>
              <tbody>
                {suppnames.map((val, key) => {
                  return <tr key={key}>{val.supplier_name}</tr>
                })}
              </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Add Supplier</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label htmlFor="inputPassword5">Supplier Name:</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    setSuppliers(event.target.value)
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
                <Button variant="primary" onClick={closeHandler}>
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

export default Manage_suppliers

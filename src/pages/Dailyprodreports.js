import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import swal from 'sweetalert'
import { Context } from 'src/App'

function Dailyprodreports() {
  const [dailyreports, setDailyreports] = useState([])
  const [fg, setFg] = useState([])
  const [show, setShow] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [datas, setDatas] = useState({
    date: '',
    productname: '',
    packsize: '',
    bags: 0,
    kilos: '',
    remarks: '',
  })

  const sample = React.useContext(Context)
  const API = sample.API_URi

  useEffect(() => {
    Axios.get(`${API}/api/warehouse/selectfg`).then((res) => {
      setFg(res.data)
    })
  }, [refresh])
  React.useEffect(() => {
    let subscribe = true
    Axios.get(`${API}/api/dailyproduction`).then((response) => {
      if (subscribe) {
        setDailyreports(response.data)
      }
    })

    return () => {
      subscribe = false
    }
  }, [fg])
  const columns = [
    {
      name: 'Production Date',
      selector: (row) => row.production_date,
    },
    {
      name: 'Product Name',
      selector: (row) => row.product_name,
    },
    {
      name: 'Packaging Size',
      selector: (row) => row.packaging_size,
    },
    {
      name: 'Quantity Made (in bags.)',
      selector: (row) => row.bags_made,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
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

  let pname = fg.find((newval) => {
    return newval.Product_name === datas.productname
  })
  function resetStates() {
    setDatas(() => ({
      date: '',
      productname: '',
      packsize: '',
      bags: '',
      remarks: '',
    }))
    console.log()
  }
  function closeHandler() {
    handleClose()
    resetStates()
  }

  function submitHandler() {
    if (datas.date == '' || datas.productname == '' || datas.kilos == '') {
      alert('validate required fields')
    } else {
      formSubmit()
      closeHandler()
      resetStates()
    }
  }

  //Function in posting the production history
  function formSubmit() {
    Axios.post(`${API}/api/dailyproductionEduIXd3z9WsA95Rki2jRV4ZsjYlnfUgvMKr6XeUNMnpeaUTPS`, {
      proddate: datas.date,
      prodname: datas.productname,
      packsize: datas.packsize,
      bagsmade: datas.bags,
      inkls: datas.kilos,
      remarks: datas.remarks,
    }).then((rex) => {
      setRefresh(!refresh)
    })
    updateFg()
  }

  //Function for updating the finished goods stocks
  function updateFg() {
    Axios.post('http://192.168.1.100:5006/updatefg', {
      rmmodal: datas.productname,
      sum: parseInt(pname.Quantity, 10) + parseInt(datas.bags, 10),
    }).then((rex) => {
      setRefresh(!refresh)
    })
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Daily Production Output Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                date: event.target.value,
              }))
            }}
            type="date"
          ></input>
          <Form.Select
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                productname: event.target.value,
              }))
            }}
            className="w-50 mt-2"
          >
            <option>Select Product</option>
            {fg &&
              fg.map((val, key) => {
                return (
                  <option key={key} value={val.Product_name}>
                    {val.Product_name}
                  </option>
                )
              })}
          </Form.Select>
          <div className="mt-2 mb-2" style={{ display: 'flex' }}>
            <FloatingLabel label="Qty Made">
              <Form.Control
                onChange={(event) => {
                  setDatas((prevState) => ({
                    ...prevState,
                    bags: event.target.value,
                  }))
                }}
                type="number"
                placeholder="Qty made"
                className="mt-1"
              />
            </FloatingLabel>
            <FloatingLabel label="Pck. size">
              <Form.Control
                type="number"
                placeholder="name@example.com"
                className="mt-1 ms-1"
                value={datas.packsize}
              />
            </FloatingLabel>
            <FloatingLabel label="Total in kls.">
              <Form.Control
                type="number"
                placeholder="name@example.com"
                className="mt-1 ms-2 me-4"
                value={datas.kilos}
              />
            </FloatingLabel>
            <button
              onClick={() => {
                if (datas.productname == '') {
                  swal('Error!', 'Please select Product.', 'error')
                } else {
                  const mult = parseFloat(pname.Packaging_in_kls) * parseFloat(datas.bags, 10)
                  setDatas((prevState) => ({
                    ...prevState,
                    packsize: pname.Packaging_in_kls,
                    kilos: mult,
                  }))
                }
              }}
              className="btn btn-primary ms-3"
            >
              Calc.
            </button>
          </div>

          <Form.Control
            onChange={(event) => {
              setDatas((prevState) => ({
                ...prevState,
                remarks: event.target.value,
              }))
            }}
            type="text"
            placeholder="Remarks"
            className="w-75 mt-1"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
          <Button onClick={submitHandler} variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div align="right">
        <button onClick={handleShow} className="btn btn-primary mb-3">
          Add Report
        </button>
        <DataTable
          keyField="ID"
          customStyles={customStyles}
          columns={columns}
          data={dailyreports}
          pagination={true}
        ></DataTable>
      </div>
    </div>
  )
}

export default Dailyprodreports

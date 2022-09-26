import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import paginationFactory from 'react-bootstrap-table2-paginator'
import swal from 'sweetalert'

function Delivery() {
  const [deldata, setDeldata] = useState([])
  const [matdata, setMatdata] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [tofilter, setToFilter] = useState('')
  const [handleDisabled, setHandleDisabled] = useState(true)
  const [show2, setShow2] = useState(false)
  const [rmmodal, setRmmodal] = useState('')
  const [prevquantity, setPrevquantity] = useState(0)
  const [newquantity, setNewquantity] = useState(0)
  const [date, setDate] = useState('')
  const [dr, setDr] = useState('')
  const [remarks, setRemarks] = useState('')
  const [suppnames, setSuppnames] = useState([])
  const [supplier, setSupplier] = useState('')
  const [select, setSelect] = useState('')
  const [micros, setMicros] = useState([])
  const [micromodal, setMicromodal] = useState('')
  const [packagings, setPackagings] = useState([])
  const [refresh, setRefresh] = useState(false)

  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)

  useEffect(() => {
    Axios.get(
      'http://192.168.1.100:5006/N0eQ5sDwIIl7DbYRSYBJzOx6E3NcpwmiYRUokQq4hR9xgfqny0MhmxRnydS1jHtkWyEPdr8XABAeYEv5rB1Hq68yEavRPoAXVAE5LXi3Z5UK3nnS5QBxAR8cdjBQiMsU',
    ).then((res) => {
      setDeldata(res.data)
    })
  }, [micros, packagings, suppnames, matdata])

  useEffect(() => {
    Axios.get(
      'http://192.168.1.100:5006/Ubua80poBcH8AeMxqtUIlBYqE2S7n9CX8Thnbd9R70GmpPVZ69nrjvyDA5gJOvsS3c6KULorOqmA7hRJUa2dKNSa4v0XMiYF887Td8FlkSOHrHRLCAFEMxEJCUhjI8HI',
    ).then((res) => {
      setMatdata(res.data)
      console.log(matdata)
    })
  }, [refresh])
  useEffect(() => {
    Axios.get(
      'http://192.168.1.100:5006/zj31D2dcD0apzqmc6obb1XtF1pJDD1X2uy4pTpoLYQ9HAHFr0cW6mXbIpOD4PJIk9qcMj50yv65qSr9hga6ZuBoEOkeE6oUvmtGWdNbKqkoNBasnDLu2JuuayLObR4mN',
    ).then((res) => {
      setSuppnames(res.data)
    })
  }, [refresh])
  useEffect(() => {
    Axios.get('http://192.168.1.100:5006/searchmicros').then((res) => {
      setMicros(res.data)
    })
  }, [refresh])

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

  const column = [
    {
      dataField: 'date',
      text: 'Delivery Date',
      sort: 'true',
    },
    {
      dataField: 'supplier',
      text: 'Supplier Name',
    },
    {
      dataField: 'rawmat_name',
      text: 'Raw-mat Name',
    },
    {
      dataField: 'quantity',
      text: 'Quantity',
    },
    {
      dataField: 'dr_no',
      text: 'D.R No.',
    },
    {
      dataField: 'remarks',
      text: 'Remarks',
    },
  ]

  function handleSelectChange(e) {
    setToFilter(e.target.value)
    setHandleDisabled(false)
  }

  const macrodata = matdata.find((newval) => {
    return newval.rawmat_name === tofilter
  })
  const microdata = micros.find((newval) => {
    return newval.micro_name === tofilter
  })
  const packagingdata = packagings.find((newval) => {
    return newval.packaging_name === tofilter
  })
  function closeHandler() {
    handleClose()
    handleShow2()
    if (select == 'macro') {
      setRmmodal(macrodata.rawmat_name)
      setPrevquantity(macrodata.current_stocks)
    }
    if (select == 'micro') {
      setRmmodal(microdata.micro_name)
      setPrevquantity(microdata.current_stocks)
    }
    if (select == 'packaging') {
      setRmmodal(packagingdata.packaging_name)
      setPrevquantity(packagingdata.current_stocks)
    }
  }
  function handleUpdate() {
    if (select == 'macro') {
      updatemacro()
    }
    if (select == 'micro') {
      updatemicro()
    }
    if (select == 'packaging') {
      updatepackaging()
    }
    insertDelivery()
  }
  function updatepackaging() {
    Axios.post('http://192.168.1.100:5006/updatepackagings', {
      packagingName: rmmodal,
      newval: parseFloat(prevquantity, 10) + parseFloat(newquantity, 10),
    }).then((rex) => {
      setRefresh(!refresh)
    })
  }
  function updatemicro() {
    Axios.post(
      'http://192.168.1.100:5006/iUOFilAxLKq2l97lkC0D7vKBrsnjZXsEWAmK6FHVU2KAARsY7LxhPdAMwCikbiklUcJzkEQvSJKmxdnDrlwwquZXxuKmdVglecPx4URaIktwywzGpzkPPactJDERKGjX',
      {
        rmmodal: rmmodal,
        summicro: parseFloat(prevquantity, 10) + parseFloat(newquantity, 10),
      },
    ).then((rex) => {
      setRefresh(!refresh)
    })
  }

  function updatemacro() {
    Axios.post(
      'http://192.168.1.100:5006/vanmhWQsuTLs7UkHEL9wKJj7UeOORJWB3VJWsrPUtdHUpg9y3NwqgQqu3oKDWtP7HORynoGdK5s1ai1FElKoqzJ9F2VrgrNar3qnpIlebIxjf46hPDe72VdpYIZfWFIT',
      {
        rmmodal: rmmodal,
        sum: parseFloat(prevquantity, 10) + parseFloat(newquantity, 10),
      },
    ).then((rex) => {
      setRefresh(!refresh)
    })
  }
  function insertDelivery() {
    if (
      date.length == 0 ||
      supplier.length == 0 ||
      rmmodal.length == 0 ||
      newquantity.length == 0
    ) {
      swal('Error', 'Please validate all fields', 'error')
    } else {
      Axios.post(
        'http://192.168.1.100:5006/zz3wgk4yktUVrDDYyxT31V3ciuCmF77veI3oaBWwTVjpkhjnwXXGrQyVRlNIp8W8oAOk6a5DvPnDUu9AT1fWNOgyO3rm9Ln5jAMICvWTvtg0PPcacME8oGAmYk47QIjm',
        {
          date: date,
          supplier: supplier,
          rmmodal: rmmodal,
          newquantity: newquantity,
          dr: dr,
          remarks: remarks,
        },
      ).then((rex) => {
        setRefresh(!refresh)
      })
      swal('Sucess', 'Reception added', 'success')
      handleClose2()
    }
  }
  function selecthandler(event) {
    setSupplier(event.target.value)
  }
  const defaultSorted = [
    {
      dataField: 'date',
      order: 'desc',
    },
  ]

  return (
    <div className="container-fluid" align="right">
      <button className="btn btn-primary mb-4" onClick={handleShow}>
        Add Reception
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Reception</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="mt-1" htmlFor="supplier">
            Type:
          </Form.Label>
          <Form.Select
            onChange={(event) => {
              let selected = event.target.value
              if (selected === 'micro') {
                setSelect(selected)
              }
              if (selected === 'packaging') {
                setSelect(selected)
              }
              if (selected === 'macro') {
                setSelect(selected)
              }
            }}
            className="w-75 mt-1"
            aria-label="Default select example"
          >
            <option value="null">Select Type:</option>
            <option value="macro">Macro</option>
            <option value="micro">Micro</option>
            <option value="packaging">Packagings</option>
          </Form.Select>

          <Form.Label className="mt-1" htmlFor="supplier">
            Name:
          </Form.Label>

          <Form.Select
            className="w-75 mt-1"
            aria-label="Default select example"
            onChange={handleSelectChange}
          >
            <option>Select Material</option>
            {select === 'macro' &&
              matdata.map((val, uk) => {
                return (
                  <option key={uk} value={val.rawmat_name}>
                    {val.rawmat_name}
                  </option>
                )
              })}
            {select === 'micro' &&
              micros.map((val, uk) => {
                return (
                  <option key={uk} value={val.micro_name}>
                    {val.micro_name}
                  </option>
                )
              })}
            {select === 'packaging' &&
              packagings.map((val, uk) => {
                return (
                  <option key={uk} value={val.packaging_name}>
                    {val.packaging_name}
                  </option>
                )
              })}
            {/*
            {select &&
              select &&
              matdata.map((val, uk) => {
                return (
                  <option key={uk} value={val.rawmat_name}>
                    {val.rawmat_name}
                  </option>
                )
              })} */}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            data-toggle="modal"
            data-target="#exampleModal"
            variant="primary"
            disabled={handleDisabled}
            onClick={closeHandler}
          >
            Continue
          </Button>
        </Modal.Footer>
        {/*******************Second Modal *************/}
      </Modal>
      <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Material Delivery : {rmmodal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={(event) => {
              setDate(event.target.value)
            }}
            type="date"
          ></input>
          <br></br>
          <Form.Select
            onChange={selecthandler}
            className="mt-2 w-75"
            aria-label="Default select example"
          >
            <option>Select Supplier</option>
            {suppnames.map((val, key) => {
              return (
                <option value={val.supplier_name} key={key}>
                  {val.supplier_name}
                </option>
              )
            })}
          </Form.Select>
          <Form.Label className="mt-1" htmlFor="supplier">
            Quantity :
          </Form.Label>
          <Form.Control
            onChange={(event) => {
              setNewquantity(event.target.value)
            }}
            className="w-75"
            type="number"
            id="qunatity"
            placeholder="Quantity"
          />
          <Form.Label className="mt-1" htmlFor="supplier">
            D.R No. :
          </Form.Label>
          <Form.Control
            onChange={(event) => {
              setDr(event.target.value)
            }}
            className="w-75"
            type="text"
            id="drno"
            placeholder="D.R No."
          />
          <Form.Label className="mt-1" htmlFor="supplier">
            Remarks :
          </Form.Label>
          <Form.Control
            onChange={(event) => {
              setRemarks(event.target.value)
            }}
            className="w-75"
            type="text"
            id="drno"
            placeholder="Remarks"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-responsive">
        <BootstrapTable
          defaultSorted={defaultSorted}
          keyField="No."
          data={deldata}
          columns={column}
          pagination={paginationFactory()}
          hover={true}
        ></BootstrapTable>
      </div>
    </div>
  )
}

export default Delivery

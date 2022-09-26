import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Axios from 'axios'
import DataTable from 'react-data-table-component'
import swal from 'sweetalert'
import { setRef } from '@mui/material'

function Pouredmaterials() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show2, setShow2] = useState(false)

  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)
  const [mats, setMats] = useState([])
  const [type, selectType] = useState('')
  const [type2, setType2] = useState('')
  const [repro, setRepro] = useState([])
  const [datas, setDatas] = useState({ date: '', quantity: 0 })
  const [poured, setPoured] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [micros, setMicros] = useState([])
  const [packaging, setPackaging] = useState([])

  useEffect(() => {
    async function get() {
      let mount = true
      await Axios.get(
        'http://192.168.1.100:5006/Ubua80poBcH8AeMxqtUIlBYqE2S7n9CX8Thnbd9R70GmpPVZ69nrjvyDA5gJOvsS3c6KULorOqmA7hRJUa2dKNSa4v0XMiYF887Td8FlkSOHrHRLCAFEMxEJCUhjI8HI',
      ).then((res) => {
        if (mount) {
          setMats(res.data)
          console.log('macros updated')
        }
      })
      return () => {
        mount = false
      }
    }
    get()
  }, [refresh])

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
  }, [refresh])

  useEffect(() => {
    let subscribe = true
    Axios.get('http://192.168.1.100:5006/pouring').then((res) => {
      if (subscribe) {
        setPoured(res.data)
        console.log('Pouring report updated')
      }
    })

    return () => {
      subscribe = false
    }
  }, [mats, micros, repro])

  useEffect(() => {
    let subscribe = true
    Axios.get(
      'http://192.168.1.100:5006/kqeA9XnmTgU1CUMnONapgDfHxpI51VBBy3USKsXrLO42UbwfKJMXRvxz6WeyQQ21tcBtywicaKXucH0jyVlNj236orKjp9Guu6yNfgGgUftG4i2dv4piPDKSMaiU1lLY',
    ).then((res) => {
      if (subscribe) {
        setRepro(res.data)
      }
    })
    return () => {
      subscribe = false
    }
  }, [refresh])

  useEffect(() => {
    let subscribe = true
    Axios.get('http://192.168.1.100:8011/api/warehouse/getpackaging').then((res) => {
      if (subscribe) {
        setPackaging(res.data)
      }
    })
    return () => {
      subscribe = false
    }
  }, [refresh])
  const filteredmacro = mats.find((newval) => {
    return newval.rawmat_name === type2
  })
  const filteredmicro = micros.find((newval) => {
    return newval.micro_name === type2
  })
  const filteredrepro = repro.find((newval) => {
    return newval.Product_name === type2
  })
  const filteredpackaging = packaging.find((newval) => {
    return newval.packaging_name === type2
  })

  const Navigate = useNavigate()
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
  function resetStates() {
    selectType('')
    setType2('')
    setDatas({ date: '', quantity: 0 })
  }
  //function in inserting and updating the table
  function addPoured() {
    Axios.post('http://192.168.1.100:5006/insertpouring', {
      date: datas.date,
      matname: type2,
      quantity: parseFloat(datas.quantity, 10),
    }).then((rex) => {
      setRefresh(!refresh)
    })
  }
  //function in add Pending Macro by releasing Macro from warehouse
  async function addPendingMacro() {
    await Axios.post(
      'http://192.168.1.100:8011/api/addpendingmacroaEe3eC2ux71OuUnMNuCxwMExURmAOtWIufmV1r2HI48yRzRJk',
      {
        macroName: type2,
        quantity: parseInt(filteredmacro.bin_content, 10) + parseInt(datas.quantity, 10),
      },
    ).then((res) => {
      setRefresh(!refresh)
    })
  }

  async function addPendingRepro() {
    await Axios.post(
      'http://192.168.1.100:8011/api/addpendingreproAhnNrt2ohV1lHyXRahxsQFAzmmz2jGT7tl3nIlSmwgKsaYF1S',
      {
        productName: type2,
        quantity: parseFloat(filteredrepro.bin_content, 10) + parseFloat(datas.quantity, 10),
      },
    )
  }

  //function that update the Macro,Micro,Packaging,Repro in Repros after Released
  async function update() {
    if (type === 'micro') {
      if (datas.date.length === 0 || datas.quantity.length === 0) {
        swal('Error!', 'Validate Fields!', 'error')
      } else {
        const difference =
          parseFloat(filteredmicro.current_stocks, 10) - parseFloat(datas.quantity, 10)
        await Axios.post(
          'http://192.168.1.100:8011/api/subtractmicrox0RUyYYgH4ReJaNCyCyz9Ie5p2sTvT45Ho1hMV5ML0A2lLeJ58J',
          {
            microName: type2,
            difference: difference,
          },
        ).then(async (rex) => {
          //Function in adding pending materials after releasing from warehouse
          const difference = parseFloat(filteredmicro.pending, 10) + parseFloat(datas.quantity, 10)
          await Axios.post(
            'http://192.168.1.100:8011/api/addpendingmicrofP5uesr2FS7OEATkqbsmajDQjWBewQTrlWcjP4Mi3nqfDyeY3',
            {
              microName: type2,
              quantitymicro: difference,
            },
          ).then((res) => {
            setRefresh(!refresh)
          })
        })
        addPoured()
        handleClose2()
        resetStates()
      }
    }
    if (type === 'macro') {
      if (datas.date.length === 0 || datas.quantity.length === 0) {
        swal('Error!', 'Validate Fields!', 'error')
      } else {
        const difference = parseInt(filteredmacro.current_stocks, 10) - parseInt(datas.quantity, 10)

        await Axios.post('http://192.168.1.100:5006/updatemacropouring', {
          macroname: type2,
          difference: difference,
        }).then(async (rex) => {
          //Function that add pending Macros after release from warehouse
          await Axios.post(
            'http://192.168.1.100:8011/api/addpendingmacroaEe3eC2ux71OuUnMNuCxwMExURmAOtWIufmV1r2HI48yRzRJk',
            {
              macroName: type2,
              quantity: parseInt(filteredmacro.bin_content, 10) + parseInt(datas.quantity, 10),
            },
          ).then((res) => {
            setRefresh(!refresh)
          })
        })
        addPoured()
        handleClose2()
        resetStates()
      }
    }
    if (type === 'repro') {
      if (datas.date.length === 0 || datas.quantity.length === 0) {
        swal('Error!', 'Validate Fields!', 'error')
      } else {
        const difference = parseInt(filteredrepro.repros, 10) - parseInt(datas.quantity, 10)
        await Axios.post(
          'http://192.168.1.100:8011/api/updaterepro7xKKroOjuSJrQpay8JHEHgEAFGvenEZh5EH6OsksfRVgxVS6BD3Hf',
          {
            productName: type2,
            difference: difference,
          },
        ).then(async () => {
          await Axios.post(
            'http://192.168.1.100:8011/api/addrepropendingh3JuRHomzUrF4MQ1oWUkXBGGxK0JwmC4QZCkBxEq98qGOetiQ',
            {
              reproName: type2,
              quantity: parseInt(filteredrepro.bin_content, 10) + parseInt(datas.quantity, 10),
            },
          ).then(() => {
            setRefresh(!refresh)
          })
        })
        addPoured()
        handleClose2()
        resetStates()
      }
    }
    if (type === 'packaging') {
      if (datas.date.length === 0 || datas.quantity.length === 0) {
        swal('Error!', 'Validate Fields!', 'error')
      } else {
        const newquantity =
          parseInt(filteredpackaging.current_stocks, 10) - parseInt(datas.quantity, 10)
        await Axios.post(
          'http://192.168.1.100:8011/api/subtractpackagingweaAI0yvEnn7rCLTIfqLRICqgfjNRd0D6vmquTbxsC9JN06',
          {
            packagingName: type2,
            quantity: newquantity,
          },
        ).then(() => {
          setRefresh(!refresh)
        })
        addPoured()
        handleClose2()
        resetStates()
      }
    }
  }
  const column = [
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Material',
      selector: (row) => row.name,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
    },
  ]

  function handleExport() {}
  return (
    <div>
      <div align="right">
        <Button className="mb-3" onClick={handleShow}>
          Release Material
        </Button>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Release Material</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select
              onChange={(event) => {
                selectType(event.target.value)
              }}
              aria-label="Default select example"
              className="w-50"
            >
              <option value="error">Select type</option>
              <option value="macro">Macro</option>
              <option value="micro">Micro</option>
              <option value="repro">Re-Process</option>
              <option value="packaging">Packaging</option>
            </Form.Select>

            <Form.Select
              onChange={(event) => {
                setType2(event.target.value)
              }}
              className="mt-2 w-50"
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              {type === 'macro' &&
                mats.map((val, key) => {
                  return (
                    <option key={key} value={val.rawmat_name}>
                      {val.rawmat_name}
                    </option>
                  )
                })}
              {type === 'repro' &&
                repro.map((val, key) => {
                  return <option key={key}>{val.Product_name}</option>
                })}
              {type === 'micro' &&
                micros.map((values, key) => {
                  return (
                    <option key={key} value={values.micro_name}>
                      {values.micro_name}
                    </option>
                  )
                })}
              {type === 'packaging' &&
                packaging.map((val, index) => {
                  return (
                    <option key={index} val={val.packaging_name}>
                      {val.packaging_name}
                    </option>
                  )
                })}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (type2.length === 0) {
                  swal('Error', 'Please select material!', 'error')
                } else {
                  handleClose()
                  handleShow2()
                }
              }}
              variant="primary"
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>
        {/*******************************SECOND MODAL*******************************************/}
        <Modal show={show2} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              Release Material : {type2}
              {filteredmacro && <h6>Current WH Stocks: {filteredmacro.current_stocks}</h6>}
              {filteredmicro && <h6>Current WH Stocks: {filteredmicro.current_stocks}</h6>}
              {filteredrepro && <h6>Current WH Stocks: {filteredrepro.repros}</h6>}
              <br></br>
            </Modal.Title>
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
            ></input>{' '}
            <Form.Control
              onChange={(event) => {
                setDatas((prevState) => ({
                  ...prevState,
                  quantity: event.target.value,
                }))
              }}
              type="number"
              placeholder="Quantity"
              className="w-50 mt-2"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button onClick={update} variant="primary">
              Post
            </Button>
          </Modal.Footer>
        </Modal>
        <DataTable
          pagination={true}
          customStyles={customStyles}
          data={poured}
          columns={column}
        ></DataTable>
      </div>
    </div>
  )
}

export default Pouredmaterials

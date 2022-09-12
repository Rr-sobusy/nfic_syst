import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios'

function Storagebins() {
  const [repros, setRepros] = useState([])
  const [macros, setMacros] = useState([])
  useEffect(() => {
    Axios.get(
      'http://192.168.1.100:5006/kqeA9XnmTgU1CUMnONapgDfHxpI51VBBy3USKsXrLO42UbwfKJMXRvxz6WeyQQ21tcBtywicaKXucH0jyVlNj236orKjp9Guu6yNfgGgUftG4i2dv4piPDKSMaiU1lLY',
    ).then((res) => {
      setRepros(res.data)
    })
  }, [])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      Axios.get(
        'http://192.168.1.100:5006/Ubua80poBcH8AeMxqtUIlBYqE2S7n9CX8Thnbd9R70GmpPVZ69nrjvyDA5gJOvsS3c6KULorOqmA7hRJUa2dKNSa4v0XMiYF887Td8FlkSOHrHRLCAFEMxEJCUhjI8HI',
      ).then((res) => {
        setMacros(res.data)
        console.log('materials mounted')
      })
    }
    return () => {
      mounted = false
    }
  }, [])
  const column1 = [
    {
      name: 'Material Name',
      selector: (row) => row.rawmat_name,
    },
    {
      name: 'Bin expected Content',
      selector: (row) => row.bin_content,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
            <Button variant="danger">Reset</Button>
          </div>
        )
      },
    },
  ]
  const column2 = [
    {
      name: 'Material Name',
      selector: (row) => row.Product_name,
    },
    {
      name: 'Bin expected content',
      selector: (row) => row.bin_content,
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div>
            <Button variant="danger">Reset</Button>
          </div>
        )
      },
    },
  ]
  return (
    <div>
      <Container className="mt-4">
        <Row>
          <Col>
            <DataTable data={macros} title="Macro bins" columns={column1}></DataTable>
          </Col>
          <Col>
            <DataTable data={repros} title="Repro bins" columns={column2}></DataTable>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Storagebins

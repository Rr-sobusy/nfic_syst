import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios'
import { Context } from 'src/App'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCart,
  cilUserFollow,
  cilBellExclamation,
  cilDollar,
  cibOpsgenie,
  cibAppStore,
  cilWarning,
} from '@coreui/icons'
import { cilSettings } from '@coreui/icons'

function Dashboardcont() {
  const [critmacro, setCritmacro] = useState([])
  const [critmicro, setCritmicro] = useState([])
  const [critpackaging, setCritpackaging] = useState([])
  const [totalproducts, setTotalProducts] = useState([])
  const [totalcustomers, setTotalCustomers] = useState([])
  const [totalsuppliers, setTotalSuppliers] = useState([])

  const sample = React.useContext(Context)
  const API = sample.API_URi

  useEffect(() => {
    Axios.get(`${API}/api/countcriticalmacros`).then((response) => {
      setCritmacro(response.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`${API}/api/countcriticalmicros`).then((response) => {
      setCritmicro(response.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`${API}/api/countcriticalpackagings`).then((response) => {
      setCritpackaging(response.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`${API}/api/counttotalproducts`).then((response) => {
      setTotalProducts(response.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`${API}/api/counttotalcustomers`).then((response) => {
      setTotalCustomers(response.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`${API}/api/counttotalsuppliers`).then((response) => {
      setTotalSuppliers(response.data)
    })
  }, [])
  return (
    <div>
      <Container style={{ padding: '20px' }}>
        <Row>
          <CCardGroup>
            <CWidgetStatsC
              icon={<CIcon icon={cilCart} height={45} />}
              value={totalproducts.length === 0 ? 'retrieving data...' : totalproducts[0].count}
              title="Total Products"
              progress={{ color: 'success', value: 100 }}
            />

            <CWidgetStatsC
              icon={<CIcon icon={cibOpsgenie} height={45} />}
              value={totalcustomers.length === 0 ? 'retrieving data...' : totalcustomers[0].count}
              title="Total Customers"
              progress={{ color: 'success', value: 100 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cibAppStore} height={45} />}
              value={totalsuppliers.length === 0 ? 'retrieving data...' : totalsuppliers[0].count}
              title="Total Suppliers"
              progress={{ color: 'success', value: 100 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilDollar} height={45} />}
              value="0"
              title="Sales this month"
              progress={{ color: 'success', value: 100 }}
            />
          </CCardGroup>
        </Row>
        <Row
          className="mt-4
        "
        >
          <CCardGroup className="mt-4">
            <CWidgetStatsF
              height="200px"
              className="mb-3"
              icon={<CIcon width={24} icon={cilWarning} size="xl" />}
              title="Critical Macros"
              value={critmacro.length === 0 ? 'Retrieving data' : critmacro[0].count}
              color="danger"
            />
            <CWidgetStatsF
              height="200px"
              className="mb-3"
              icon={<CIcon width={24} icon={cilWarning} size="xl" />}
              title="Critical Micros"
              value={critmicro.length === 0 ? 'Retrieving data' : critmicro[0].count}
              color="danger"
            />
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                height="200px"
                className="mb-3"
                icon={<CIcon width={24} icon={cilWarning} size="xl" />}
                title="Critical Packagings"
                value={critpackaging.length === 0 ? 'Retrieving data' : critpackaging[0].count}
                color="danger"
              />
            </CCol>
          </CCardGroup>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboardcont

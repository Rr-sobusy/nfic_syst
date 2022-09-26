import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
  return (
    <div>
      <Container style={{ padding: '20px' }}>
        <Row>
          <CCardGroup>
            <CWidgetStatsC
              icon={<CIcon icon={cilCart} height={45} />}
              value="0"
              title="Total Products"
              progress={{ color: 'success', value: 100 }}
            />

            <CWidgetStatsC
              icon={<CIcon icon={cibOpsgenie} height={45} />}
              value="0"
              title="Total Customers"
              progress={{ color: 'success', value: 100 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cibAppStore} height={45} />}
              value="0"
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
              value="0"
              color="danger"
            />
            <CWidgetStatsF
              height="200px"
              className="mb-3"
              icon={<CIcon width={24} icon={cilWarning} size="xl" />}
              title="Critical Micros"
              value="0"
              color="danger"
            />
            <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsF
                height="200px"
                className="mb-3"
                icon={<CIcon width={24} icon={cilWarning} size="xl" />}
                title="Critical Packagings"
                value="0"
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

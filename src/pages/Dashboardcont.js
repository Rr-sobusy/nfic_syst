import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Dashboardcont() {
  return (
    <div>
      <Container style={{ padding: '20px' }}>
        <Row>
          <Col
            style={{
              height: '200px',
              margin: '0px',
              padding: '30px',
            }}
            sm={4}
          >
            <div style={{ display: 'flex' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <div style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 style={{ paddingLeft: '80px', marginTop: '5px', fontSize: '60px' }}>20</h1>
              </div>
            </div>
            <h5 className="mt-3">Total Products</h5>
          </Col>
          <Col
            style={{
              height: '200px',
              margin: '0px',
              padding: '30px',
            }}
            sm={4}
          >
            <div style={{ display: 'flex' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="currentColor"
                className="bi bi-cash-coin pt-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillrule="evenodd"
                  d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
              </svg>
              <div style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 style={{ paddingLeft: '80px', marginTop: '0px', fontSize: '60px' }}>220</h1>
              </div>
            </div>
            <h5 className="mt-3">Sold this month</h5>
          </Col>
          <Col
            style={{
              height: '200px',
              margin: '0px',
              padding: '30px',
            }}
            sm={4}
          >
            <div style={{ display: 'flex' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="currentColor"
                className="bi bi-exclamation-octagon"
                viewBox="0 0 16 16"
              >
                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <div style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 style={{ paddingLeft: '80px', marginTop: '0px', fontSize: '60px' }}>0</h1>
              </div>
            </div>
            <h5 className="mt-3">Critical Macros</h5>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col style={{ backgroundColor: 'aqua', height: '200px', margin: '0px' }} sm={4}>
            sm=8
          </Col>
          <Col style={{ backgroundColor: 'beige', height: '200px', margin: '0px' }} sm={4}>
            sm=4
          </Col>
          <Col style={{ backgroundColor: 'blue', height: '200px', margin: '0px' }} sm={4}>
            sm=4
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboardcont

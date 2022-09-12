import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Header4navs() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Nav variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link href="/rawmatsection">Macros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/micros">Micros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Packagings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Header4navs

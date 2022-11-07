import React, { useState, useEffect } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import Privateroutes from 'src/Privateroutes'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from 'axios'
import { Context } from 'src/App'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Nav } from 'react-bootstrap'

const Login = () => {
  const Navigate = useNavigate()
  const [uname, setUname] = useState('')
  const [pword, setPword] = useState('')

  const sample = React.useContext(Context)
  const API = sample.API_URi

  useEffect(() => {})
  function unameHandler(e) {
    setUname(e.target.value)
  }
  function passHandler(e) {
    setPword(e.target.value)
  }
  function clickHandler() {
    Axios.post(`${API}/api/authenticateuser`, {
      userName: uname,
      passWord: pword,
    }).then((result) => {
      if (result.data == 'User found') {
        sessionStorage.setItem('user', 'tst')
        Navigate('/dashboardzQJxXquQoempsWszESEZPwoYWlJpk5jPBlY3v6uE1UZJVhbjUHOD3FC')
      } else {
        swal('Unauthorized User!', 'Contact admin for authorization', 'error')
      }
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer sx={{ width: '44%' }}>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={unameHandler}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={passHandler}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={clickHandler}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

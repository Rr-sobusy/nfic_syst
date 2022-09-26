import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilCart,
  cilDollar,
  cilHouse,
  cilTruck,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { BsAlarm, BsSpeedometer } from 'react-icons/bs'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard/-ykkWxlgjPKyO1BTgZnJCmORSvoI7kjXAjkCTUcyke8DMo5AdIoX84',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Warehouse',
    to: '/theme/colors',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'F.G Section',
        to: '/finishedgoods7xXQ7R40fsCaI4Y4Jt7KHzm92Tc41tPVqsFM6s5A2xbtdntu4oo',
      },
      {
        component: CNavGroup,
        name: 'Materials Section',
        to: '/rmlist',
        items: [
          {
            component: CNavItem,
            name: 'Macros',
            to: '/macros/-yCSX09AFLXqMbKb220R3V8mXnOpamF0TTQHi7ICBWRJxiHdQTzqMiI4T',
          },
          {
            component: CNavItem,
            name: 'Micros',
            to: 'micros//-zCGGLbISDsmZttsQraX5YWhNxwUkhJTC5St7AUsatdvTaorj62XEjy5',
          },
          {
            component: CNavItem,
            name: 'Packaging',
            to: '/packagings',
          },
          {
            component: CNavItem,
            name: 'For Reprocess',
            to: '/repros',
          },
        ],
      },

      {
        component: CNavItem,
        name: 'Delivery Receptions',
        to: '/matdelivery/-7fhOgW6r2u0AAN6zYXPwNCGIIrzT5UqdM0sjfYCPNV7MTUrUmD7',
      },
      {
        component: CNavItem,
        name: 'Released Materials',
        to: '/pouredmats-+ivDVJKaBXXW2xt9kJUHXH5SVNeZ3bXPl5lOtSPklGUoVRQUayYAy',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Production',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Production Reports',
        to: '/prodreports/-K7sXW6FzLkUOsW0KTKXUdsxIRzkdbtFVjSwAq679aZxdUzrlmrO',
      },
      {
        component: CNavItem,
        name: 'Daily Output Reports',
        to: '/dailyreports',
      },
      {
        component: CNavItem,
        name: 'Pending Materials',
        to: '/storagebins+=YWXjVtcPA8YMLNqkFyH0bduVFXL8C6XOdU4CwBBGfEs4yKI9O8e',
      },
      {
        component: CNavItem,
        name: 'Consumed Materials',
        to: '/consumed-+/NitxoxUnBUAR94XYxibYW1TywyEL8S7n0gW92yPbbux9bd9I1OvJN',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sales',
    to: '/sales',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sales Statistics',
        to: '/salesstats',
      },
      {
        component: CNavItem,
        name: 'Manage Customers',
        to: '/managecustomers',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Logistics',
    to: '/sales',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inbounding Materials',
        to: '/inbounding',
      },
      {
        component: CNavItem,
        name: 'Manage Suppliers',
        to: '/managesuppliers',
      },
    ],
  },
]

export default _nav

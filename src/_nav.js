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
    to: '/dashboardzQJxXquQoempsWszESEZPwoYWlJpk5jPBlY3v6uE1UZJVhbjUHOD3FC',
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
            to: '/macros1HhcQogFU9k5Obc8CqqDftt41X2MxXbodIOGgQ9PFrQwCnaoPBq0gdnJBh',
          },
          {
            component: CNavItem,
            name: 'Micros',
            to: '/microsMtdlecpoZMVR4T21rVdvOP6kupHzFSBySGEhLAY0gqTZr7h6Qez6YbBgVZ',
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
        to: '/matdeliveryPkV2koC32AgvZtv5owj0ibUQlmIsruYFnTJN8QOFGv5TGYxlNYBXT',
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
        to: '/prodreportsQRBpMUBXgugyW7qjiCslPWWzNUGkaB8AkxrtMx7BuFj8PtCgITM1I',
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
        to: '/consumedmaterialsAfyIQtSTKNl5pv3HByGumIfmcby1CSlrwGGmOsyZw6WRcLf',
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

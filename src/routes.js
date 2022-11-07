import React from 'react'

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))
const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Rawmat = React.lazy(() => import('./pages/Rawmat.js'))
const FG = React.lazy(() => import('./pages/FG.js'))
const Delivery = React.lazy(() => import('./pages/Delivery.js'))
const Cust = React.lazy(() => import('./pages/Manage_cust.js'))
const Supps = React.lazy(() => import('./pages/Manage_suppliers.js'))
const Sales = React.lazy(() => import('./pages/Salesstats.js'))

const Micros = React.lazy(() => import('./pages/Micros.js'))
const Headers = React.lazy(() => import('./pages/pagecomonent/Header4navs.js'))
const Dasboardcont = React.lazy(() => import('./pages/Dashboardcont.js'))
const Production_reps = React.lazy(() => import('./pages/Prodstats.js'))
const Daily_reps = React.lazy(() => import('./pages/Dailyprodreports.js'))
const Pouredmats = React.lazy(() => import('./pages/Pouredmaterials.js'))
const Storagebins = React.lazy(() => import('./pages/Storagebins.js'))
const Packagings = React.lazy(() => import('./pages/Packagings.js'))
const Repros = React.lazy(() => import('./pages/Repro.js'))
const Inbounding = React.lazy(() => import('./pages/Inbounding.js'))
const Consumed = React.lazy(() => import('./pages/Consumed.js'))

const routes = [
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  {
    path: '/macros1HhcQogFU9k5Obc8CqqDftt41X2MxXbodIOGgQ9PFrQwCnaoPBq0gdnJBh',
    name: 'Raw-Materials Section / Macros',
    element: Rawmat,
  },
  {
    path: '/finishedgoods7xXQ7R40fsCaI4Y4Jt7KHzm92Tc41tPVqsFM6s5A2xbtdntu4oo',
    name: 'Finished-Goods Section',
    element: FG,
  },
  {
    path: '/matdeliveryPkV2koC32AgvZtv5owj0ibUQlmIsruYFnTJN8QOFGv5TGYxlNYBXT',
    name: 'Material Delivery Reception',
    element: Delivery,
  },
  { path: '/managecustomers', name: 'Manage Customers', element: Cust },
  { path: '/managesuppliers', name: 'Manage Suppliers', element: Supps },
  { path: '/salesstats', name: 'Sales Statistics', element: Sales },

  {
    path: '/microsMtdlecpoZMVR4T21rVdvOP6kupHzFSBySGEhLAY0gqTZr7h6Qez6YbBgVZ',
    name: 'Raw-Materials Section / Micros',
    element: Micros,
  },
  { path: '/rmlist', name: 'Raw-Materials Section/Micros', element: Headers },
  {
    path: '/dashboardzQJxXquQoempsWszESEZPwoYWlJpk5jPBlY3v6uE1UZJVhbjUHOD3FC',
    name: 'Dashboard',
    element: Dasboardcont,
  },
  {
    path: '/prodreportsQRBpMUBXgugyW7qjiCslPWWzNUGkaB8AkxrtMx7BuFj8PtCgITM1I',
    name: 'Production Reports',
    element: Production_reps,
  },
  { path: '/dailyreports', name: 'Daily Production Report', element: Daily_reps },
  {
    path: '/pouredmats-+ivDVJKaBXXW2xt9kJUHXH5SVNeZ3bXPl5lOtSPklGUoVRQUayYAy',
    name: 'Released Materials',
    element: Pouredmats,
  },
  {
    path: '/storagebins+=YWXjVtcPA8YMLNqkFyH0bduVFXL8C6XOdU4CwBBGfEs4yKI9O8e',
    name: 'Pending Materials',
    element: Storagebins,
  },
  { path: '/packagings', name: 'Raw-Materials Section / Packagings', element: Packagings },
  { path: '/repros', name: 'Raw-Materials Section / Repros', element: Repros },

  { path: '/inbounding', name: 'Inbouding', element: Inbounding },
  {
    path: '/consumedmaterialsAfyIQtSTKNl5pv3HByGumIfmcby1CSlrwGGmOsyZw6WRcLf',
    name: 'Consumed Materials',
    element: Consumed,
  },
]

export default routes

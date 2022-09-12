import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div></div>
      <div className="ms-auto">
        <span className="me-1">Powered by:</span>
        <h6>Nutriscience Feed Innovation Corp. Admin</h6>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

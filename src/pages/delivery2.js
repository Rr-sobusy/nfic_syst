import React, { useState, useEffect } from 'react'

function Delivery() {
  const [deldata, setDeldata] = useState([])
  const [matdata, setMatdata] = useState([])

  return (
    <div className="container" align="right">
      <button className="btn btn-primary mb-4">Addd</button>
      <input type="date"></input>
    </div>
  )
}

export default Delivery

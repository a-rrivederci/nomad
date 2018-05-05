import React from 'react'

// Render an enclosure for a full body page
const FullPage = (props) => (
  <div id={props.id} className="d-flex h-100 flex-column text-dark">
    {props.children}
  </div>
)

export default FullPage

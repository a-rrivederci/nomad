import React from 'react'

const OverButton = (props) => (
  <div id={props.id} className="d-flex align-items-center justify-content-center px-4 py-2 toggle-button">
    {props.children}
  </div>
);

export default OverButton

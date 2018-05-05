import React from 'react'

const Bar = (props) => (
	<nav id={props.id} className="d-flex w-100 px-5 py-3">
		{props.children}
	</nav>
)

// Header template
export const Header = (props) => (
  <Bar id={props.id}>
    {props.children} 
  </Bar>
)

// Footer template
export const Footer = (props) => (
  <Bar id={props.id}>
    <div className="ml-auto">
      {props.children}
    </div>
  </Bar>
)

export default Bar

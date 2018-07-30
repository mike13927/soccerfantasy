
import React from 'react'
import './AddBtn.css'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const AddBtn = props => (
  <button className='add-btn' { ...props }>
    Add
  </button>
)

export default AddBtn

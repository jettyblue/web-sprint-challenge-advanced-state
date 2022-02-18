import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  // const checkForm = () => {
  //   const cansubmit = false;
  //   ('form input[type="text"]').each(function (idx, elem) {
  //     if(elem.value == '') {
  //       cansubmit = true;
  //     }
  //   })
  // }
  const onChange = evt => {
    // const { value } = evt.target
    // props.inputChange(value)
  }

  const onSubmit = evt => {
    evt.preventDefault()

  }

  const disabled = disabled;

  return (


    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={disabled} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)

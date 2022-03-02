import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  // const [disabled, setDisabled] = useState(true);
  const { form } = props

  const onChange = evt => {
    // const { value } = evt.target
    // props.inputChange(value)
    props.inputChange(evt.target.id, evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz({
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer
    })
    props.resetForm()
  }

  const isDisabled = () => {
    if(!form.newQuestion.trim().length > 0
    && !form.newTrueAnswer.trim().length > 0
    && !form.newFalseAnswer.trim().length > 0) {
      return true
    } else {
      return false
    }
  }

  // useEffect(() => {
  //   if(
  //     props.form.newQuestion.trim().length > 1
  //     && props.form.newTrueAnswer.trim().length > 1
  //     && props.form.newFalseAnswer.trim().length > 1) {
  //       setDisabled(false)
  //     } else {
  //       setDisabled(true)
  //     }
  // }, [props.form]);

  // const onChange = evt => {
  //   props.inputChange(evt.target.id, evt.target.value);
  // }

  // const onSubmit = evt => {
  //   evt.preventDefault()
  //   props.postQuiz({
  //     question_text: props.form.newQuestion,
  //     true_answer_test: props.form.newTrueAnswer,
  //     false_answer_text: props.form.newFalseAnswer
  //   })
  //   props.resetForm();
  // }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} />
      <button disabled={isDisabled()} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return { form: state.form }
}

export default connect(mapStateToProps, actionCreators)(Form);

import * as types from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: types.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: types.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer) {
  return { type: types.SET_SELECTED_ANSWER, payload: answer }
}

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(quiz) {
  return { type: types.SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange(input) {  // might be value and payload: value
  return { type: types.INPUT_CHANGE, payload: input }
}

export function resetForm() {
  return { type: types.RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: null })
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        console.log(res);
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch(err => {
        console.error(err);
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quiz, answer) {
  return function (dispatch) {
    // dispatch({ type: types.SET_SELECTED_ANSWER, payload: ______})
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id: quiz.quiz_id, answer_id: answer.answer_id }) // might be just { quiz_id, answer_id }
      .then(res => {
        console.log(res);
        dispatch({ type: types.SET_SELECTED_ANSWER, payload: null })
        dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data.message})
        axios.get('http://localhost:9000/api/quiz/next')
          .then(res => {
            dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data })
          })
      })
      .catch(err => {
        console.error(err);
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(payload, infoMessage) {
  return function (dispatch) {
    // dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data })
    axios.post('http://localhost:9000/api/quiz/new',
      { question_text: payload.newQuestion,
        true_answer_text: payload.newTrueAnswer,
        false_answer_text: payload.newFalseAnswer })
      .then(res => {
        dispatch({ type: types.SET_INFO_MESSAGE, payload: `Congrats: ${infoMessage} is a great question!` })
        dispatch({ type: types.RESET_FORM })
      })
      .catch(err => {
        console.error(err);
      })

    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

import * as types from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export const moveClockwise = (currentlyActive) =>
  ({ type: types.MOVE_CLOCKWISE, payload: currentlyActive })

export const moveCounterClockwise = (currentlyActive) =>
  ({ type: types.MOVE_COUNTERCLOCKWISE, payload: currentlyActive })

export const selectAnswer = (whichAnswer) => {
  ({ type: types.SET_SELECTED_ANSWER, payload: whichAnswer })
}

export const setMessage = (newMessage) => {
  ({ type: types.SET_INFO_MESSAGE, payload: newMessage })
}

export const setQuiz = newQuiz => {
  ({ type: types.SET_QUIZ_INTO_STATE, payload: newQuiz })
}

export const inputChange = (targetName, value) => 
  ({ type: types.INPUT_CHANGE, payload: { targetName: targetName, value: value } })

export const resetForm = () =>
  ({ type: types.RESET_FORM })

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: null })
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
export function postAnswer(answerObj) {
  return function (dispatch) {
    // dispatch({ type: types.SET_SELECTED_ANSWER, payload: answerObj})
    axios.post('http://localhost:9000/api/quiz/answer', answerObj)
      .then(res => {
        console.log(res);
        dispatch({ type: types.SET_SELECTED_ANSWER, payload: null })
        dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data.message})
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
export function postQuiz(newQuiz) {
  return function (dispatch) {
    // dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data })
    axios.post('http://localhost:9000/api/quiz/new', newQuiz)
      .then(res => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
        dispatch(resetForm())
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

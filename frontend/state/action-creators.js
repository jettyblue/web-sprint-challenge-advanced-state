import * as types from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export const moveClockwise = () =>
  ({ type: types.MOVE_CLOCKWISE })

export const moveCounterClockwise = () =>
  ({ type: types.MOVE_COUNTERCLOCKWISE })

export const selectAnswer = (answer) => {
  ({ type: types.SET_SELECTED_ANSWER, payload: answer })
}

export const setMessage = (message) => {
  ({ type: types.SET_INFO_MESSAGE, payload: message })
}

export const setQuiz = quiz => {
  ({ type: types.SET_QUIZ_INTO_STATE, payload: quiz })
}

export const inputChange = (input) => 
  ({ type: types.INPUT_CHANGE, payload: input })

export const resetForm = () =>
  ({ type: types.RESET_FORM })

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
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id: quiz.quiz_id, answer_id: answer.answer_id })
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
export function postQuiz(payload, formMessage) {
  return function (dispatch) {
    // dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data })
    axios.post('http://localhost:9000/api/quiz/new',
      { question_text: payload.newQuestion,
        true_answer_text: payload.newTrueAnswer,
        false_answer_text: payload.newFalseAnswer })
      .then(res => {
        dispatch({ type: types.SET_INFO_MESSAGE, payload: `Congrats: "${formMessage} is a great question!` })
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

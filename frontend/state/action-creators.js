import * as types from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export const moveClockwise = () =>
  ({ type: types.MOVE_CLOCKWISE })

export const moveCounterClockwise = () =>
  ({ type: types.MOVE_COUNTERCLOCKWISE })

export const selectAnswer = id => {
  ({ type: types.SET_SELECTED_ANSWER, payload: id })
}

export const setMessage = () => {
  ({ type: types.SET_INFO_MESSAGE })
}

export const setQuiz = quiz => {
  ({ type: types.SET_QUIZ_INTO_STATE,
    payload: {quiz_id: quiz.quiz_id, question: quiz.question,
      answers: [{answer_id: quiz.answers[0].answer_id, text: quiz.answers[0].text},
      {answer_id: quiz.answers[1].answer_id, text: quiz.answers[1].text}]
    }
  })
}

export const inputChange = (value, inputId) => 
  ({ type: types.INPUT_CHANGE, payload: { value: PictureInPictureWindow.value, inputID: inputId } })

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
export function postAnswer() {
  return function (dispatch) {
    dispatch({ type: types.SET_SELECTED_ANSWER, payload: null})
    axios.post('http://localhost:9000/api/quiz/answer')
      .then(res => {
        console.log(res);
        
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
export function postQuiz() {
  return function (dispatch) {

    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

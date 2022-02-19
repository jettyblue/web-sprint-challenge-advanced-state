import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../state/action-creators';

export function Quiz(props) {
  const { quiz } = props;
  console.log(props);

  useEffect(() => {
    // props.fetchQuiz()
  }, []);
  

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">

              <div className="answer selected">
                A function
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default Quiz;

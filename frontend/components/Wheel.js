import React from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Wheel(props) {
  const { wheel, moveClockwise, moveCounterClockwise } = props;
  console.log(props);
  
  return (
    <div id="wrapper">
      <div id="wheel">
        {
          wheel === 0 ? ( <div className="cog active" style={{ "--i": 0 }}>B</div> )
          : ( <div className="cog" style={{ "--i": 0 }}></div> )
        }
        {
          wheel === 1 ? ( <div className="cog active" style={{ "--i": 1 }}>B</div> )
          : ( <div className="cog" style={{ "--i": 1 }}></div> )
        }
        {
          wheel === 2 ? ( <div className="cog active" style={{ "--i": 2 }}>B</div> )
          : ( <div className="cog" style={{ "--i": 2 }}></div> )
        }
        {
          wheel === 3 ? ( <div className="cog active" style={{ "--i": 3 }}>B</div> )
          : ( <div className="cog" style={{ "--i": 3 }}></div> )          
        }
        {
          wheel === 4 ? ( <div className="cog active" style={{ "--i": 4 }}>B</div> )
          : ( <div className="cog" style={{ "--i": 4 }}></div> )          
        }
        {
          wheel === 5 ? ( <div className="cog active" style={{ "--i": 5 }}>B</div> )
          : ( <div className="cog" style={{ "--i": 5 }}></div> )          
        }
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={moveCounterClockwise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={moveClockwise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, actionCreators)(Wheel);

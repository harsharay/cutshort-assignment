import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import './Stepper.css'

const Stepper = ({pageIndex, pageData, navigateStepper}) => {

    useEffect(() => {
        // success color #664de5
        var styleElem = document.head.appendChild(document.createElement("style"));

        styleElem.innerHTML = `.single-stepper:nth-child(${pageIndex+1})::after {background: #664de5;}`;
        styleElem.innerHTML += `.single-stepper:nth-child(${pageIndex+1})::before {background: #664de5;}`;

    },[pageIndex])
    
    return (
        <div className='stepper-root'>
            {pageData && pageData.map((item, index) => {
                return (
                    <div className={`single-stepper ${pageIndex >= index ? 'stepper-completed' : 'stepper-pending'}`} 
                    key={index}>
                        <p>{index+1}</p>
                    </div>
                )
            })}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        navigateStepper: data => dispatch({type:'NAVIGATE_STEPPER', payload: data}),
    }
}

export default connect(null, mapDispatchToProps)(Stepper);
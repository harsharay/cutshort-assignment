import React, {useEffect} from 'react'
import './Stepper.css'

const Stepper = ({pageIndex, pageData}) => {

    useEffect(() => {
        // success color #664de5
        console.log('current Page is ', pageIndex);

        var styleElem = document.head.appendChild(document.createElement("style"));

        styleElem.innerHTML = `.single-stepper:nth-child(${pageIndex+1})::after {background: #664de5;}`;
        styleElem.innerHTML += `.single-stepper:nth-child(${pageIndex+1})::before {background: #664de5;}`;
    },[pageIndex])
    
    return (
        <div className='stepper-root'>
            {pageData && pageData.map((item, index) => {
                return (
                    <div className="single-stepper">
                        <p>{index+1}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Stepper;
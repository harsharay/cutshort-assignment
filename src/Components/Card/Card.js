import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { StyledInput, StyledLabel, StyledButton, StyledCardHeader, StyledSubHeader } from '../../StyledComponents/styledComponents';
import "./Card.css"

const Card = ({data, pageIndex, changeCurrentPageToShow, addInputDataToRedux, allPagesInputData, addSingleCardData}) => {
    console.log('pageIndexcheck', pageIndex)

    const {heading, subHeading, inputData, buttonText} = data;

    const [formData, setFormData] = useState({});

    useEffect(() => {
            const inputNamesData = [];
            const cardName= `card${pageIndex}`

            for(let i=0;i<inputData.length;i++) {
                inputNamesData.push({
                    name: inputData[i].name,
                    value: ''
                })
            }
            addInputDataToRedux({[cardName]: inputNamesData});
    },[inputData, pageIndex]);

    useEffect(() => {
        console.log('tobef', allPagesInputData)
        if(Object.keys(allPagesInputData).length > 0) {
                const cardToBeSearched = `card${pageIndex}`
                const finalObject = {}
                if(allPagesInputData[cardToBeSearched] !== undefined) {
                    allPagesInputData[cardToBeSearched].forEach(item => {
                        return (
                            finalObject[item.name] = item.value
                        )
                    })
                }
                setFormData(finalObject)
        }
    }, [pageIndex, allPagesInputData])

    const handleFormInputChange = (e) => {
        const localAllInputData = JSON.parse(JSON.stringify(allPagesInputData))
        const currentCard = `card${pageIndex}`
        const inputVal = e.target.value
        const inputName = e.target.name
        
        for(let i=0;i<localAllInputData[currentCard].length;i++) {
            if(localAllInputData[currentCard][i].name === inputName) {
                localAllInputData[currentCard][i].value = inputVal
            }
        }

        addSingleCardData({key: currentCard, values: localAllInputData[currentCard] })
    }

    const handleButtonClick = () => {
        if(Object.keys(formData).length === 0) {
            alert('please add data');
            return null;
        }

        if(Object.keys(formData).length > 0) {
            for(let key in formData) {
                if(Object.keys(formData).length < inputData.length || formData[key] === undefined || formData[key] === '') {
                    alert('please fill all the fields');
                    return null;
                }
            }
        }

        changeCurrentPageToShow();
    }

    return (
        <div className="card-root">
            {/* Heading  */}
            {heading && <StyledCardHeader>{heading}</StyledCardHeader>}
            {/* Sub heading */}
            {subHeading && <StyledSubHeader>{subHeading}</StyledSubHeader>}
            {/* Input */}
            <div className="card-input">
                {inputData && inputData.length > 0 && inputData.map((input, index) => {
                    return (
                        <div style={{width:'fit-content', marginTop: '20px',}} key={index}>
                            <StyledLabel htmlFor={input.name}>{input.label}</StyledLabel>
                            <StyledInput 
                                type={input.type}
                                name={input.name}
                                id={input.name}
                                placeholder={input.placeholder}
                                required={input.mandatory}
                                value={formData[input.name]}
                                onChange={handleFormInputChange}
                            />
                        </div>
                    )
                })}
                {buttonText && <StyledButton onClick={handleButtonClick}>{buttonText}</StyledButton>}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        allPagesInputData: state.allPagesInputData 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeCurrentPageToShow: () => dispatch({type:'CHANGE_CURRENT_PAGE'}),
        addInputDataToRedux: data => dispatch({type:'ADD_INPUT_PAGE_DATA', payload: data}),
        addSingleCardData: data => dispatch({type:'ADD_SINGLE_CARD_INPUT', payload: {key: data.key , values: data.values}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
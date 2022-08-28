import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { StyledInput, StyledLabel, StyledButton, StyledCardHeader, StyledSubHeader, StyledUserTab } from '../../StyledComponents/styledComponents';
import {FaCheck, FaUser, FaUsers} from 'react-icons/fa'
import "./Card.css"

const Card = ({data, pageIndex, changeCurrentPageToShow, addInputDataToRedux, allPagesInputData, addSingleCardData, allData}) => {

    const {heading, subHeading, inputData, buttonText, tabsData, success} = data;
    const [formData, setFormData] = useState({});
    const [selectedTab, setSelectedTab] = useState({});
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

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
        if(Object.keys(allPagesInputData).length > 0) {
                const cardToBeSearched = `card${pageIndex}`
                const finalObject = {}
                if(allPagesInputData[cardToBeSearched] !== undefined && allPagesInputData[cardToBeSearched].length > 0) {
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
        const isMandatoryObject = {}

        for(let i=0;i<inputData.length;i++){
            if(!isMandatoryObject[inputData[i].name]) {
                isMandatoryObject[inputData[i].name] = inputData[i].mandatory
            }
        }

        if(Object.keys(formData).length > 0) {
            for(let key in formData) {
                console.log('mancheck', isMandatoryObject, key)
                if(isMandatoryObject[key] && (Object.keys(formData).length < inputData.length || formData[key] === undefined || formData[key] === '')) {
                    alert('please fill all the fields');
                    return null;
                }
            }
        }

        if(pageIndex === allData.length-1) {
            alert("Success, onboarded")
            return null;
        }
        changeCurrentPageToShow();
    }

    const handleUserTabClick = (tab, index) => {
        const cardName = `card${pageIndex}`
        setSelectedTabIndex(index);
        setSelectedTab(tab);
        addInputDataToRedux({[cardName]: {
            tabIndex: index,
            tabData: {...tab}
        }});
    }

    return (
        <div className="card-root">
            {success && <div className='success'><FaCheck/></div>}
            {/* Heading  */}
            {heading && <StyledCardHeader>{heading}</StyledCardHeader>}
            {/* Sub heading */}
            {subHeading && <StyledSubHeader>{subHeading}</StyledSubHeader>}
            {/* Input */}
            <div className="card-input">
                {inputData && inputData.length > 0 && inputData.map((input, index) => {
                    return (
                        <div style={{width:'fit-content', marginTop: '20px',}} key={index}>
                            <StyledLabel htmlFor={input.name}>{input.label}{!input.mandatory && <span>(optional)</span>}</StyledLabel>
                            <div className='input-and-prefix'>
                                {input.prefixText && <span className='prefix'>{input.prefixText}</span>}
                                <StyledInput 
                                    type={input.type}
                                    name={input.name}
                                    id={input.name}
                                    placeholder={input.placeholder}
                                    required={input.mandatory}
                                    value={formData[input.name]}
                                    onChange={handleFormInputChange}
                                    className="card-field"
                                />
                            </div>
                        </div>
                    )
                })}

                {tabsData && <div className='flex-row-sb-c'>
                    {tabsData.length > 0 && tabsData.map((tab, index) => {
                        return (
                            <StyledUserTab onClick={() => handleUserTabClick(tab, index)} className={`single-tab ${selectedTabIndex === index ? 'selected-tab' : 'unselected-tab'}`}>
                                {tab.id === 1 ? <FaUsers /> : <FaUser />}
                                <p className='tabHeading'>{tab.tabHeading}</p>
                                <p>{tab.tabContent}</p>
                            </StyledUserTab>
                        )
                    })}
                </div>}
                {buttonText && <StyledButton onClick={handleButtonClick} className="submit-button">{buttonText}</StyledButton>}
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
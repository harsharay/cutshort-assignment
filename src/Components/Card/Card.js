import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { StyledButton, StyledCardHeader, StyledSubHeader, } from '../../StyledComponents/styledComponents';
import {FaCheck} from 'react-icons/fa'
import "./Card.css"
import InputForms from '../InputForms/InputForms';
import Tabs from '../Tabs/Tabs';

const Card = ({data, pageIndex, changeCurrentPageToShow, addInputDataToRedux, allPagesInputData, addSingleCardData, allData, addUserData, userData}) => {

    const {heading, subHeading, inputData, buttonText, tabsData, success, type} = data;
    const [formData, setFormData] = useState({}); // Form data is the localcopy of the respective card's data in redux store
    const [selectedTab, setSelectedTab] = useState({});
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // Creating card's data with the respective keys and storing into the redux state
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

    // Selecting the currentCard data and storing it into the formData to use in the inputs
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

    // Setting initial value for the user tabs in the third card
    useEffect(() => {
        if(tabsData && tabsData.length > 0) {
            handleUserTabClick(0);
        }
    },[tabsData])

    // Storing the changed input into the redux store
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

        addSingleCardData({key: currentCard, values: localAllInputData[currentCard] }) //addSingleCardData method is to store the particular key's value in the redux store
    }

    // Clicking the button on the bottom of the card
    const handleButtonClick = () => {
        // Creating a temp object to store if the input fields inside the card are mandatory, to be checked below
        const isMandatoryObject = {}

        for(let i=0;i<inputData.length;i++){
            if(!isMandatoryObject[inputData[i].name]) {
                isMandatoryObject[inputData[i].name] = inputData[i].mandatory
            }
        }

        // Checking if the fields are mandatory
        if(Object.keys(formData).length > 0) {
            for(let key in formData) {
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
        addUserData(formData); // Storing user's data in redux store to display it later
        changeCurrentPageToShow(); // After submitting, the new page will display based on the index
    }

    // Clicking on tabs in card3
    const handleUserTabClick = index => {
        const cardName = `card${pageIndex}`
        setSelectedTabIndex(index);
        const allTabData = JSON.parse(JSON.stringify(tabsData))
        setSelectedTab(allTabData[index]);
        addInputDataToRedux({[cardName]: allTabData[index]});
    }

    return (
        <div className="card-root">
            {type !== 'form' && <>{success && <div className='success'><FaCheck/></div>}</>}
            {/* Heading  */}
            {heading && <StyledCardHeader>{heading} {success && <span>{userData.displayName}!</span>}</StyledCardHeader>}
            {/* Sub heading */}
            {subHeading && <StyledSubHeader>{subHeading}</StyledSubHeader>}
            {/* Input */}
            <div className="card-input">
                {type === 'form' && 
                    <>
                        {inputData && inputData.length > 0 && inputData.map((input, index) => {
                            return (
                                <InputForms inputData={inputData} input={input} index={index} formData={formData} handleFormInputChange={handleFormInputChange} key={index}/>
                            )
                        })}
                    </>
                }

                {/* Tabs Display */}
                {type !== 'form' && 
                    <>
                        {tabsData && <div className='flex-row-sb-c'>
                            {tabsData.length > 0 && tabsData.map((tab, index) => {
                                return (
                                    <Tabs handleUserTabClick={handleUserTabClick} tab={tab} index={index} selectedTabIndex={selectedTabIndex} key={index}/>
                                )
                            })}
                        </div>}
                    </>
                }
                {/* Button */}
                {buttonText && <StyledButton onClick={handleButtonClick} className="submit-button">{buttonText}</StyledButton>}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        allPagesInputData: state.allPagesInputData,
        userData: state.userData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeCurrentPageToShow: () => dispatch({type:'CHANGE_CURRENT_PAGE'}),
        addInputDataToRedux: data => dispatch({type:'ADD_INPUT_PAGE_DATA', payload: data}),
        addSingleCardData: data => dispatch({type:'ADD_SINGLE_CARD_INPUT', payload: {key: data.key , values: data.values}}),
        addUserData: data => dispatch({type:'ADD_USER_DATA', payload: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
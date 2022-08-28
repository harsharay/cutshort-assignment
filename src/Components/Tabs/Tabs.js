import React from 'react';
import { StyledUserTab } from '../../StyledComponents/styledComponents';
import {FaUser, FaUsers} from 'react-icons/fa';

const Tabs = ({handleUserTabClick, tab, index, selectedTabIndex}) => {

    const SELECTED_BLUE = '#664de5'

    return (
        // Changing the css based on whether the card is selected or not
        <StyledUserTab onClick={() => handleUserTabClick(index)} className={`single-tab ${selectedTabIndex === index ? 'selected-tab' : 'unselected-tab'}`}>
            {/* Checking if the current tab is selected and displaying the selected color */}
            {tab.id === 1 ? <FaUsers color={selectedTabIndex === index ? SELECTED_BLUE : ''} /> : <FaUser color={selectedTabIndex === index ? SELECTED_BLUE : ''}/>}
            <p className='tabHeading'>{tab.tabHeading}</p>
            <p>{tab.tabContent}</p>
        </StyledUserTab>
    )
}

export default Tabs
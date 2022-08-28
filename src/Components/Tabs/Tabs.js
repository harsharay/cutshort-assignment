import React from 'react';
import { StyledUserTab } from '../../StyledComponents/styledComponents';
import {FaUser, FaUsers} from 'react-icons/fa';

const Tabs = ({handleUserTabClick, tab, index, selectedTabIndex}) => {

    const SELECTED_BLUE = '#664de5'

    return (
        <StyledUserTab onClick={() => handleUserTabClick(index)} className={`single-tab ${selectedTabIndex === index ? 'selected-tab' : 'unselected-tab'}`}>
            {tab.id === 1 ? <FaUsers color={selectedTabIndex === index ? SELECTED_BLUE : ''} /> : <FaUser color={selectedTabIndex === index ? SELECTED_BLUE : ''}/>}
            <p className='tabHeading'>{tab.tabHeading}</p>
            <p>{tab.tabContent}</p>
        </StyledUserTab>
    )
}

export default Tabs
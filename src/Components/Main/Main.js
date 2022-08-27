import React, { useState } from 'react'
import {connect} from 'react-redux'
import Card from '../Card/Card'
import './Main.css'

const Main = ({currentPageIndex, allPagesData}) => {
    const [pageData, setPageData] = useState(allPagesData);
    const [currentPageToShow, setCurrentPageToShow] = useState(currentPageIndex)

    React.useEffect(() => {
        if(!isNaN(currentPageIndex)) {
            setCurrentPageToShow(currentPageIndex)
        }
    },[currentPageIndex])

    return (
        <div className="main-component">
            {/* Title component */}
            {/* Stepper component */}
            {/* Card component */}
            {/* {pageData && pageData.length > 0 && pageData.map((page, index) => { */}
                {/* return  */}
                {pageData && <Card data={pageData[currentPageToShow]} pageIndex={currentPageToShow}/>}
            {/* })} */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentPageIndex : state.currentPageIndex,
        allPagesData: state.allPagesData,
    }
}

export default connect(mapStateToProps, null)(Main);
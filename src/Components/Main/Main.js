import React, { useState } from 'react'
import {connect} from 'react-redux'
import Card from '../Card/Card'
import Stepper from '../Stepper/Stepper'
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
            {Object.keys(pageData).length>0 && <Stepper pageIndex={currentPageToShow} pageData={pageData}/>}
            {/* Card component */}
            {/* {pageData && pageData.length > 0 && pageData.map((page, index) => { */}
                {/* return  */}
                {Object.keys(pageData).length > 0 && <Card data={pageData[currentPageToShow]} pageIndex={currentPageToShow}/>}
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
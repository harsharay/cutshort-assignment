import React from 'react';
import styled from 'styled-components';


export const StyledInput = styled.input`
    border: 1px solid #eaeef5;
    padding: 15px;
    border-radius: 5px;
    color: #151b28;
    width: 400px;
`

export const StyledLabel = styled.label`
    color: #364259;
    display: block;
    width: fit-content;
    margin-bottom: 10px;
    font-size: 14px;

    & span {
        color: #b8c2d6;
        margin-left: 5px;
    }
`

export const StyledButton = styled.button`
    width: 430px;
    background-color: #664de5;
    color: #ffffff;
    padding: 15px;
    margin-top: 25px;
    outline: none;
    border: 0;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
`

export const StyledCardHeader = styled.h1`
    color: #151b28; 
    margin-bottom: 0;
`

export const StyledSubHeader = styled.p`
    font-size: 16px;
    color: #707c93;
`

export const StyledUserTab = styled.div`
    width: 130px;
    height: 130px;
    padding: 20px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    text-align: left;
    border-radius: 5px;
    margin: 0 20px;
    cursor: pointer;

    & p {
        font-size: 12px;
        font-weight: 200;
    }

    & .tabHeading {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 0;
    }
`
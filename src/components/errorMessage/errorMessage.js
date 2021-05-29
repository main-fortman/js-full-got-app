import React from 'react';
import styled from 'styled-components';

const ErrorDiv = styled.div`
    color: red;
    img {
        width: 100%;
    }
`

export default function ErrorMessage() {
    return (
        <ErrorDiv>
            <img 
                src={process.env.PUBLIC_URL + "/img/error.jpg"}
                alt='error'/>
            <span>Something goes wrong</span>
        </ErrorDiv>
    )
}
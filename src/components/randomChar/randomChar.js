import React, {Component, useEffect, useState} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
        overflow-wrap: break-word;
    }
`;

const Term = styled.span`
    font-weight: bold;
`;

export default function RandomChar() {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const gotService = new GotService();
    let timerId;

    useEffect(() => {
        updateCaracter();
        timerId = setInterval(updateCaracter, 5000);
        return () => {
            clearInterval(timerId);
        }
    }, []);

    function onCharLoaded(char) {
        setChar(char);
        setLoading(false);
    }

    function onError(error) {
        console.log(error);
        setError(true);
        setLoading(false);
    }

    function updateCaracter() {
        console.log('update random char');
        const id = Math.floor(Math.random() * 140 + 25); // 25-140
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    return (
        <RandomBlock className="rounded">
            {loading ? 
                <Spinner/> : 
                error ? 
                    <ErrorMessage/> : 
                    <View char={char}/>
            }
        </RandomBlock>
    )
}

const View = ({char:{name, gender, born, died, culture}}) => {
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
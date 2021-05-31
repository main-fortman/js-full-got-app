import React, {Component, useEffect, useState} from 'react';
import './itemDetails.css';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ItemDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default function ItemDetails({itemId, getData, children}) {

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateItem();
    }, [itemId]);

    function updateItem() {
        if (!itemId) {
            return;
        }

        setLoading(true);

        getData(itemId)
            .then(item => {
                setItem(item);
                setLoading(false);
                setError(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
                setError(true);
            });

        // this.foo.bar.type = 0;
    }

    if (error) {
        return <ErrorMessage/>;
    }

    if (!item) {
        return <span className='select-error'>Please select a item</span>;
    }

    if (loading) {
        return <Spinner/>;
    }

    return (
        <ItemDetailsDiv className="rounded">
            <h4>{item.name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, child => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </ItemDetailsDiv>
    );
}
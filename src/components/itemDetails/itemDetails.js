import React, {Component} from 'react';
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

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    gotService = new GotService();

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({loading: true});

        getData(itemId)
            .then(item => this.setState({item, loading: false, error: false}))
            .catch(e => {
                console.log(e);
                this.setState({error: true, loading: false});
            });

        // this.foo.bar.type = 0;
    }

    render() {

        const {item, loading, error} = this.state;

        if (error) {
            return <ErrorMessage/>;
        }

        if (!item) {
            return <span className='select-error'>Please select a item</span>;
        }

        if (loading) {
            return <Spinner/>;
        }


        const {name} = item;

        return (
            <ItemDetailsDiv className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, child => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </ItemDetailsDiv>
        );
    }
}
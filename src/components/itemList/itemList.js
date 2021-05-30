import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

export default class ItemList extends Component {

    state = {
        items: null,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    componentDidMount() {

        const {getData} = this.props;

        getData()
            .then(items => this.setState({items}))
            .catch(e => this.setState({error: true}));
    }

    renderItems(items) {
        
        return items.map((item, index) => {
            return (
                <li 
                    key={item.id}
                     className="list-group-item"
                     onClick={() => this.props.onItemSelected(item.id)}
                >
                    {this.props.renderItem(item)}
                </li>
            )
        })
    }

    render() {
        const {items, error} = this.state;

        if (error) {
            return <ErrorMessage/>;
        }

        if (!items) {
            return <Spinner/>
        }
        return (
            <ul className="item-list list-group">
                {this.renderItems(items)}
            </ul>
        );
    }
}
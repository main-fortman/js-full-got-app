import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

export default class ItemList extends Component {

    state = {
        charList: null,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then(charList => this.setState({charList}))
            .catch(e => this.setState({error: true}));
    }

    renderItems(items) {
        
        return items.map((item, index) => {
            return (
                <li 
                    key={item.id}
                     className="list-group-item"
                     onClick={() => this.props.onCharSelected(item.id)}
                >
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const {charList, error} = this.state;

        if (error) {
            return <ErrorMessage/>;
        }

        if (!charList) {
            return <Spinner/>
        }
        return (
            <ul className="item-list list-group">
                {this.renderItems(charList)}
            </ul>
        );
    }
}
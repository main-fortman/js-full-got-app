import React from 'react';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import ItemList from '../itemList';
import {withRouter} from 'react-router-dom';

class BooksPage extends React.Component {

    state = {
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }
        return (
            <ItemList 
                onItemSelected={itemId => {
                    this.props.history.push(`/books/${itemId}`);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={item => item.name}
            />
        )
    }
}

export default withRouter(BooksPage);
import React from 'react';
import GotService from '../../../services/gotService';
import ItemDetails from '../../itemDetails';
import { Field } from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import ItemList from '../../itemList';
import RowBlock from '../../rowBlock/rowBlock';

export default class BooksPage extends React.Component {

    state = {
        selectedBook: null,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    onItemSelected = id => {
        this.setState({selectedBook: id});
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={item => item.name}
            />
        )

        const bookDetails = (
            <ItemDetails
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook}
            >
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}
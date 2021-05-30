import React from 'react';
import GotService from '../../services/gotService';
import ItemDetails from '../itemDetails';
import { Field } from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import ItemList from '../itemList';
import RowBlock from '../rowBlock/rowBlock';

export default class HousesPage extends React.Component {

    state = {
        selectedHouse: null,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    onItemSelected = id => {
        this.setState({selectedHouse: id});
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={item => item.name}
            />
        )

        const houseDetails = (
            <ItemDetails
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}
            >
                <Field field='words' label='Words'/>
                <Field field='region' label='Region'/>
                <Field field='titles' label='Titles'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={houseDetails}/>
        )
    }
}
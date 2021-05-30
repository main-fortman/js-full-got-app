import React from 'react';
import GotService from '../../services/gotService';
import ItemDetails from '../itemDetails';
import { Field } from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import ItemList from '../itemList';
import RowBlock from '../rowBlock/rowBlock';

export default class CharacterPage extends React.Component {

    state = {
        selectedChar: null,
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    onItemSelected = id => {
        this.setState({selectedChar: id});
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={item => `${item.name} (${item.gender})`}
            />
        )

        const charDetails = (
            <ItemDetails
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}
            >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}
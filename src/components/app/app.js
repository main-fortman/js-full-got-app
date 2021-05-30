import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage/characterPage';
import ItemDetails from '../itemDetails';
import ItemList from '../itemList';
import GotService from '../../services/gotService';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';

export default class App extends React.Component {

    state = {
        showRandomChar: true,
        error: false
    }
   
    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    toggleRandomChar = () => {
        this.setState(state => {
            return {showRandomChar: !state.showRandomChar}
        })
    }


    render() {

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        return  (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button onClick={this.toggleRandomChar}>
                                Toggle random char
                            </Button>
                            {this.state.showRandomChar ? <RandomChar/> : null}
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BooksPage/>
                    <HousesPage/>
                </Container>
            </>
        )
    } 
}
import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage';
import GotService from '../../services/gotService';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BooksItem from '../pages/booksItem';

import './app.css';

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
            <Router>
                <div className='app'> 
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
                        <Switch>
                            <Route path='/' exact>
                                
                            </Route>
                            <Route path='/characters'>
                                <CharacterPage/>
                            </Route>
                            <Route path='/houses'>
                                <HousesPage/>
                            </Route>
                            <Route path='/books' exact>
                                <BooksPage/>
                            </Route>
                            <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BooksItem bookId={id}/>
                                }
                            }/>
                            <Route path='*'>
                                <h1>404</h1>
                            </Route>
                        </Switch>
                    </Container>
                </div>
            </Router>
        )
    } 
}
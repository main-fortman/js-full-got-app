import React, {Component} from 'react';
import './charDetails.css';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const CharDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

export default class CharDetails extends Component {

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    gotService = new GotService();

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.setState({loading: true});

        this.gotService.getCharacter(charId)
            .then(char => this.setState({char, loading: false, error: false}))
            .catch(e => this.setState({error: true, loading: false}));

        // this.foo.bar.type = 0;
    }

    render() {

        const {char, loading, error} = this.state;

        if (error) {
            return <ErrorMessage/>;
        }

        if (!char) {
            return <span className='select-error'>Please select a character</span>;
        }

        if (loading) {
            return <Spinner/>;
        }


        const {name, gender, born, died, culture} = char;

        return (
            <CharDetailsDiv className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </CharDetailsDiv>
        );
    }
}
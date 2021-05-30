export default class GotService {

    #apiBase = 'https://www.anapioficeandfire.com/api';

    #getResource = async url => {
        const res = await fetch(`${this.#apiBase}${url}`);
        if (!res.ok) {
            throw new Error('Error!!! ' + url);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.#getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const res = await this.#getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllBooks = async () => {
        const res = await this.#getResource(`/books`);
        return res.map(this._transformBook);
    }
    
    getBook = async (id) => {
        const book = await this.#getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    
    getAllHouses = async () => {
        const res = await this.#getResource(`/houses`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await this.#getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    isSet(data) {
        return data || 'no-data';
    }    
    
    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        console.log(item);
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        };
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        };
    }
    
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released && new Date(book.released).toDateString())
        };
    }
}
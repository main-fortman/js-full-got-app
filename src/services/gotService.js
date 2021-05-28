export default class GotService {

    #apiBase = 'https://www.anapioficeandfire.com/api';

    async #getResource(url) {
        const res = await fetch(`${this.#apiBase}${url}`);
        if (!res.ok) {
            throw new Error('Error!!! ' + url);
        }
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.#getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    
    async getCharacter(id) {
        const res = await this.#getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllBooks() {
        return this.#getResource('/books');
    }
    
    getAllHouses() {
        return this.#getResource('/houses');
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        };
    }
}
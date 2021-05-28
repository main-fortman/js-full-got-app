export default class GotService {

    #apiBase = 'https://www.anapioficeandfire.com/api';

    async #getResource(url) {
        const res = await fetch(`${this.#apiBase}${url}`);
        if (!res.ok) {
            throw new Error('Error!!! ' + url);
        }
        return await res.json();
    }

    getAllCharacters() {
        return this.#getResource(`/characters?page=5&pageSize=10`);
    }
    
    getCharacter(id) {
        return this.#getResource(`/characters/${id}`);
    }

    getAllBooks() {
        return this.#getResource('/books');
    }
    
    getAllHouses() {
        return this.#getResource('/houses');
    }
}
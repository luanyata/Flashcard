import {getDeckAll, submitDeck} from "../utils/storage";

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';


function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function handleGetDesks() {
    return (dispatch) => {
        return getDeckAll()
            .then(decks => {
                decks = decks === null ? {} : decks;
                dispatch(getDecks(decks))
            })
    }
}

export function handleAddDeck(deck) {
    return (dispatch) => {
        return submitDeck(deck)
            .then(dk => {
                dispatch(addDeck(dk))
            })
    }
}

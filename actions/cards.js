import {getAllCards as allCards} from "../utils/storage";

export const GET_CARD = 'GET_CARD';
export const ADD_CARD = 'ADD_CARD';
export const GET_ALL_CARDS = 'GET_ALL_CARDS';

function getCard(card) {
    return {
        type: GET_CARD,
        card
    }
}

export function addCard(card) {
    return {
        type: ADD_CARD,
        card
    }
}

function getAllCards(cards) {
    return {
        type: GET_ALL_CARDS,
        cards
    }
}

export function handleGetAllCards() {
    return (dispatch) => {
        return allCards()
            .then(cards => {
                dispatch(getAllCards(cards))
            })
    }
}

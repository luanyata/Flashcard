import {GET_DECKS, ADD_DECK, DECK_GET_BY_ID} from "../actions/decks";
import {ADD_CARD} from "../actions/cards";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return action.decks;
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            };

        case ADD_CARD:
            return {
                ...state,
                [action.card.idDeck]: {
                    ...state[action.card.idDeck],
                    cards: state[action.card.idDeck].cards.concat([action.card.id]),
                    countCards: state[action.card.idDeck].cards.length + 1
                }
            };
        case DECK_GET_BY_ID:
            return state[action.idDeck];
        default:
            return state
    }
}


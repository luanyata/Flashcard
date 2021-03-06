import {GET_DECKS, ADD_DECK, UPDATE_ASYNC_STORAGE} from "../actions/decks";
import {ADD_CARD} from "../actions/cards";
import {updateAsyncStorage} from "../utils/storage";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            };

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
        case UPDATE_ASYNC_STORAGE:
            updateAsyncStorage(state);
            return state;
        default:
            return state
    }
}

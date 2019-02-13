import {GET_CARD, ADD_CARD, GET_ALL_CARDS} from "../actions/cards";


export default function (state = {}, action) {
    switch (action.type) {
        case GET_CARD:
        case ADD_CARD:
            return {
                ...state,
                [action.card.id]: {
                    ...action.card
                }
            };
        case GET_ALL_CARDS:
            return action.cards;
        default:
            return state;
    }
}

import {generateUID} from './hash'
import {accentBackground} from "./colors";

export function formatDeck(deck) {

    const id = generateUID();
    const {nameDeck, color, countCards, cards} = deck;

    return {
        key: id,
        id: id,
        nameDeck,
        color: color === '' ? accentBackground : color,
        countCards,
        cards

    }
}

export function formatCard(card, idDeck) {
    const id = generateUID();
    const {question, answer} = card;

    return {
        id,
        idDeck,
        question,
        answer,
        key: id
    }
}

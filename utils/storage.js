import {AsyncStorage} from 'react-native'

const DECKS = 'flashcard:decks';
const CARDS = 'flashcard:cards';

export function submitDeck(deck) {
    const newDeck = {[deck.id]: deck};
    return AsyncStorage.mergeItem(DECKS, JSON.stringify(newDeck))
        .then(() => newDeck);
}

export function submitAllDeck(decks) {
    return AsyncStorage.mergeItem(DECKS, JSON.stringify(decks))
        .then(() => console.log('save ok'))
}

export const getDeckAll = () => {
    //AsyncStorage.clear();
    return AsyncStorage.getItem(DECKS)
        .then(res => JSON.parse(res));
};

export const submitCard = card => {

    const newCard = {[card.id]: card};

    return AsyncStorage.mergeItem(CARDS, JSON.stringify(newCard))
        .then(() => card);
};

export const getAllCards = () => AsyncStorage.getItem(CARDS)
    .then(res => JSON.parse(res));

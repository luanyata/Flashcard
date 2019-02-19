import {AsyncStorage} from 'react-native'

const DECKS = 'flashcard:decks';
const CARDS = 'flashcard:cards';

export function submitDeck(deck) {
    const newDeck = {[deck.id]: deck};
    return AsyncStorage.mergeItem(DECKS, JSON.stringify(newDeck))
        .then(() => newDeck);
}

export const getDeckAll = () => {
    //AsyncStorage.clear();
    return AsyncStorage.getItem(DECKS)
        .then(res => JSON.parse(res));
};

export const submitCard = (card) => {
    const newCard = {[card.id]: card};

    return AsyncStorage.mergeItem(CARDS, JSON.stringify(newCard))
        .then(() => card);
};

export const getAllCards = () => AsyncStorage.getItem(CARDS)
    .then(res => JSON.parse(res));

export const updateAsyncStorage = data => {
    console.log(data, 'update');
    AsyncStorage.setItem(DECKS, JSON.stringify(data))
};

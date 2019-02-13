import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import Decks from "./decks";
import {defaultPrimaryBackground, textPrimary} from '../utils/colors'
import DeckDetail from "./deckDetail";
import CreateNewQuestion from "./createNewQuestion";
import Question from "./question";
import CreateNewDeck from "./createNewDeck";

const StackNav = createStackNavigator({
    Home: {
        screen: Decks,
        navigationOptions: {
            title: 'Desks',
            headerTitleStyle: {
                fontSize: 25,
                color: textPrimary,
            },
            headerStyle: {
                backgroundColor: defaultPrimaryBackground,

            }
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            title: 'Detail',
            headerTitleStyle: {
                fontSize: 25,
                color: textPrimary,
            },
            headerTintColor: textPrimary,
            headerStyle: {
                backgroundColor: defaultPrimaryBackground,

            }
        }
    },
    CreateNewDeck: {
        screen: CreateNewDeck,
        navigationOptions: {
            title: 'Create New Deck',
            headerTitleStyle: {
                fontSize: 20,
                color: textPrimary,
            },
            headerTintColor: textPrimary,
            headerStyle: {
                backgroundColor: defaultPrimaryBackground,

            }
        }
    },
    CreateNewQuestion: {
        screen: CreateNewQuestion,
        navigationOptions: {
            title: 'Create New Question',
            headerTitleStyle: {
                fontSize: 20,
                color: textPrimary,
            },
            headerTintColor: textPrimary,
            headerStyle: {
                backgroundColor: defaultPrimaryBackground,

            }
        }
    },
    Question: {
        screen: Question,
        navigationOptions: {
            title: 'Question',
            headerTitleStyle: {
                fontSize: 20,
                color: textPrimary,
            },
            headerTintColor: textPrimary,
            headerStyle: {
                backgroundColor: defaultPrimaryBackground,

            }
        }
    }
});

export default createAppContainer(StackNav)

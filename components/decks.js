import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {textPrimary, secondaryText, accentBackground} from "../utils/colors";
import {connect} from 'react-redux'
import {handleGetDesks} from "../actions/decks";


function DecksItem({id, nameDeck, countCards = 0, color = accentBackground, navigate}) {
    return (
        <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigate('DeckDetail', {idDeck: id})}>
            <Text
                style={[styles.letter, {backgroundColor: color}]}>{nameDeck}</Text>
            <Text style={styles.countCards}>{countCards} {countCards > 1 ? 'Cards' : 'Card'}</Text>
        </TouchableOpacity>
    )
}

class Decks extends Component {

    componentDidMount() {
        this.props.dispatch(handleGetDesks());
    }

    DeckItem = ({item}) => {
        return <DecksItem {...item} navigate={this.props.navigation.navigate}/>
    };

    render() {
        const {decksArray} = this.props;

        if (decksArray.length <= 0) {
            return (
                <View style={{flex: 1}}>
                    <Text style={styles.welcomeEmpty}>
                        Welcome, it looks like you do not have a registered deck yet, click the button below to
                        create.
                    </Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.navigation.navigate('CreateNewDeck')}>
                        <Text style={styles.labelBtn}>
                            Create New Deck
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnNewDeck}
                                  onPress={() => this.props.navigation.navigate('CreateNewDeck')}>
                    <Text style={styles.btnLabel}>
                        Create new Desk
                    </Text>
                </TouchableOpacity>
                <Text style={styles.welcome}> Welcome... select your category!!!</Text>
                <FlatList
                    data={decksArray}
                    renderItem={this.DeckItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnNewDeck: {
        backgroundColor: accentBackground,
        alignItems: 'center',
        padding: 10,
        marginBottom: 5
    },
    btnLabel: {
        fontSize: 20,
        color: textPrimary
    },
    welcome: {
        fontSize: 20,
        marginBottom: 30,
    },
    welcomeEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
    },
    letter: {
        fontSize: 30,
        color: textPrimary,
        padding: 10
    },
    countCards: {
        color: secondaryText,
        fontSize: 20,
        padding: 15
    },
    btn: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        backgroundColor: accentBackground

    },
    labelBtn: {
        fontSize: 20,
        color: textPrimary
    }
});

function mapStateToProps({decks}) {
    const decksArray = Object.values(decks);
    return {
        decksArray
    }
}

export default connect(mapStateToProps)(Decks);

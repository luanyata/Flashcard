import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import {accentBackground, textPrimary} from '../utils/colors'
import {connect} from 'react-redux'
import {handleGetAllCards} from "../actions/cards";

class DeckDetail extends Component {

    state = {
        bounceValue: new Animated.Value(1)
    };

    componentDidMount() {
        this.props.dispatch(handleGetAllCards());
    }

    render() {

        const {bounceValue} = this.state;

        Animated.sequence([
            Animated.timing(bounceValue, {duration: 1000, toValue: 1.5}),
            Animated.spring(bounceValue, {toValue: 1, friction: 10})
        ]).start();


        const {id, nameDeck, countCards, color = accentBackground} = this.props.deck;


        return (
            <View style={{flex: 1}}>
                <View style={styles.containerTitle}>
                    <Animated.Text
                        style={[styles.title, {transform: [{scale: bounceValue}]}]}>{nameDeck}</Animated.Text>
                    <Animated.Text
                        style={[styles.infoCard, {transform: [{scale: bounceValue}]}]}>{countCards} {countCards > 1 ? 'Cards' : 'Card'}</Animated.Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: color}]}
                        onPress={() => this.props.navigation.navigate('Question')}>
                        <Text style={styles.labelBtn}>Start a Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: color}]}
                        onPress={() => this.props.navigation.navigate('CreateNewQuestion', {idDeck: id})}>
                        <Text style={styles.labelBtn}>Create New Question</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerTitle: {
        marginTop: 100,
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 50
    },
    infoCard: {
        fontSize: 30
    },

    btn: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5

    },
    labelBtn: {
        fontSize: 20,
        color: textPrimary

    }
});

function mapStateToProps({decks}, props) {

    const deck = decks[props.navigation.state.params.idDeck];

    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckDetail);

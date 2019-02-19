import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Picker, StyleSheet} from 'react-native'
import {accentBackground, dividerBorder, textPrimary} from "../utils/colors"
import {formatDeck} from '../utils/format'
import {handleAddDeck} from '../actions/decks'
import {connect} from 'react-redux'

class CreateNewDeck extends Component {

    state = {
        nameDeck: '',
        color: '',
        countCards: 0,
        cards: []
    };

    handleSubmit = () => {
        let deck = formatDeck(this.state);
        this.props.dispatch(handleAddDeck(deck)).then(() => {
            this.props.navigation.navigate('DeckDetail', {idDeck: deck.id});
        });

    };
    handleInputChange = (nameDeck) => {
        this.setState(() => ({nameDeck}))
    };

    render() {

        const {nameDeck, color} = this.state;
        return (
            <View style={{flex: 1}}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input}
                           valeu={nameDeck}
                           onChangeText={this.handleInputChange}/>

                <Text style={styles.label}>Select Color:</Text>
                <Picker
                    selectedValue={color}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({color: itemValue})}>
                    <Picker.Item label="Select" value=""/>
                    <Picker.Item label="Red" value="#d32f2f"/>
                    <Picker.Item label="Yellow" value="#afb42b"/>
                    <Picker.Item label="Blue" value="#448aff"/>
                    <Picker.Item label="Green" value="#009688"/>
                    <Picker.Item label="Brown" value="#795548"/>
                    <Picker.Item label="Orange" value="#ff5722"/>
                </Picker>

                <TouchableOpacity
                    disabled={nameDeck.length === 0}
                    style={styles.btn}
                    onPress={this.handleSubmit}>
                    <Text style={styles.labelBtn}>
                        Create Deck
                    </Text>

                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        margin: 5
    },
    input: {
        borderColor: dividerBorder,
        borderWidth: 1,
        height: 30,
        margin: 5
    },
    btn: {
        alignItems: 'center',
        padding: 10,
        marginTop: 5,
        backgroundColor: accentBackground
    },
    labelBtn: {
        fontSize: 20,
        color: textPrimary,
    }
});


export default connect()(CreateNewDeck)

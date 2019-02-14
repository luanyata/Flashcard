import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

class Score extends Component {

    render() {

        const {hits, total, idDeck, navigation} = this.props;
        const {navigate} = navigation;

        return (
            <View style={{flex: 1}}>
                <Text>Score</Text>
                <Text>{`${hits}/${total}`}</Text>
                <TouchableOpacity onPress={() => navigate('DeckDetail', {idDeck})}>
                    <Text> Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Decks')}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default Score

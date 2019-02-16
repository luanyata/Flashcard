import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Score from "./score";
import {accentBackground, defaultPrimaryBackground, dividerBorder, red, textPrimary} from "../utils/colors";


class Question extends Component {

    state = {
        show: false,
        questionNumber: 1,
        total: 0,
        hits: 0,
        endQuestion: false
    };

    componentDidMount() {
        this.setState(() => ({
            total: this.props.cardsDeck.length
        }))
    }

    handleState = (response) => {
        const {type, show} = response;
        const {questionNumber, hits, total} = this.state;

        type === 'correct' && this.setState(() => ({hits: hits + 1}));

        this.setState(() => ({
            show,
            questionNumber: questionNumber + 1,
        }));

        questionNumber !== total
            ? this.props.cardsDeck.pop()
            : this.setState(() => ({endQuestion: true}))
    };

    handleShow = (value) => {
        this.setState(() => ({show: value}))
    };

    render() {

        const {show, questionNumber, total, endQuestion} = this.state;

        const {question, answer} = this.props.cardsDeck[this.props.cardsDeck.length - 1];

        if (endQuestion) {
            return this.props.navigation.navigate('Score', {result: this.state})
        }

        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.score}>{`${questionNumber} / ${total}`}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>Question</Text>
                    <TextInput
                        multiline={true}
                        editable={false}
                        maxLength={500}
                        ed
                        style={styles.textArea}>{question}</TextInput>
                </View>

                <TouchableOpacity
                    style={[styles.show, styles.btn]}
                    onPress={() => this.handleShow(true)}>
                    <Text style={styles.labelBtn}>Show Response</Text>
                </TouchableOpacity>

                {show &&
                <View>
                    <Text style={styles.title}>Answer</Text>
                    <TextInput
                        multiline={true}
                        maxLength={500}
                        editable={false}
                        style={styles.textArea}>{answer}</TextInput>
                </View>
                }

                <View style={styles.action}>
                    <TouchableOpacity style={[styles.correct, styles.btn]}
                                      onPress={() => this.handleState({type: 'correct', show: false})}>
                        <Text style={styles.labelBtn}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.incorrect, styles.btn]}
                                      onPress={() => this.handleState({type: 'incorrect', show: false})}>
                        <Text style={styles.labelBtn}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    score: {
        fontSize: 15,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10

    },
    correct: {
        backgroundColor: defaultPrimaryBackground,
        flexGrow: 1
    },
    incorrect: {
        backgroundColor: red,
        flexGrow: 1
    },
    show: {
        backgroundColor: accentBackground
    },
    labelBtn: {
        color: textPrimary,
        fontSize: 20,

    },
    title: {
        fontSize: 20
    },
    textArea: {
        borderColor: dividerBorder,
        borderWidth: 1,
        height: 170,
        margin: 5
    },
});

function mapStateToProps({cards}, props) {
    const id = props.navigation.state.params.idDeck;
    const listCards = Object.values(cards);
    const cardsDeck = listCards.filter(card => card.idDeck === id && card);

    return {
        cardsDeck
    }
}

export default connect(mapStateToProps)(Question)

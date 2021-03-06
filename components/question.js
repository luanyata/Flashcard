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
        endQuestion: false,
        idDeck: 0,
        indexCard: 0
    };

    componentDidMount() {
        this.setState(() => ({
            total: this.props.cardsDeck.length,
        }))
    }

    handleState = () => {
        const {questionNumber, total} = this.state;
        const {idDeck, navigation} = this.props;

        let countQuestion = questionNumber;

        this.setState(() => ({
            show: false,
            idDeck,
        }));


        if (countQuestion !== total) {
            this.setState(prevState => ({
                questionNumber: prevState.questionNumber + 1,
                indexCard: prevState.indexCard + 1
            }));

        } else {

            const result = {...this.state};
            this.setState(() => ({
                endQuestion: true,
                indexCard: 0,
                questionNumber: 1,
                hits: 0
            }));

            navigation.navigate('Score', {result: result})
        }
    };

    handleResponseCorrect = () => {
        this.setState(() =>
                ({hits: this.state.hits + 1}),
            () => this.handleState('correct'))
    };


    handleInResponseCorrect = () => {
        this.handleState('incorrect');
    };

    handleShow = () => {
        this.setState(() => ({show: true}))
    };

    render() {

        const {show, questionNumber, total, indexCard} = this.state;
        const {cardsDeck} = this.props;

        let {question, answer} = cardsDeck[indexCard];

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
                        style={styles.textArea}>{question}</TextInput>
                </View>

                <TouchableOpacity
                    style={[styles.show, styles.btn]}
                    onPress={this.handleShow}>
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

                {show &&
                <View style={styles.action}>
                    <TouchableOpacity style={[styles.correct, styles.btn]}
                                      onPress={this.handleResponseCorrect}>
                        <Text style={styles.labelBtn}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.incorrect, styles.btn]}
                                      onPress={this.handleInResponseCorrect}>
                        <Text style={styles.labelBtn}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
                }

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

function mapStateToProps({decks, cards}, props) {

    const idDeck = props.navigation.state.params.idDeck;
    const listCards = Object.values(cards);
    const cardsDeck = listCards.filter(card => card.idDeck === idDeck);

    return {
        idDeck,
        cardsDeck
    }
}

export default connect(mapStateToProps)(Question)

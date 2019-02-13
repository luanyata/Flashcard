import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import {textPrimary, accentBackground, dividerBorder} from "../utils/colors";
import {connect} from 'react-redux'
import {handleAddCard} from "../actions/cards";
import {formatCard} from "../utils/format";


class CreateNewQuestion extends Component {

    state = {
        question: '',
        answer: '',
    };

    handleSubmit = () => {
        const idDeck = this.props.id;

        this.props.dispatch(handleAddCard(formatCard(this.state, idDeck)));
    };

    render() {

        const {answer, question} = this.state;

        return (
            <View style={{flex: 1}}>

                <View stlye={styles.containerQuestion}>
                    <Text style={styles.label}>Question:</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        maxLength={500}
                        value={question}
                        onChangeText={(question) => this.setState({question})}/>
                    <Text style={styles.label}>Answer:</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        maxLength={500}
                        value={answer}
                        onChangeText={(answer) => this.setState({answer})}/>
                </View>

                <View>
                    <TouchableOpacity style={styles.btn} onPress={() => this.handleSubmit()}>
                        <Text style={styles.labelBtn}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    containerQuestion: {
        marginTop: 100,
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 20,
        margin: 5

    },
    input: {
        borderColor: dividerBorder,
        borderWidth: 1,
        height: 200,
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

function mapStateToProps({}, props) {

    const id = props.navigation.state.params.idDeck;

    return {
        id
    }
}

export default connect(mapStateToProps)(CreateNewQuestion);

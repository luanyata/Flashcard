import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Score from "./score";


class Question extends Component {

    state = {
        show: false,
        countAnswers: 0,
        total: 0
    };

    handleState = (response) => {
        const {type, show} = response;
        this.setState(() => ({
            show
        }))
    };

    handleShow = (value) => {
        this.setState(() => ({show: value}))
    };

    render() {

        const {show, countAnswers, total} = this.state;

        if (this.props) {
            return <Score data={this.props}/>
        }


        return (
            <View>
                <View>
                    <Text>{`${countAnswers}/ ${total}`}</Text>
                </View>
                <View>
                    <Text>Question</Text>
                </View>

                <TouchableOpacity onPress={() => this.handleShow(true)}>
                    <Text>Show</Text>
                </TouchableOpacity>

                {show &&
                <View>
                    <Text>answer</Text>
                </View>
                }

                <TouchableOpacity onPress={() => this.handleState({type: 'co', show: false})}>
                    <Text>Co</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleState({type: 'co', show: false})}>
                    <Text>In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


function mapStateToProps({cards}, props) {
    const id = props.navigation.state.params.idDeck;

    const cardsDeck = Object.values(cards.map(card => card.idDeck === id));

    return {
        cardsDeck
    }
}

export default connect(mapStateToProps)(Question)

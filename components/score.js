import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {defaultPrimaryBackground, red, textPrimary} from "../utils/colors";
import {clearLocalNotification, setLocalNotification} from "../utils/notifications";

class Score extends Component {

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification);
    }


    handleNavigationQuestion = () => {
        this.props.navigate('Question', {idDeck: this.props.result.idDeck})
    };

    handleNavigationDeckDetail = () => {
        this.props.navigate('DeckDetail', {idDeck: this.props.result.idDeck})
    };

    render() {

        const {hits, total} = this.props.result;

        return (
            <View style={{flex: 1}}>
                <View style={styles.containerTitle}>
                    <Text style={{fontSize: 100}}>{`${hits}/${total}`}</Text>
                    {hits === total &&
                    <Text
                        style={{fontSize: 50}}>👏🏽😲👏🏽</Text>}
                </View>
                <View style={styles.action}>
                    <TouchableOpacity style={[styles.reset, styles.btn]}
                                      onPress={this.handleNavigationQuestion}>
                        <Text style={styles.labelBtn}> Reset Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.back, styles.btn]}
                                      onPress={this.handleNavigationDeckDetail}>
                        <Text style={styles.labelBtn}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerTitle: {
        marginTop: 100,
        alignItems: 'center',
        flex: 1
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
    reset: {
        backgroundColor: defaultPrimaryBackground,
        flexGrow: 1
    },
    back: {
        backgroundColor: red,
        flexGrow: 1
    },
    labelBtn: {
        color: textPrimary,
        fontSize: 20,
    },
});


function mapStateToProps({}, props) {

    const result = props.navigation.state.params.result;
    const navigate = props.navigation.navigate;

    return {
        result,
        navigate
    }
}

export default connect(mapStateToProps)(Score)

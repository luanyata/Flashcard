import React from 'react';
import {View, StatusBar} from 'react-native';
import {Constants} from 'expo'
import {darkPrimaryBackground} from "./utils/colors";
import StackNav from "./components/stackNav";
import {createStore, applyMiddleware} from "redux";
import reducer from './reducers'
import {Provider} from "react-redux";
import middleware from './middleware'

const store = createStore(reducer, middleware);

function AppStatusbar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <AppStatusbar backgroundColor={darkPrimaryBackground}
                                  barStyle={'light-content'}/>
                    <StackNav/>
                </View>
            </Provider>
        );
    }
}

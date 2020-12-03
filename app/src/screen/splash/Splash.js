import React, {Component} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import {inject, observer} from "mobx-react";
import AsyncStorage from '@react-native-community/async-storage';

@inject('loadingStore')
@inject('userStore')
@observer
export default class Splash extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        SplashScreen.hide();
        if(await AsyncStorage.getItem('@skip_key') === '4' && await AsyncStorage.getItem('@login_key') === '4'){
            this.props.navigation.replace('Main')
        }else if(await AsyncStorage.getItem('@skip_key') === '4'){
            this.props.navigation.replace('Login')
        }else{
            this.props.navigation.replace('Tutorial')
        }
        
    }

    render() {
        return (
            <View/>
        );
    }
}
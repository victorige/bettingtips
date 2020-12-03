import React, {Component} from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {strings} from "../../../config/i18n/i18n";
import {COLOR_APP_BLACK, COLOR_APP_BLUE, COLOR_APP_WHITE} from "../../../../res/style/AppStyle";
import {sizeFont, sizeHeight, sizeWidth} from "../../../util/Size";
import DialogUtil from "../../../util/DialogUtil";
import AppText from "../../../component/Text";
import AnimateInput from "../../../component/animate-input";
import Button from "../../../component/Button";
import NavigationActions from "../../../router/NavigationActions";
import axios from 'axios';
import { getUniqueId } from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';

const publicIp = require('public-ip');

export default class LoginScreen extends Component {
    state = {
        phone: '',
        name: '',
        email: '',
        namevalid: '',
        emailvalid: '',
        namebutton: 0,
        emailbutton: 0,
        spinner: false
    }


    async nameChange(value){
        await this.setState({name: value});
        const name = this.state.name
        const regex = /^[a-zA-Z]+$/g;
        const isValid = regex.test(name);

        if(name.length < 3){
            this.setState({
                namevalid: 'Name cannot be less than 3 characters',
                namebutton: 0
            })
        }else if(name.length > 10){
            this.setState({
                namevalid: 'Name cannot be greater than 10 characters',
                namebutton: 0
            })
        }else if(!isValid){
            this.setState({
                namevalid: 'Only letters are allowed',
                namebutton: 0
            })
        }else{
            this.setState({
                namevalid: '',
                namebutton: 1
            })
        }
    }

    async emailChange(value){
        await this.setState({email: value});
        const email = this.state.email
        const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
        const isValid = regex.test(email);

        if(!isValid){
            this.setState({
                emailvalid: 'Enter a valid email address',
                emailbutton: 0
            })
        }else{
            this.setState({
                emailvalid: '',
                emailbutton: 1
            })
        }
    }

    onSubmit = async () => {
        
        this.setState({
            spinner: true
        })
        const namebutton = await this.state.namebutton
        const emailbutton = await this.state.emailbutton
        const name = await this.state.name
        const email = await this.state.email


        if(namebutton == 0){
            if(name == ''){
                this.setState({
                    namevalid: 'Enter Your Name',
                    namebutton: 0,
                    spinner: false
                })
            }else{
                this.setState({
                    namebutton: 0,
                    spinner: false
                })
            }

        }else if(emailbutton == 0){
            if(email == ''){
                this.setState({
                    emailvalid: 'Enter Your Email Address',
                    emailbutton: 0,
                    spinner: false
                })
            }else{
                this.setState({
                    namevalid: 'Enter Your Name',
                    namebutton: 0,
                    spinner: false
                })
            }
        }else{

            try {
                const response = await axios.post("https://oforum.ng/api/betuser", {
                    deviceid: await getUniqueId(),
                    name: this.state.name,
                    email: this.state.email,
                    ip: await publicIp.v4()
                }, {
                        headers: {
                            securepass: 'k$w;8f:XrwLp{x3('
                        } 
                    });
                    if(response.status == 200 && response.data.success == true){
                        await AsyncStorage.setItem('@login_key', '4')
                        return NavigationActions.resetPage('Main')
                    }
                    this.setState({
                        spinner: false
                    })
                    return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK');
                
                
              } catch (error) {
                    this.setState({
                        spinner: false
                    })
                    return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK');
                   
              }
            }
        
    }


    render() {
        const {phone, name, email} = this.state
        return (
            <View style={styles.container}>
                 <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    />
                <View style={styles.view_main}>
                    <Image style={styles.tinyLogo} source={require('../../../../res/images/ic_logo_c.png')}/>

                    <AppText style={styles.text_welcome_back}>Welcome :)</AppText>

                    <Text style={styles.warning}>{this.state.namevalid}</Text>
                    <AnimateInput
                        style={styles.text_space}
                        value={name}
                        label={'Name'}
                        onChangeText={text => this.nameChange(text)}
                    />
                    <Text style={styles.warning}>{this.state.emailvalid}</Text>
                    <AnimateInput
                        style={styles.text_space}
                        value={email}
                        label={'Email Address'}
                        onChangeText={text => this.emailChange(text)}
                    />
                   
                    <Button onPress={this.onSubmit} style={styles.button_started}
                        text={'Continue'}/>
                </View>
               
            </View>
        )
    }

    onForgotPassword = () => {
        NavigationActions.navigate('Forgot')
    }

    onSignIn = () => {
        NavigationActions.navigate('CreateWallet')
    }

    onSignUp = () => {
        NavigationActions.navigate('Register')
    }

    onSignInFacebook = () => {
        NavigationActions.navigate('Main')
    }

    onPressSkip = () => {
        NavigationActions.navigate('CreateWallet')
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: sizeHeight(6)
    },
    text_skip: {
        color: COLOR_APP_BLUE,
        top: sizeHeight(3),
        right: sizeWidth(3),
        position: 'absolute'
    },

    text_welcome_back: {
        color: '#000077',
        fontFamily: 'sf-black',
        fontSize: sizeFont(7),
        fontWeight: '900',
        lineHeight: sizeHeight(5),
        marginVertical: sizeHeight(3),
    },
    tinyLogo: {
        width: sizeWidth(30),
        height: sizeHeight(15),
        right: sizeWidth(3),
        position: 'absolute'
      },
    warning: {
        color: 'red',
        fontFamily: 'sf-black',
        fontSize: sizeFont(3),
        fontWeight: '900',
        marginVertical: sizeHeight(1),
    },

    view_main: {
        marginHorizontal: sizeWidth(7)
    },

    text_space: {
        marginTop: sizeHeight(0)
    },
    view_sign: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: sizeHeight(2)
    },
    forgot_password: {
        flex: 1,
        textAlign: 'center',
        color: COLOR_APP_BLUE
    },
    sign_in: {
        flex: 1,
    },
    view_or: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sign_in_facebook: {
        backgroundColor: '#3B5998',
        width: '100%',
        marginTop: sizeHeight(5)
    },
    text_or: {
        color: '#7B7B7B'
    },
    line: {
        flex: 1,
        height: sizeWidth(0.1),
        backgroundColor: '#EDEDED',
        marginHorizontal: sizeWidth(5)
    },
    view_sign_in: {
        position: 'absolute',
        bottom: sizeHeight(6),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text_dont_have: {
        color: 'black',
    },
    text_sign_in: {
        color: COLOR_APP_BLUE,
    },
     button_started: {
        marginTop:sizeWidth(6),
    },

    button_started_text: {
        
        color: '#ffffff',
        fontFamily: 'sf-heavy',
        fontSize: 16,
        fontWeight: '800',
    }
});
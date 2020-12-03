import React, {Component} from "react";
import {Image, StyleSheet, View, Dimensions, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {COLOR_APP_BLACK, COLOR_APP_BLUE, COLOR_APP_WHITE} from "../../../res/style/AppStyle";
import {sizeFont, sizeHeight, sizeWidth} from "../../util/Size";
import AppText from "../../component/Text";
import {strings} from "../../config/i18n/i18n";
import Button from "../../component/Button";
import PropTypes from "prop-types";
import NavigationActions from "../../router/NavigationActions";
import WrapText from "../../component/WrapText";

const { width, height } = Dimensions.get('window');
export default class ItemTutorial extends Component {

    static propTypes = {
        data: PropTypes.any,
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderImage()}
                {this.renderBottom()}
            </View>
        )
    }

    renderImage = () => {
        const {data} = this.props;
        return (
            <View style={styles.view_header}>
                <Image style={styles.image} source={data.image}/>
            </View>
        )
    }

    renderBottom = () => {
        const {data} = this.props;
        return (
            <View style={styles.view_bottom}>
                <AppText style={styles.text_title}>{data.title}</AppText>
                <WrapText style={styles.text_content}>{data.content}</WrapText>
                <Button onPress={this.onPressSkip} style={styles.button_started}
                        textStyle={styles.button_started_text} text={strings('tutorial.button_started')}/>
            </View>
        )
    }

    onPressSkip = async () => {
        try {
          await AsyncStorage.setItem('@skip_key', '4')
          NavigationActions.resetPage('Login')
        } catch (e) {
          alert('An error occured')
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center'
    },
    view_header: {
        flex: 2.5,
        justifyContent: 'center'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: sizeWidth(50),
        height: sizeHeight(25)
    },
    view_bottom: {
        flex: 1,
        width: '100%',
        padding: sizeWidth(10),
        alignItems: 'center',
    },
    text_title: {
        fontSize: sizeFont(6.25),
        textAlign: 'center',
        marginBottom: sizeHeight(3),
        color: '#172866',
        fontFamily: 'sf-black',
        fontWeight: '900',
    },
    text_content: {
        fontSize: sizeFont(3.5),
        opacity: 0.5,
        textAlign: 'center',
        color: '#172866',
        fontFamily: 'sf-semibold',
        fontWeight: '600',
        lineHeight: sizeHeight(3),
        bottom: sizeHeight(2)
    },
    button_started: {
        backgroundColor: '#763aff',
        marginTop:sizeWidth(3),
        width: '100%',
        borderRadius: 25,
        bottom: sizeHeight(2),
    },
    button_started_text: {
        color: '#ffffff',
        fontFamily: 'sf-heavy',
        fontSize: sizeFont(4),
        fontWeight: '800',
    }
});
import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {sizeFont, sizeWidth} from "../util/Size";
import PropTypes from 'prop-types';
import {APP_COLOR_YELLOW, APP_TEXT_COLOR, COLOR_APP_BLACK, SEPARATOR_COLOR} from "../../res/style/AppStyle";

export default class InputView extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            underlineColor: SEPARATOR_COLOR
        }
    }

    renderIcon = (icon) => {
        if (icon) {
            return (
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={styles.icon}
                />
            )
        }
    };

    onFocus = () => {
        this.setState({
            underlineColor: APP_COLOR_YELLOW
        })
    };

    onBlur = () => {
        this.setState({
            underlineColor: SEPARATOR_COLOR
        })
    };

    render() {
        const {icon, textRef, value, placeholder, onChangeText, secureTextEntry, autoCapitalize, keyboardType, returnKeyType, onSubmitEditing} = this.props;
        return (
            <View style={styles.container}>
                {this.renderIcon(icon)}
                <TextInput
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    ref={(r) => {
                        textRef && textRef(r)
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={APP_TEXT_COLOR}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style={[styles.textInput, {borderBottomColor: this.state.underlineColor}]}
                    value={value}
                    autoCapitalize={'none'}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    returnKeyTyp={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
        )
    }
}

InputView.propTypes = {
    icon: PropTypes.any,
    textRef: PropTypes.func,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    autoCapitalize: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7,
    },
    textInput: {
        flex: 1,
        fontSize: sizeFont(3.8),
        height: 40,
        color: COLOR_APP_BLACK,
        borderBottomWidth: 1
    },
    icon: {
        height: sizeWidth(5),
        width: sizeWidth(5),
        marginRight: sizeWidth(5),
    },
});
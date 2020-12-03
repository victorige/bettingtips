import React from "react";
import {APP_TEXT_PLACEHOLDER, COLOR_APP_BLACK} from "../../res/style/AppStyle";
import {StyleSheet, TextInput, View} from "react-native";
import PropTypes from "prop-types";
import {sizeFont, sizeHeight, sizeWidth} from "../util/Size";
import Icon from "./Icon";

export default class Input extends React.PureComponent {

    static propTypes = {
        icon: PropTypes.any,
        style: PropTypes.any,
        textRef: PropTypes.func,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        editable: PropTypes.bool,
        multiline: PropTypes.bool,
        maxLength: PropTypes.any,
        numberOfLines: PropTypes.any,
        onChangeText: PropTypes.func,
        secureTextEntry: PropTypes.bool,
        autoCapitalize: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    onFocus = () => {

    };

    onBlur = () => {

    };

    render() {
        const {
            icon, style, multiline, numberOfLines, textRef, maxLength, editable, value, placeholder,
            onChangeText, secureTextEntry, autoCapitalize, keyboardType, returnKeyType, onSubmitEditing
        } = this.props;
        return (
            <View style={styles.container}>
                <Icon source={icon}/>
                <TextInput
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    ref={(r) => {
                        textRef && textRef(r)
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={APP_TEXT_PLACEHOLDER}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    style={[styles.textInput, style]}
                    value={value}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                    autoCapitalize={'none'}
                    maxLength={maxLength}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDEDED',
        flexDirection: 'row',
        height: sizeWidth(12),
        borderRadius: sizeWidth(1),
        alignItems: 'center',
        padding: sizeWidth(3)
    },
    textInput: {
        padding: 0,
        fontSize: sizeFont(3.8),
        marginLeft: sizeWidth(3),
        color: COLOR_APP_BLACK
    }
});
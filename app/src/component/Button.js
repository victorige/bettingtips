import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR_APP_BLACK, COLOR_APP_BLUE} from "../../res/style/AppStyle";
import Text from "./Text";
import {sizeFont, sizeHeight, sizeWidth} from "../util/Size";
import PropTypes from "prop-types";
import Fontello from "./Fontello";

export default class Button extends Component<Props> {

    static propTypes = {
        text: PropTypes.string,
        textStyle: PropTypes.any,
        onPress: PropTypes.func,
        iconRight: PropTypes.any,
        iconLeft: PropTypes.any,
        style: PropTypes.any,
        disabled: PropTypes.bool,
        configLeft: PropTypes.any,
        configRight: PropTypes.any,
    };

    static defaultProps = {
        configLeft: {
            color: COLOR_APP_BLACK,
            size: sizeWidth(4),
            style: {
                marginRight: sizeWidth(3)
            }
        },
        configRight: {
            color: COLOR_APP_BLACK,
            size: sizeWidth(4),
            style: {
                marginLeft: sizeWidth(3)
            }
        },
    }

    render() {
        const {style, configLeft, configRight, textStyle, onPress, disabled, text, iconRight, iconLeft} = this.props;

        return (
            <TouchableOpacity
                style={[styles.container, style]}
                onPress={onPress}
                disabled={disabled}>
                {iconLeft && <Fontello name={iconLeft} color={configLeft.color} size={configLeft.size}
                                       style={configLeft.style}/>}
                {
                    this.props.children || <Text style={[styles.TextInside, textStyle]}>
                        {text}
                    </Text>
                }
                {iconRight && <Fontello name={iconRight} color={configRight.color} size={configRight.size}
                                        style={configRight.style}/>}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: sizeWidth(69.75),
        flexDirection: 'row',
        paddingHorizontal: sizeWidth(5),
        paddingVertical: sizeWidth(3.5),
        backgroundColor: '#763aff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: sizeWidth(6.25),
        elevation: 1,
        shadowOffset: {width: 0, height: sizeWidth(0.1)},
        shadowOpacity: 0.1,
    },
    TextInside: {
        textAlign: 'center',
        flex: 1,
        fontSize: sizeFont(4),
        fontWeight: '800',
        color: '#ffffff',
        fontFamily: 'sf-heavy',
    },
});

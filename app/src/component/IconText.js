import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {sizeWidth} from "../util/Size";
import PropTypes from 'prop-types';
import AppText from "./Text";

export default class IconText extends Component {

    static propTypes = {
        icon: PropTypes.any,
        text: PropTypes.string,
        onPress: PropTypes.any,
        styleText: PropTypes.any,
        styleIcon: PropTypes.any,
    };

    constructor(props) {
        super(props);
    }

    renderIcon = (icon) => {
        const {styleIcon} = this.props;
        if (icon) {
            return (
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={[styles.icon, styleIcon]}
                />
            )
        }
    };

    render() {
        const {style, icon, text, onPress, disabled, styleText} = this.props;
        return (
            <TouchableOpacity style={[styles.container, style]}
                              onPress={onPress}
                              disabled={disabled}
            >
                {this.renderIcon(icon)}
                <AppText
                    style={[styles.text, styleText]}>
                    {text}
                </AppText>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: sizeWidth(3.2),
    },
    icon: {
        marginRight: sizeWidth(3),
        height: sizeWidth(4),
        width: sizeWidth(4),
    }
});
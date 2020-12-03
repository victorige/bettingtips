import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types'
import {sizeFont} from "../util/Size";
import {COLOR_APP_WHITE} from "../../res/style/AppStyle";

const EMPTY = '';

export default class AppText extends PureComponent {

    static propTypes = {
        children: PropTypes.any,
        onPress: PropTypes.func,
        style: PropTypes.any
    };

    render() {

        const {style, onPress} = this.props;
        const children = (this.props.children !== null && this.props.children !== undefined) ? this.props.children : EMPTY;
        return (
            <Text
                {...this.props}
                numberOfLines={1}
                allowFontScaling={false}
                ellipsizeMode="tail"
                onPress={onPress}
                style={[styles.Text, style]}>
                {children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    Text: {
        fontSize: sizeFont(4.2),
        color: COLOR_APP_WHITE,
        backgroundColor: 'transparent'
    }
});

import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {sizeWidth} from "../util/Size";
import PropTypes from 'prop-types';

export default class Icons extends React.PureComponent {

    static propTypes = {
        source: PropTypes.any.isRequired,
        style: PropTypes.any,
        resizeMode: PropTypes.any,
        backgroundColor: PropTypes.any,
        styleButton: PropTypes.any,
        onPress: PropTypes.func,
    };

    render() {
        const {style, styleButton, source, onPress, resizeMode, backgroundColor} = this.props;

        return (
            <TouchableOpacity
                style={[styles.container, styleButton]}
                onPress={onPress}
                disabled={!onPress}>
                <Image
                    source={source}
                    backgroundColor={backgroundColor}
                    resizeMode={resizeMode || 'contain'}
                    style={[styles.icon, style]}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    icon: {
        height: sizeWidth(5),
        width: sizeWidth(5),
    }
});
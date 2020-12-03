import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {sizeWidth} from "../util/Size";
import PropTypes from 'prop-types';
import Fontello from "./Fontello";

export default class IconButton extends React.PureComponent {

    static propTypes = {
        icon: PropTypes.any,
        style: PropTypes.any,
        styleIcon: PropTypes.any,
        onPress: PropTypes.any,
        color: PropTypes.any,
        size: PropTypes.any,
    };

    constructor(props) {
        super(props);
    }

    renderIcon = () => {
        const {color, icon, size} = this.props;
        if (icon) {
            return (
                <Fontello
                    size={size || sizeWidth(6)}
                    color={color}
                    name={icon}
                />
            )
        }
    };

    render() {
        const {style, onPress, disabled} = this.props;
        return (
            <TouchableOpacity {...this.props}
                              style={[styles.container, style]}
                              onPress={onPress}
                              disabled={disabled}>
                {this.renderIcon()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
});
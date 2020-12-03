import React, {PureComponent} from "react";
import {TouchableOpacity} from "react-native"
import PropTypes from "prop-types";
import {createIconSetFromFontello} from "react-native-vector-icons";
import config from "../../res/icon/config";
import {sizeWidth} from "../util/Size";
import {COLOR_APP_BLACK} from "../../res/style/AppStyle";

const Icon = createIconSetFromFontello(config);

export default class Fontello extends PureComponent {

    static propTypes = {
        style: PropTypes.any,
        styleButton: PropTypes.any,
        name: PropTypes.any,
        size: PropTypes.any,
        color: PropTypes.any,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        name: "ic_back",
        color: COLOR_APP_BLACK,
        size: sizeWidth(4.5),
        style: {textAlign: 'center'},
        styleButton: {}
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {styleButton, onPress} = this.props
        return (
            <TouchableOpacity
                style={[{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding:sizeWidth(1)
                }, styleButton]}
                disabled={!onPress}
                onPress={onPress}>
                <Icon {...this.props}/>
            </TouchableOpacity>
        );
    }
}
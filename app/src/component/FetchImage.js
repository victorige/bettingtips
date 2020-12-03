import React, {Component} from 'react';
import {
    Image,
    Platform
} from "react-native";
import PropTypes from 'prop-types';
import FastImage from "react-native-fast-image";

export default class FetchImage extends Component {

    constructor(props) {
        super(props);
    }

    renderPlaceHolder = () => {
        const {style, resizeMode} = this.props;
        const placeholder = this.props.placeholder || require('../../res/images/empty-image.png');
        return <Image
            resizeMode={resizeMode || 'cover'}
            style={style}
            source={placeholder}/>
    };

    renderImage = () => {
        const {uri, style, resizeMode, priority, onLoadEnd} = this.props;
        if (Platform.OS === 'ios') {
            return (
                <FastImage
                    style={style}
                    onLoad={this.onLoad}
                    source={{
                        uri: uri,
                        priority: priority
                    }}
                    resizeMode={resizeMode}
                    onLoadEnd={onLoadEnd}
                />
            )
        }
        return (
            <Image
                style={style}
                onLoad={this.onLoad}
                source={{
                    uri: uri
                }}
                resizeMode={resizeMode}
                onLoadEnd={onLoadEnd}
            />
        )
    };

    render() {
        const {uri} = this.props;
        if (uri) {
            return this.renderImage();
        } else {
            return this.renderPlaceHolder();
        }
    }

}

FetchImage.propTypes = {
    uri: PropTypes.string,
    resizeMode: PropTypes.string,
    priority: PropTypes.string,
    placeholder: PropTypes.any,
};



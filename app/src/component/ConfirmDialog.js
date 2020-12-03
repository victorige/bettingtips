import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import DialogManager from '../../../Libraries/react-native-dialog-component/src';
import WrapText from "./WrapText";
import {sizeFont, sizeWidth} from "../util/Size";
import {APP_COLOR, COLOR_APP_BLACK, COLOR_APP_BLUE} from "../../res/style/AppStyle";
import AppText from "./Text";

export default class ConfirmDialog extends Component {

    onConfirmClick = () => {
        const {onConfirmClick} = this.props;
        DialogManager.dismiss();
        if (onConfirmClick) {
            onConfirmClick();
        }
    };

    onRejectClick = () => {
        const {onRejectClick} = this.props;
        DialogManager.dismiss();
        if (onRejectClick) {
            onRejectClick();
        }
    };

    renderTitle = (title) => {
        const {confirmText} = this.props;
        const colorTitle = !confirmText && {color: 'black'};
        if (title) {
            return (
                <WrapText style={[styles.TitleText, colorTitle]}>{title}</WrapText>
            )
        }
    };

    render() {
        const {title, content} = this.props;
        return (
            <View style={styles.Container}>
                <View style={styles.ContentWrapper}>
                    {this.renderTitle(title)}
                    <WrapText style={styles.ContentText}>{content}</WrapText>
                </View>
                {/*{confirmText && this.renderConfirmContainer(confirmText)}*/}
                {this.renderConfirmContainer()}
            </View>
        );
    }

    renderConfirmContainer = () => {
        const {confirmText, rejectText} = this.props
        return <View>
            <View style={styles.VerticalSeparator}/>
            <View style={styles.ActionContainer}>
                {confirmText && <TouchableOpacity style={styles.ActionWrapper} onPress={this.onConfirmClick}>
                    <AppText style={styles.ActionText}>{confirmText}</AppText>
                </TouchableOpacity>}
                <View style={styles.HorizontalSeparator}/>
                {rejectText && <TouchableOpacity style={styles.ActionWrapper} onPress={this.onRejectClick}>
                    <AppText style={styles.ActionText}>{rejectText}</AppText>
                </TouchableOpacity>}
            </View>
        </View>
    }
}

ConfirmDialog.propTypes = {
    confirmText: PropTypes.string,
    rejectText: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    onConfirmClick: PropTypes.func,
    onRejectClick: PropTypes.func,
};

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        overflow: 'hidden',
    },
    ContentWrapper: {
        paddingHorizontal: sizeWidth(3.2),
        paddingVertical: sizeWidth(4),
        alignItems: 'center',
    },
    TitleText: {
        fontSize: sizeFont(4.8),
        marginBottom: sizeWidth(2),
        color: "#000"
    },
    ContentText: {
        fontSize: sizeFont(4),
        marginBottom: sizeWidth(1),
        color: COLOR_APP_BLACK,
        textAlign: 'center'
    },
    ActionContainer: {
        flexDirection: 'row',
    },
    VerticalSeparator: {
        height: 1,
        width: sizeWidth(70),
        backgroundColor: '#DDDDDD',
    },
    HorizontalSeparator: {
        width: 1,
        backgroundColor: '#DDDDDD',
    },
    ActionWrapper: {
        flex: 1,
        padding: sizeWidth(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    ActionText: {
        color: COLOR_APP_BLUE,
        fontSize: sizeFont(4),
    },
});
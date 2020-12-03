import DialogManager, {ScaleAnimation} from '../../../Libraries/react-native-dialog-component/src';
import {sizeHeight, sizeWidth} from "./Size";
import {Keyboard, StyleSheet} from 'react-native';
import React from 'react';
import ConfirmDialog from "../component/ConfirmDialog";
import MessageDialog from "../component/MessageDialog";

export default class DialogUtil {

    static dialogShown = false;

    static showConfirmDialog(title: string, content: string, confirmText: string, rejectText: string, onConfirmClick, onRejectClick) {
        DialogUtil.showDialog(
            styles.DialogStyle,
            sizeWidth(70),
            <ConfirmDialog
                title={title}
                content={content}
                confirmText={confirmText}
                rejectText={rejectText}
                onConfirmClick={() => {
                    this.dialogShown = false;
                    if (onConfirmClick) {
                        onConfirmClick();
                    }
                }}
                onRejectClick={() => {
                    this.dialogShown = false;
                    if (onRejectClick) {
                        onRejectClick();
                    }
                }}
            />,
            true
        );
    }

    static showMessageDialog(title: string, content: string, confirmText: string, onConfirmClick) {
        Keyboard.dismiss();
        DialogUtil.showDialog(
            styles.DialogStyle,
            sizeWidth(70),
            <MessageDialog
                title={title}
                content={content}
                confirmText={confirmText}
                onConfirmClick={() => {
                    this.dialogShown = false;
                    if (onConfirmClick) {
                        onConfirmClick();
                    }
                }}
            />,
            true
        );
    }

    static showDialog(dialogStyle, width, dialog, dismissOnTouchOutside) {
        if (this.dialogShown) return;
        this.dialogShown = false;
        DialogManager.show({
            animationDuration: 0,
            dismissOnTouchOutside: false,
            onDismissed: () => this.dialogShown = false,
            width: width || sizeWidth(70),
            ScaleAnimation: new ScaleAnimation(),
            dialogStyle: dialogStyle || styles.DialogStyle,
            children: (
                dialog
            ),
        });
    }

    static dismiss() {
        DialogManager.dismiss();
    }

}

const styles = StyleSheet.create({
    DialogStyle: {
        borderRadius: sizeWidth(3),
        alignItems: 'center',
    },
    dialog: {
        borderRadius: sizeWidth(3),
        alignItems: 'center',
        backgroundColor: '#0F0F0F',
        opacity: 0.8,
    },
    dialogRating: {
        height: sizeHeight(60),
        borderRadius: sizeWidth(3),
        alignItems: 'center',
        backgroundColor: '#0F0F0F',
        opacity: 0.88,
    }
});
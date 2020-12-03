import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View, Platform} from 'react-native';
import {APP_COLOR, LOADING_COLOR} from "../../res/style/AppStyle";
import {sizeHeight, sizeWidth} from "../util/Size";
import {observer, inject} from 'mobx-react'

@inject('loadingStore')
@observer
export default class LoadingView extends Component {

    render() {
        if (this.props.loadingStore.loading) {
            const size = Platform.OS === 'ios' ? 'large' : sizeWidth(9);
            return (
                <View style={styles.Loading}>
                    <ActivityIndicator animating={true} size={size} color={LOADING_COLOR}/>
                </View>
            );
        }
        return <View/>
    }
}

const styles = StyleSheet.create({
    Loading: {
        position: 'absolute',
        width: sizeWidth(100),
        height: sizeHeight(100),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#00000033',
    }
});
import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {APP_COLOR, APP_TEXT_BLACK} from "../../res/style/AppStyle";
import Text from "./Text";
import {sizeFont, sizeHeight, sizeWidth} from "../util/Size";
import {TOOL_BAR_HEIGHT} from "../../Constant";
import {strings} from "../config/i18n/i18n";

export default class WebViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isFailed: false,
            progress: 0,
        }
    }

    onLoadStart = () => {
        this.setState({
            loading: true,
            progress: 0.1,
        })
        this.progress = setInterval(() => {
            if (this.state.progress < 1) {
                this.setState(prev => {
                    return {
                        progress: prev.progress + 0.05
                    }
                })
            } else {
                clearInterval(this.progress)
                this.setState({
                    loading: false,
                    progress: 1,
                })
            }
        }, 1000)
    };

    onLoadEnd = () => {
        clearInterval(this.progress)
        this.setState({
            loading: false,
            progress: 1,
        })
    };

    onError = (error) => {
        // showError(error);
        this.setState({isFailed: true})
    };

    renderLoading = (loading) => {
        if (loading) {
            return (
                <View style={{
                    width: '100%',
                    height: sizeHeight(100) - TOOL_BAR_HEIGHT - sizeWidth(25),
                    alignItems: 'center',
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: 0
                }}>
                    <ActivityIndicator size={'large'} color={APP_COLOR}/>
                </View>
            )
        }

    };

    render() {
        const {isFailed} = this.state;
        // const title = this.props.navigation.state.params && this.props.navigation.state.params.title;
        // const uri = this.props.navigation.state.params && this.props.navigation.state.params.uri;
        const {uri, titleError, contentError} = this.props
        const isShowLoading = this.state.loading || this.state.progress < 1

        if (isFailed)
            return (
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{
                        fontSize: sizeFont(3.47),
                        color: APP_TEXT_BLACK,
                        marginVertical: sizeWidth(10)
                    }}>{titleError || strings('message.network_error')}</Text>
                    <Text style={{
                        fontSize: sizeFont(3.33),
                        color: APP_TEXT_BLACK,
                        marginHorizontal: sizeWidth(8)
                    }}>{contentError || strings('message.network_error_content')}</Text>
                </View>
            )

        return (
            <View style={{flex: 1, overflow: 'hidden'}}>
                <WebView
                    style={{backgroundColor: 'transparent'}}
                    ref={'web_view_ref'}
                    onNavigationStateChange={this.onNavigationStateChange}
                    source={{uri}}
                    mixedContentMode={'always'}
                    onLoadStart={this.onLoadStart}
                    onLoadEnd={this.onLoadEnd}
                    onError={error => this.onError(error)}
                />
                {this.renderLoading(isShowLoading)}
            </View>
        );
    }

    renderLoadingBar = () => {
        const {progress} = this.state
        const width = sizeWidth(100) * progress
        return (
            <View style={{
                height: 3,
                width: '100%',
                backgroundColor: '#dadada'
            }}>
                <View style={{
                    height: 3,
                    width,
                    backgroundColor: 'black'
                }}/>
            </View>
        )
    }

    onNavigationStateChange = (navState) => {
        const {onNavigationStateChange} = this.props
        if (onNavigationStateChange) onNavigationStateChange(navState.canGoBack, this.refs.web_view_ref)
        this.setState({
            canGoBack: navState.canGoBack
        })
    }
}
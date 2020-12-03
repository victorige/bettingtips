/* @flow */

import React, {Component} from 'react';
import {Animated, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import CrossFadeIcon from './CrossFadeIcon';
import NavigationActions from "../router/NavigationActions";
import {inject, observer} from "mobx-react";
import {sizeWidth} from "../util/Size";
import {strings} from "../config/i18n/i18n";
import {showError, showMessage} from "../mobx/LoadingStore";
import {MENU_SCREENS} from "../screen/menu/MenuScreen";
import {COLOR_APP_BLUE} from "../../res/style/AppStyle";

export type TabBarOptions = {
    activeTintColor?: string,
    inactiveTintColor?: string,
    activeBackgroundColor?: string,
    inactiveBackgroundColor?: string,
    allowFontScaling: boolean,
    showLabel: boolean,
    showIcon: boolean,
    labelStyle: any,
    tabStyle: any,
    adaptive?: boolean,
    style: any,
};

type Props = TabBarOptions & {
    navigation: any,
    descriptors: any,
    jumpTo: any,
    onTabPress: any,
    onTabLongPress: any,
    getAccessibilityLabel: (props: { route: any }) => string,
    getButtonComponent: ({ route: any }) => any,
    getLabelText: ({ route: any }) => any,
    getTestID: (props: { route: any }) => string,
    renderIcon: any,
    dimensions: { width: number, height: number },
    isLandscape: boolean,
    safeAreaInset: { top: string, right: string, bottom: string, left: string },
};

const majorVersion = parseInt(Platform.Version, 10);
const isIos = Platform.OS === 'ios';
const isIOS11 = majorVersion >= 11 && isIos;

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

class TouchableOpacityWrapper extends Component<*> {
    render() {
        const {
            onPress,
            onLongPress,
            testID,
            accessibilityLabel,
            ...props
        } = this.props;

        return (
            <TouchableOpacity
                style={{flex: 1}}
                onPress={onPress}
                onLongPress={onLongPress}
                testID={testID}
                // hitSlop={{left: 15, right: 15, top: 5, bottom: 5}}
                accessibilityLabel={accessibilityLabel}
            >
                <View {...props} />
            </TouchableOpacity>
        );
    }
}

class TouchableOpacityMenuWrapper extends Component<*> {
    render() {
        const {
            onPress,
            onLongPress,
            testID,
            accessibilityLabel,
            ...props
        } = this.props;

        return (
            <View
                style={{flex: 2, backgroundColor: '#A68F77'}}
                testID={testID}
                // hitSlop={{left: 15, right: 15, top: 5, bottom: 5}}
                accessibilityLabel={accessibilityLabel}
            >
                <View style={{flex: 1, backgroundColor: '#A68F77'}}/>
                <View style={{flex: 1, backgroundColor: '#ADADAF'}}/>
                <TouchableOpacity
                    style={{height: sizeWidth(9), position: 'absolute', right: sizeWidth(1), top: sizeWidth(1)}}
                    onPress={onPress}
                    onLongPress={onLongPress}>
                    <View {...props} style={styles.menuButton}/>
                </TouchableOpacity>
            </View>
        );
    }
}

@inject('loadingStore')
@inject('userStore')
@observer
export default class TabBarBottom extends Component<Props> {
    static defaultProps = {
        activeTintColor: COLOR_APP_BLUE,
        activeBackgroundColor: 'transparent',
        inactiveBackgroundColor: 'transparent',
        inactiveTintColor: '#8E8E93',
        showLabel: false,
        showIcon: true,
        allowFontScaling: true,
        adaptive: isIOS11,
        safeAreaInset: {bottom: 'always', top: 'never'},
    };

    _renderLabel = ({route, focused}) => {
        const {
            activeTintColor,
            inactiveTintColor,
            labelStyle,
            showLabel,
            showIcon,
            allowFontScaling,
        } = this.props;

        if (showLabel === false) {
            return null;
        }

        const label = this.props.getLabelText({route});
        // const tintColor = focused ? activeTintColor : inactiveTintColor;
        const tintColor = 'white'

        if (typeof label === 'string') {
            return (
                <Animated.View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Animated.Text
                        numberOfLines={1}
                        style={[
                            styles.label,
                            {color: tintColor},
                            showIcon && this._shouldUseHorizontalLabels()
                                ? styles.labelBeside
                                : styles.labelBeneath,
                            labelStyle,
                        ]}
                        allowFontScaling={allowFontScaling}
                    >
                        {strings(label)}
                    </Animated.Text>
                </Animated.View>
            );
        }

        if (typeof label === 'function') {
            return label({route, focused, tintColor});
        }

        return label;
    };

    _renderIcon = ({route, focused}) => {
        const {
            navigation,
            activeTintColor,
            inactiveTintColor,
            renderIcon,
            showIcon,
            showLabel,
        } = this.props;
        if (showIcon === false) {
            return null;
        }

        const horizontal = this._shouldUseHorizontalLabels();

        const activeOpacity = focused ? 1 : 0;
        const inactiveOpacity = focused ? 0 : 1;

        return (
            <CrossFadeIcon
                route={route}
                horizontal={horizontal}
                navigation={navigation}
                activeOpacity={activeOpacity}
                inactiveOpacity={inactiveOpacity}
                activeTintColor={activeTintColor}
                inactiveTintColor={inactiveTintColor}
                renderIcon={renderIcon}
                style={[
                    styles.iconWithExplicitHeight,
                    showLabel === false && !horizontal && styles.iconWithoutLabel,
                    showLabel !== false && !horizontal && styles.iconWithLabel,
                ]}
            />
        );
    };

    _shouldUseHorizontalLabels = () => {
        const {routes} = this.props.navigation.state;
        const {isLandscape, dimensions, adaptive, tabStyle} = this.props;

        if (!adaptive) {
            return false;
        }

        if (Platform.isPad) {
            let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH;

            const flattenedStyle = StyleSheet.flatten(tabStyle);

            if (flattenedStyle) {
                if (typeof flattenedStyle.width === 'number') {
                    maxTabItemWidth = flattenedStyle.width;
                } else if (typeof flattenedStyle.maxWidth === 'number') {
                    maxTabItemWidth = flattenedStyle.maxWidth;
                }
            }

            return routes.length * maxTabItemWidth <= dimensions.width;
        } else {
            return isLandscape;
        }
    };

    render() {
        const {
            navigation,
            activeBackgroundColor,
            inactiveBackgroundColor,
            onTabPress,
            onTabLongPress,
            safeAreaInset,
            style,
            tabStyle,
        } = this.props;

        const language = this.props.userStore.language
        const isScreenNews = this.props.loadingStore.isScreenNews;
        const isExpired = this.props.loadingStore.is_expired;

        const {routes} = navigation.state;

        const tabBarStyle = [
            styles.tabBar,
            this._shouldUseHorizontalLabels() && !Platform.isPad
                ? styles.tabBarCompact
                : styles.tabBarRegular,
            style,
        ];

        return (
            <SafeAreaView style={tabBarStyle} forceInset={safeAreaInset}>
                {routes.map((route, index) => {
                    const focused = index === navigation.state.index;
                    const scene = {route, focused};
                    const accessibilityLabel = this.props.getAccessibilityLabel({
                        route,
                    });
                    const testID = this.props.getTestID({route});

                    const backgroundColor = focused
                        ? activeBackgroundColor
                        : inactiveBackgroundColor;

                    // const ButtonComponent = index === 2 ? TouchableOpacityMenuWrapper : TouchableOpacityWrapper;
                    // const total_unread = this.props.loadingStore.total_unread_new
                    // const isShowUnread = index === 2 && total_unread > 0
                    const ButtonComponent = TouchableOpacityWrapper

                    return (
                        <ButtonComponent
                            key={route.key}
                            onPress={() => this.onTabPressCustom(onTabPress, index, {route}, isScreenNews, isExpired)}
                            // onLongPress={() => onTabLongPress({route})}
                            testID={testID}
                            accessibilityLabel={accessibilityLabel}
                            style={[
                                styles.tab,
                                {backgroundColor},
                                styles.tabLandscape,
                                tabStyle,
                            ]}
                        >
                            {this._renderIcon(scene)}
                            {this._renderLabel(scene)}
                            {/*{isShowUnread && <View style={styles.numberContainer}>*/}
                            {/*<Animated.Text*/}
                            {/*style={{fontSize: sizeFont(4), color: '#FFF'}}>{total_unread}</Animated.Text>*/}
                            {/*</View>}*/}
                        </ButtonComponent>
                    );
                })}
            </SafeAreaView>
        );
    }

    onTabPressCustom = (onTabPress, index, route, isScreenNews, isExpired) => {
        if (index === 1) {
            NavigationActions.navigate("AddTransaction")
        } else {
            if (isScreenNews && route.route.routeName !== 'App') {

            }

            if (isExpired && route.route.routeName === 'Player') {
                showMessage(strings("common.time_expired"), strings("common.error"), () => {
                    NavigationActions.navigate('EmptyMenu', {screen: MENU_SCREENS.PURCHASE})
                })
            } else if (route.route.routeName === 'Menu') {
                NavigationActions.toggleDrawer()
            } else {
                onTabPress(route)
            }
        }
    }
}

export const DEFAULT_HEIGHT = sizeWidth(13);
const COMPACT_HEIGHT = 29;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderTopColor: 'rgba(0, 0, 0, .3)',
        flexDirection: 'row',
    },
    tabBarCompact: {
        height: COMPACT_HEIGHT,
    },
    tabBarRegular: {
        height: DEFAULT_HEIGHT,
    },
    tab: {
        flex: 1,
        alignItems: 'center'
    },
    tabPortrait: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    tabLandscape: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconWithoutLabel: {
        flex: 1,
    },
    iconWithLabel: {
        flex: 1,
    },
    iconWithExplicitHeight: {
        height: Platform.isPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT,
    },
    label: {
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    labelBeneath: {
        fontSize: 11,
        marginBottom: 1.5,
    },
    labelBeside: {
        fontSize: 12,
        marginLeft: 15,
    },
    menuButton: {
        height: sizeWidth(9),
        // backgroundColor: 'green',
        justifyContent: 'center',
        paddingHorizontal: sizeWidth(4),
        borderWidth: sizeWidth(1),
        borderColor: 'white',
        // position: 'absolute',
        // right: sizeWidth(1),
        // bottom: sizeWidth(1),
        // top: sizeWidth(1),
    },
    numberContainer: {
        height: sizeWidth(5),
        width: sizeWidth(5),
        borderRadius: sizeWidth(2.5),
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // top: sizeWidth(1),
        // right: sizeWidth(2),
        marginLeft: sizeWidth(1),
        marginTop: sizeWidth(-3),
        backgroundColor: '#DE4830',
    }
});

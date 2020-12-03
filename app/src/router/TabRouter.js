import {createBottomTabNavigator} from "react-navigation-tabs";
import React from "react";
import {View} from "react-native"
import WalletScreen from "../screen/tabbar/wallet/WalletScreen";
import ChartScreen from "../screen/tabbar/chart/ChartScreen";
import Icon from "../component/Icon";
import {COLOR_APP_WHITE} from "../../res/style/AppStyle";
import {sizeWidth} from "../util/Size";
import TabBarComponent from "../component/TabBarComponent";
import EmptyScreen from "../screen/tabbar/empty/EmptyScreen";

export const TabRouter = createBottomTabNavigator({
    Wallet: {
        screen: WalletScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Icon style={{height: sizeWidth(6), width: sizeWidth(6)}}
                      source={focused ? require('../../res/images/ic_tab_wallet_active.png') : require('../../res/images/ic_tab_wallet_inactive.png')}/>
            )
        }
    },
    Add: {
        screen: EmptyScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <View style={{
                    marginBottom: sizeWidth(6),
                    shadowOffset: {width: 0, height: sizeWidth(0.1)},
                    shadowOpacity: 0.1,
                    elevation: 1,
                }}>
                    <Icon style={{
                        height: sizeWidth(14),
                        width: sizeWidth(14),
                    }}
                          source={require('../../res/images/ic_add.png')}/>
                </View>
            )
        }
    },
    Chart: {
        screen: ChartScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Icon style={{height: sizeWidth(6), width: sizeWidth(6)}}
                      source={focused ? require('../../res/images/ic_tab_chart_active.png') : require('../../res/images/ic_tab_chart_inactive.png')}/>
            )
        }
    },
}, {
    tabBarComponent: TabBarComponent,
    tabBarPosition: 'bottom',
    initialRouteName: 'Wallet',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: false,
    tabBarOptions: {
        showLabel: false,
        tabStyle: {
            justifyContent: 'center',
        },
        backBehavior: 'none',
        style: {
            backgroundColor: COLOR_APP_WHITE,
        },
    },
});

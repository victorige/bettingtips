import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Splash from "../screen/splash/Splash";
import {DrawerNavigator} from "./DrawerRouter";
import TutorialScreen from "../screen/tutorial/TutorialScreen";
import LoginScreen from "../screen/auth/login/LoginScreen";

import Main from "../screen/home/Main";
import Games from "../screen/home/Games";
import Purchase from "../screen/home/Purchase";

const AppRouter = createStackNavigator({
    Splash: {
        screen: Splash
    },
    Tutorial: {
        screen: TutorialScreen,
    },
    Main: {
        screen: Main
    },
    Games: {
        screen: Games
    },
    Purchase: {
        screen: Purchase
    },
    Login: {
        screen: LoginScreen,
    },
    
}, {
    headerMode: 'none',
    initialRouteName: 'Splash'
});

export const AppContainer = createAppContainer(AppRouter);

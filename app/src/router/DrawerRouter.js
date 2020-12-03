import {createDrawerNavigator} from "react-navigation-drawer";
import {sizeWidth} from "../util/Size";
import React from "react";
import MenuScreen from "../screen/menu/MenuScreen";
import {DEFAULT_HEIGHT} from "../component/TabBarComponent";
import {BOTTOM_BAR_HEIGHT} from "../../Constant";
import {TabRouter} from "./TabRouter";
import {COLOR_APP_WHITE} from "../../res/style/AppStyle";

export const DrawerNavigator = createDrawerNavigator({
    Tab: {
        screen: TabRouter
    }
}, {
    contentComponent: MenuScreen,
    drawerWidth: sizeWidth(70),
    marginBottomDrawer: DEFAULT_HEIGHT + BOTTOM_BAR_HEIGHT,
    opacity: 0.9,
    drawerType: 'front',
    style: {
        backgroundColor: COLOR_APP_WHITE,
    }
});

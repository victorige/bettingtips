import React from 'react';
import {Platform, StatusBar} from "react-native";
import {isIPhoneX} from "./src/util/Device";
import {sizeWidth} from "./src/util/Size";
import {precisionRound} from "./src/util/NumberUtil";
import {strings} from "./src/config/i18n/i18n";

const STATUS_BAR_IOS_HEIGHT = isIPhoneX() ? 30 : 20;
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? STATUS_BAR_IOS_HEIGHT : StatusBar.currentHeight;
export const BOTTOM_BAR_HEIGHT = isIPhoneX() ? 34 : 0;
export const TOOL_BAR_HEIGHT = sizeWidth(12) + STATUS_BAR_HEIGHT
export const ONE_COUNT_PLAY = 30 * 1000
export const DEFAULT_VOLUME = 3 / 5
export const MIN_VOLUME = -6
export const MAX_VOLUME = 6
export const ONE_STEP_VOLUME = 1 / 150

export const convertVolume = (volume) => {
    return precisionRound((volume - DEFAULT_VOLUME) * 15, 1)
}

export const TUTORIAL_DATA = [
    {
        image: require('./res/images/award.png'),
        title: strings('tutorial.tutorial_title_1'),
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/cal.png'),
        title: strings('tutorial.tutorial_title_2'),
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/team.png'),
        title: strings('tutorial.tutorial_title_3'),
        content: strings('tutorial.tutorial_content_3'),
    },
]

export const CURRENCY_DATA = [
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_1'),
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_2'),
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_3'),
        content: strings('tutorial.tutorial_content_3'),
    },
]

export const TRANSFERS_DATA = [
    {
        title: "TODAY",
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: "Dinning Everyday",
        time: "Today",
        day: "07",
        is_increase: false,
        total_money: "15.00",
    }, {
        image: require('./res/images/ic_coffee.png'),
        title: "Coffee Sang",
        time: "Today",
        day: "07",
        is_increase: false,
        total_money: "20.00",
    }, {
        image: require('./res/images/ic_salary.png'),
        title: "Sale Finance",
        time: "Today",
        day: "07",
        is_increase: true,
        total_money: "48.00",
    },
    {
        title: "YESTERDAY",
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: "Coffee Sang",
        time: "18 Jan 2018",
        day: "18",
        is_increase: false,
        total_money: "20.00",
    }, {
        image: require('./res/images/ic_coffee.png'),
        title: "Dinning Everyday",
        time: "18 Jan 2018",
        day: "18",
        is_increase: false,
        total_money: "200.00",
    }, {
        image: require('./res/images/ic_salary.png'),
        title: "Dinning Everyday",
        time: "18 Jan 2018",
        day: "18",
        is_increase: true,
        total_money: "250.00",
    },
    {
        title: "20 Jan 2018",
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: "Dinning Everyday",
        time: "20 Jan 2018",
        day: "20",
        is_increase: true,
        total_money: "20.00",
    }, {
        image: require('./res/images/ic_coffee.png'),
        title: "Dinning Everyday",
        time: "20 Jan 2018",
        day: "20",
        is_increase: false,
        total_money: "200.00",
    }, {
        image: require('./res/images/ic_salary.png'),
        title: "Dinning Everyday",
        time: "20 Jan 2018",
        day: "20",
        is_increase: true,
        total_money: "250.00",
    },
]

export const IMAGES_DATA = [
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_1'),
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_2'),
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_3'),
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_3'),
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic-argentina.png'),
        title: strings('tutorial.tutorial_title_3'),
        content: strings('tutorial.tutorial_content_3'),
    },
]

export const CATEGORYS_DATA = [
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Restaurant',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Coffee',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Gas',
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Shopping',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Family',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Cinema',
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Travel',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Poker',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Gaming',
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Lover',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Uber',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Grab',
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Restaurant',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Coffee',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Gas',
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Shopping',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Family',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Cinema',
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Travel',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Poker',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Gaming',
        content: strings('tutorial.tutorial_content_3'),
    },
    {
        image: require('./res/images/ic_restaurant.png'),
        title: 'Lover',
        content: strings('tutorial.tutorial_content_1'),
    },
    {
        image: require('./res/images/ic_coffee.png'),
        title: 'Uber',
        content: strings('tutorial.tutorial_content_2'),
    },
    {
        image: require('./res/images/ic_salary.png'),
        title: 'Grab',
        content: strings('tutorial.tutorial_content_3'),
    },
]

export const WALLETS_DATA = [
    {
        image: 'ic_cash',
        title: 'Money Cash',
        content: 'Money on Wallet',
        money: '15.00',
    },
    {
        image: 'ic_debit_card',
        title: 'Debit Card',
        content: '*********789',
        money: '139.00',
    },
    {
        image: 'ic_credit_card',
        title: 'Credit Card',
        content: 'Money on Wallet',
        money: '150.00',
    },
    {
        image: 'ic_bank',
        title: 'Bank Account',
        content: '*********789',
        money: '157.00',
    },
    {
        image: 'ic_cash',
        title: 'Money Cash 2',
        content: 'Money on Wallet',
        money: '15.00',
    },
    {
        image: 'ic_debit_card',
        title: 'Debit Card 2',
        content: '*********789',
        money: '139.00',
    },
    {
        image: 'ic_credit_card',
        title: 'Credit Card 2',
        content: 'Money on Wallet',
        money: '150.00',
    },
    {
        image: 'ic_bank',
        title: 'Bank Account 2',
        content: '*********789',
        money: '157.00',
    },
    {
        image: 'ic_cash',
        title: 'Money Cash 3',
        content: 'Money on Wallet',
        money: '15.00',
    },
    {
        image: 'ic_debit_card',
        title: 'Debit Card 3',
        content: '*********789',
        money: '139.00',
    },
    {
        image: 'ic_credit_card',
        title: 'Credit Card 3',
        content: 'Money on Wallet',
        money: '150.00',
    },
    {
        image: 'ic_bank',
        title: 'Bank Account 3',
        content: '*********789',
        money: '157.00',
    },
]

export const FRIENDS_DATA = [
    {
        image: require('./res/images/avatar.png'),
        name: 'Rosalie Philips',
        is_select: true
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Maria Ahaha',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Johny Doe',
        is_select: true
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Jenny Pho',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Thieu Smith',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Benh Bach Tang',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Rosalie Philips',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Maria Ahaha',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Johny Doe',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Jenny Pho',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Thieu Smith',
        is_select: false
    },
    {
        image: require('./res/images/avatar.png'),
        name: 'Benh Bach Tang',
        is_select: false
    },
]

export const LOCATIONS_DATA = [
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    },
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    },
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    },
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    },
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    },
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    },
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    },
    {
        image: require('./res/images/ic_cinema.png'),
        title: 'Beer Vuvuzela',
        content: '744 Lang Island Suite 736',
    }
]

export const DEVICE_DATA = [
    {
        icon: require('./res/images/ic_iphone_x.png'),
        name: 'Iphone X',
    },
    {
        icon: require('./res/images/ic_samsung.png'),
        name: 'Galaxy Note 8',
    },
    {
        icon: require('./res/images/ic_iphone_x.png'),
        name: 'Iphone 6',
    },
    {
        icon: require('./res/images/ic_samsung.png'),
        name: 'Galaxy Note 10',
    }
]

export const TOP_CATEGORIES_DATA = [
    {
        icon: require('./res/images/ic_salary.png'),
        name: 'Salary',
        is_increase: false,
        total_money: '250.00'
    },
    {
        icon: require('./res/images/ic_restaurant.png'),
        name: 'Restaurant',
        is_increase: true,
        total_money: '180.00'
    },
    {
        icon: require('./res/images/ic_coffee.png'),
        name: 'Coffee',
        is_increase: false,
        total_money: '220.00'
    },
    {
        icon: require('./res/images/ic_salary.png'),
        name: 'Salary',
        is_increase: false,
        total_money: '500.00'
    },
    {
        icon: require('./res/images/ic_coffee.png'),
        name: 'Coffee',
        is_increase: true,
        total_money: '210.00'
    },
    {
        icon: require('./res/images/ic_coffee.png'),
        name: 'Coffee',
        is_increase: true,
        total_money: '150.00'
    },
]

export const PRICES = [
    {
        type: "Premium",
        price: "$13",
        date: "month",
        sale: "Save 48$ a year",
        icon: "ic_queen",
        is_remove_ads: true,
        unlimited_wallet: true,
        backup: true,
        share: true
    },
    {
        type: "Premium",
        price: "$13",
        date: "month",
        sale: "Save 48$ a year",
        icon: "ic_queen",
        is_remove_ads: true,
        unlimited_wallet: true,
        backup: true,
        share: true
    },
    {
        type: "Premium",
        price: "$13",
        date: "month",
        sale: "Save 48$ a year",
        icon: "ic_queen",
        is_remove_ads: true,
        unlimited_wallet: true,
        backup: true,
        share: true
    },
    {
        type: "Premium",
        price: "$13",
        date: "month",
        sale: "Save 48$ a year",
        icon: "ic_queen",
        is_remove_ads: true,
        unlimited_wallet: true,
        backup: true,
        share: true
    },
]

export const SORTS = [
    "Jump Today",
    "Sort by Week",
    "Sort by Month",
    "Sort by Year",
    "Sort by All Time",
    "Sort by Category",
    "Custom Range",
]

export const CAMERAROLL_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export const TIME_INTERVAL_BACKGROUND = 60 * 60 * 1000
export const TEXT_COLOR_DEFAULT = '#FFF'

export const ITEM_SUBS = Platform.select({
    ios: [
        'nash_bgm_20190108_350',
        'nash_bgm_20190108_450',
    ],
    android: [
        'nash_bgm_20190108_350',
        'nash_bgm_20190108_450'
    ],
});
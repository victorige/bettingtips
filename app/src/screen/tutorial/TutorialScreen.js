import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppText from "../../component/Text";
import {strings} from "../../config/i18n/i18n";
import {sizeHeight, sizeFont, sizeWidth} from "../../util/Size";
import {COLOR_APP_BLUE} from "../../../res/style/AppStyle";
import ItemTutorial from "./ItemTutorial";
//import Swiper from 'react-native-swiper';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {TUTORIAL_DATA} from "../../../Constant";
import NavigationActions from "../../router/NavigationActions";

export default class TutorialScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                { 
                  <SwiperFlatList
                   showPagination
                   paginationStyleItem={styles.activeDotStyle}
                   paginationStyle={styles.paginationStyle}
                   paginationActiveColor ={'#172866'}>
                    {
                        TUTORIAL_DATA.map((data, index) => {
                            return <ItemTutorial data={data} key={index}/>
                        })
                    }
    
                   </SwiperFlatList>
                }
                <AppText onPress={this.onPressSkip} style={styles.text_skip}>{'SKIP'}</AppText>
            </View>
        )
    }


    onPressSkip = async () => {
        try {
          await AsyncStorage.setItem('@skip_key', '4')
          NavigationActions.resetPage('Login')
        } catch (e) {
          alert('An error occured')
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_skip: {
        color: '#172866',
        top: sizeHeight(2),
        right: sizeWidth(3),
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3.5),
        fontWeight: '700',
        position: 'absolute'
    },
    wrapper: {},
    paginationStyle: {
        height: sizeHeight(40),
    },
    dotStyle: {
        color: '#172866',
    },
    activeDotStyle: {
        width: sizeWidth(3),
        height: sizeWidth(2),
        backgroundColor: '#172866',
    }
});

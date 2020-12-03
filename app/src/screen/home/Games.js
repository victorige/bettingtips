import React, {Component} from "react";
import {Image, StyleSheet, TouchableOpacity, ScrollView, View, Text} from 'react-native';
import {sizeHeight, sizeWidth, sizeFont} from "../../util/Size";
import styleApp from "../../../res/style/style";
import ToolBar from "../../component/ToolBar";
import {strings} from "../../config/i18n/i18n";
import AppText from "../../component/Text";
import Button from "../../component/Button";
import NavigationActions from "../../router/NavigationActions";
import Icon from "../../component/Icon";
import IconButton from "../../component/IconButton";
import DropDown from "../../component/DropDown";
import Fontello from "../../component/Fontello";
import AnimateInput from "../../component/animate-input";

 function Games({ navigation }) {
    
    //alert(navigation.state.params.otherParam)
        
        return (
            <View style={styles.container}>
                <ToolBar
                 center={<AppText style={styleApp.ToolBarText}>+{navigation.state.params.odds} Odds</AppText>}/>
                <View style={styles.view_main}>
                    <ScrollView>
                    {navigation.state.params.games.map((data) => (
                        <View key={data.id} style={styles.gameareaview}>
                            <View style={{marginVertical: sizeHeight(2), marginHorizontal: sizeWidth(4)}}>
                                <Text style={styles.match}>Match: {data.match}</Text>
                                <Text style={styles.odds}>Odds: {data.odd}</Text>
                                <Text style={styles.ccc}>Tip Type: {data.tiptype}</Text>
                                <Text style={styles.tip}>Tip: {data.tip}</Text>
                                <Text style={styles.ccc}>Sport: {data.sport}</Text>
                                <Text style={styles.ccc}>League: {data.league}</Text>
                            </View>
                        </View>

                    ))}
                        
                    </ScrollView>
                </View>
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view_main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c2c2c2'
    },
    gameareaview: {
        width: sizeWidth(85.75),
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: sizeWidth(12.5),
        borderRadius: sizeWidth(5.5),
        backgroundColor: '#ffffff',
        marginHorizontal: sizeWidth(8.5),
        marginVertical: sizeHeight(1)
    },
    match: {
        color: '#000077',
        fontFamily: 'sf-black',
        fontSize: sizeFont(3.5),
        fontWeight: '900',
        right: sizeWidth(0),
        left: sizeWidth(0),
    },
    odds: {
        opacity: 0.8,
        color: 'green',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3.75),
        fontWeight: '700',
    },
    ccc: {
        opacity: 0.8,
        color: '#000077',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3.75),
        fontWeight: '700',
    },
    tip: {
        opacity: 0.8,
        color: 'red',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3.75),
        fontWeight: '700',
    },

    
});

export default Games


import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {sizeFont, sizeWidth} from "../util/Size";

export default class BottomTabItem extends Component {

    render() {
        const {icon, active, badge} = this.props;
        let style = !active ? styles.Icon : styles.IconActive;

        return (
            <View>
                <Image resizeMode={'contain'} style={style} source={icon}/>
                {/*{ badge && this.renderNotifyNumber(2)}*/}
            </View>
        );
    }

    renderNotifyNumber = (num) => {
        num = num > 5 ? '5+' : num.toString();
        return (
            <View style={styles.numberContainer}>
                <Text style={{color: 'white', fontSize: sizeFont(3), fontWeight: 'bold'}}>{num}</Text>
            </View>
        );
    };
}

BottomTabItem.propTypes = {
    icon: PropTypes.any,
};

const styles = StyleSheet.create({
    Icon: {
        width: sizeWidth(5.3),
        height: sizeWidth(5.3),
    },
    IconActive: {
        width: sizeWidth(5.3),
        height: sizeWidth(5.3),
        tintColor: 'white'
    },
    CameraActive: {
        width: sizeWidth(15),
        height: sizeWidth(15),
        marginTop: sizeWidth(-1),
    },
    numberContainer: {
        height: sizeWidth(4.4),
        width: sizeWidth(4.4),
        borderRadius: sizeWidth(2.2),
        alignItems: 'center',
        position: 'absolute',
        top: sizeWidth(-2),
        right:sizeWidth(-2),
        backgroundColor: '#F6353E',
        borderColor: '#014009',
        borderWidth: 1,
    }
});

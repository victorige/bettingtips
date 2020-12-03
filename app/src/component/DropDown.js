import React, {Component} from "react";
import {Platform, StyleSheet, TouchableHighlight, View} from "react-native";
import ModalDropdown from "./ModalDropdown";
import PropTypes from 'prop-types';
import Text from "./Text";
import {sizeFont, sizeWidth} from "../util/Size";
import {APP_COLOR} from "../../res/style/AppStyle";

export default class DropDown extends Component {

    static propTypes = {
        data: PropTypes.any.isRequired,
        defaultValue: PropTypes.any,
        style: PropTypes.any,
        styleText: PropTypes.any,
        styleDropDown: PropTypes.any,
        styleDrop: PropTypes.any,
        onSelect: PropTypes.func
    };

    render() {
        const {typeTheme, data, defaultValue, style, styleDropDown, onSelect, styleText} = this.props;
        const count = data.length;
        const DROPDOWN = StyleSheet.flatten([styles.dropdown, {
            // borderColor: typeTheme.otc.BORDER,
            // backgroundColor: typeTheme.otc.BACKGROUND_INPUT,
        }]);

        const drop_down = data.length <= 5 ? [styles.dropdown_select, {height: sizeWidth(9) * count}] : styles.dropdown_select_Height;
        return (
            <ModalDropdown
                ref={(drop_down) => {
                    this.drop_down = drop_down
                }}
                style={[styles.dropdown, DROPDOWN, style]}
                textStyle={[styles.text, styleText]}
                dropdownStyle={[drop_down, styleDropDown]}
                options={data || []}
                key={defaultValue}
                defaultValue={defaultValue}
                renderButtonText={(rowData) => this._dropdown_renderButtonText(rowData)}
                renderRow={this._dropdown_renderRow}
                onSelect={onSelect}
            />
        );
    }

    onReset = () => {
        this.drop_down.select(-1)
    };

    _dropdown_renderButtonText = (rowData) => {
        const name = rowData && rowData.name;
        return <Text style={{fontSize: sizeFont(3.73)}}>{name}</Text>;
    };

    _dropdown_renderRow = (rowData) => {
        const {defaultValue} = this.props;
        const color = rowData.name === defaultValue ? APP_COLOR : "#000";
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[{
                    justifyContent: "center",
                    paddingVertical: sizeWidth(1),
                    height: sizeWidth(9)
                }]}>
                    <Text
                        style={[styles.text, {color, paddingVertical: sizeWidth(1)}]}>
                        {rowData.name || rowData}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}


const platform = Platform.OS === 'ios' ? sizeWidth(4) : sizeWidth(-3);

const styles = StyleSheet.create({
    container: {
        marginVertical: sizeWidth(2),
    },
    drop: {
        padding: sizeWidth(0),
        alignItems: "center",
        marginTop: sizeWidth(2),
    },
    image: {
        marginRight: sizeWidth(3)
    },
    dropdown: {
        padding: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: sizeWidth(10),
    },
    text: {
        fontSize: sizeWidth(3.73),
        margin: 0,
        paddingHorizontal: sizeWidth(2),
        textAlignVertical: "center",
    },
    dropdown_select: {
        marginTop: platform,
    },
    dropdown_select_Height: {
        marginTop: platform,
        height: sizeWidth(10) * 5,
    },
    texdf: {
        fontSize: sizeWidth(3.73),
    }
});
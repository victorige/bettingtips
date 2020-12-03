import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    DatePickerAndroid,
    TimePickerAndroid,
    Animated,
    Keyboard
} from 'react-native';
import Moment from 'moment';
import Style from "../../res/style/style";
import {sizeFont, sizeWidth} from "../util/Size";

const FORMATS = {
    'date': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD HH:mm',
    'time': 'HH:mm'
};

class CustomDatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.getDate(),
            modalVisible: false,
            animatedHeight: new Animated.Value(0),
            allowPointerEvents: true
        };

        this.getDate = this.getDate.bind(this);
        this.getDateStr = this.getDateStr.bind(this);
        this.datePicked = this.datePicked.bind(this);
        this.onPressDate = this.onPressDate.bind(this);
        this.onPressCancel = this.onPressCancel.bind(this);
        this.onPressConfirm = this.onPressConfirm.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onPressMask = this.onPressMask.bind(this);
        this.onTimePicked = this.onTimePicked.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.date !== this.props.date) {
            this.setState({date: this.getDate(nextProps.date)});
        }
    }

    setModalVisible(visible) {
        const {height, duration} = this.props;

        // slide animation
        if (visible) {
            this.setState({modalVisible: visible});
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: height,
                    duration: duration
                }
            ).start();
        } else {
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: 0,
                    duration: duration
                }
            ).start(() => {
                this.setState({modalVisible: visible});
            });
        }
    }

    onStartShouldSetResponder(e) {
        return true;
    }

    onMoveShouldSetResponder(e) {
        return true;
    }

    onPressMask() {
        if (typeof this.props.onPressMask === 'function') {
            this.props.onPressMask();
        } else {
            this.onPressCancel();
        }
    }

    onPressCancel() {
        this.setModalVisible(false);

        if (typeof this.props.onCloseModal === 'function') {
            this.props.onCloseModal();
        }
    }

    onPressConfirm() {
        this.datePicked();
        this.setModalVisible(false);

        if (typeof this.props.onCloseModal === 'function') {
            this.props.onCloseModal();
        }
    }

    getDate(date = this.props.date) {
        const {mode, minDate, maxDate, format = FORMATS[mode]} = this.props;
        if (!date) {
            let now = new Date('2018-01-01');
            if (minDate) {
                let _minDate = this.getDate(minDate);

                if (now < _minDate) {
                    return _minDate;
                }
            }

            if (maxDate) {
                let _maxDate = this.getDate(maxDate);

                if (now > _maxDate) {
                    return _maxDate;
                }
            }
            return now;
        }

        if (date instanceof Date) {
            return date;
        }

        return Moment(date, format).toDate();
    }

    getDateStr(date = this.props.date) {
        const {mode, format = FORMATS[mode]} = this.props;
        const dateInstance = date instanceof Date
            ? date
            : this.getDate(date);
        const hours = Moment(dateInstance).format(format).split(':')[0];
        const minutes = Moment(dateInstance).format(format).split(':')[1];
        return this.timeDisplay(hours, minutes);
    }

    datePicked() {
        if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(this.getDateStr(this.state.date));
        }
    }

    getTitleElement() {
        const {date, placeholder, customStyles, allowFontScaling} = this.props;

        if (!date && placeholder) {
            return (
                <Text allowFontScaling={allowFontScaling} style={[Style.placeholderText, customStyles.placeholderText]}>
                    {placeholder}
                </Text>
            );
        }
        return (
            <Text allowFontScaling={allowFontScaling} style={[Style.dateText, customStyles.dateText]}>
                {this.getDateStr()}
            </Text>
        );
    }

    onDateChange(date) {
        this.setState({
            allowPointerEvents: false,
            date: date
        });
        const timeoutId = setTimeout(() => {
            this.setState({
                allowPointerEvents: true
            });
            clearTimeout(timeoutId);
        }, 200);
    }

    onTimePicked({action, hour, minute}) {
        if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                date: Moment().hour(hour).minute(minute).toDate()
            });
            this.datePicked();
        } else {
            this.onPressCancel();
        }
    }

    onPressDate() {
        Keyboard.dismiss();
        // reset state
        this.setState({
            date: this.getDate()
        });
        const {mode, androidMode, format = FORMATS[mode], is24Hour = !format.match(/h|a/)} = this.props;
        if (mode === 'time') {
            // 选时间
            let timeMoment = Moment(this.state.date);
            TimePickerAndroid.open({
                hour: timeMoment.hour(),
                minute: timeMoment.minutes(),
                is24Hour: is24Hour,
                mode: androidMode
            }).then(this.onTimePicked);
        }
    }

    _renderIcon() {
        const {
            showIcon,
            iconSource,
            iconComponent,
            customStyles
        } = this.props;

        if (showIcon) {
            if (iconComponent) {
                return iconComponent;
            }
            return (
                <Image
                    style={[Style.dateIcon, customStyles.dateIcon]}
                    source={iconSource}
                />
            );
        }

        return null;
    }

    render() {
        const {
            style,
            customStyles,
            disabled,
            TouchableComponent,
            testID,
        } = this.props;

        const dateInputStyle = [
            Style.dateInput, customStyles.dateInput,
            disabled && Style.disabled,
            disabled && customStyles.disabled
        ];

        return (
            <TouchableComponent
                style={[Style.dateTouch, style]}
                underlayColor={'transparent'}
                onPress={this.onPressDate}
                testID={testID}
            >
                <View style={[Style.dateTouchBody, customStyles.dateTouchBody]}>
                    {
                        <View style={[dateInputStyle, {
                            flexDirection: 'row', justifyContent: 'flex-start',
                            marginLeft: sizeWidth(7)
                        }]}>
                            <Text
                                style={{fontSize: sizeFont(4.2), color: 'black', width: sizeWidth(15)}}>Time</Text>
                            {this.getTitleElement()}
                        </View>
                    }
                    {this._renderIcon()}
                </View>
            </TouchableComponent>
        );
    }

    timeDisplay = (hour, minute) => {
        const time = ((parseInt(hour) > 0 ? hour + "h" : "0h")
            + "" + (parseInt(minute) > 0 ? minute + "m" : ""));
        return parseInt(hour) || parseInt(minute) ? time : null
    };
}

CustomDatePicker.defaultProps = {
    mode: 'date',
    androidMode: 'default',
    date: '',
    height: 259,

    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    confirmBtnText: '确定',
    cancelBtnText: '取消',
    iconSource: require('../../res/images/date_icon.png'),
    customStyles: {},

    // whether or not show the icon
    showIcon: true,
    disabled: false,
    allowFontScaling: true,
    hideText: false,
    placeholder: '',
    TouchableComponent: TouchableHighlight,
    modalOnResponderTerminationRequest: e => true
};

CustomDatePicker.propTypes = {
    mode: PropTypes.oneOf(['date', 'datetime', 'time']),
    androidMode: PropTypes.oneOf(['clock', 'calendar', 'spinner', 'default']),
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.object]),
    format: PropTypes.string,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    height: PropTypes.number,
    duration: PropTypes.number,
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    iconComponent: PropTypes.element,
    customStyles: PropTypes.object,
    showIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    onDateChange: PropTypes.func,
    onOpenModal: PropTypes.func,
    onCloseModal: PropTypes.func,
    onPressMask: PropTypes.func,
    placeholder: PropTypes.string,
    modalOnResponderTerminationRequest: PropTypes.func,
    is24Hour: PropTypes.bool,
    getDateStr: PropTypes.func,
    locale: PropTypes.string
};

export default CustomDatePicker;

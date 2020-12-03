import {
    Dimensions,
    Platform,
    DeviceInfo,
    NativeModules
} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;

const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window');
const {PlatformConstants = {}} = NativeModules;
const {minor = 0} = PlatformConstants.reactNativeVersion || {};

export const isIPhoneX = () => {
    if (Platform.OS === 'android') return false;

    if (minor >= 50) {
        return DeviceInfo.isIPhoneX_deprecated;
    }

    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    );
};

export const isIPad = () => {
    if (Platform.OS !== 'ios' || isIPhoneX) return false;

    // if portrait and width is smaller than iPad width
    if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
        return false;
    }

    // if landscape and height is smaller that iPad height
    return !(D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH);
};
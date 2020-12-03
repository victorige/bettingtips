import I18n from 'react-native-i18n';
import ja from '../../../res/string/ja.json';
import en from '../../../res/string/en.json';

I18n.fallbacks = true;
I18n.translations = {
    ja,
    en,
};

I18n.locale = I18n.currentLocale()

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
    return I18n.t(name, params);
}

export const getLocale = (language) => {
    if (language.includes('ja')) {
        return 'ja'
    }
    return 'en'
}

export default I18n;

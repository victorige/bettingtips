import {AsyncStorage} from 'react-native';

const KEY_TOKEN = 'access_token';
const FCM_TOKEN = 'fcm_token';
const LANGUAGE = 'language';
const CURRENT_MUSIC = 'current_music';
const ALL_MUSIC_REPEAT = 'all_music_repeat';

export const saveFCMToken = (fCMToken) => AsyncStorage.setItem(FCM_TOKEN, fCMToken);

export const getFCMToken = () => {
    return AsyncStorage.getItem(FCM_TOKEN);
};

export const saveToken = (token) => AsyncStorage.setItem(KEY_TOKEN, token);

export const getToken = () => {
    return AsyncStorage.getItem(KEY_TOKEN);
};

export const saveLanguage = (language) => AsyncStorage.setItem(LANGUAGE, language);

export const getLanguage = () => {
    return AsyncStorage.getItem(LANGUAGE);
};

export const saveMusicRepeat = (repeat) => AsyncStorage.setItem(ALL_MUSIC_REPEAT, JSON.stringify(repeat));

export const getMusicRepeat = () => {
    return AsyncStorage.getItem(ALL_MUSIC_REPEAT);
};

export const removeToken = () => AsyncStorage.removeItem(KEY_TOKEN);

export const saveCurrentMusicToStore = (json) => AsyncStorage.setItem(CURRENT_MUSIC, json);
export const getCurrentMusic = () => {
    return AsyncStorage.getItem(CURRENT_MUSIC);
};
export const removeCurrentMusic = () => AsyncStorage.removeItem(CURRENT_MUSIC);
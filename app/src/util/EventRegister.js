
export const ON_SLIDING_COMPLETE = 'ON_SLIDING_COMPLETE';
export const ADD_MUSIC_TO_PLAYLIST = 'ADD_MUSIC_TO_PLAYLIST';
export const RELOAD_NEWS = 'RELOAD_NEWS';
export const PAYMENT_EXPIRED = 'PAYMENT_EXPIRED';
export const GET_TOTAL_NEWS = 'GET_TOTAL_NEWS';
export const NEXT_MUSIC = 'NEXT_MUSIC';
export const ON_PRESS_PLAY = 'ON_PRESS_PLAY';
export const ON_PRESS_PREV = 'ON_PRESS_PREV';
export const ON_PRESS_NEXT = 'ON_PRESS_NEXT';
export const RESET_REQUEST = 'RESET_REQUEST';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export default class EventRegister {

    static listeners = {
        count: 0,
        refs: {},
    };

    static addEventListener(eventName, callback) {
        if (
            typeof(eventName) === 'string' &&
            typeof(callback) === 'function'
        ) {
            EventRegister.listeners.count++;
            const eventId = 'l' + EventRegister.listeners.count;
            EventRegister.listeners.refs[eventId] = {
                name: eventName,
                callback,
            };
            return eventId
        }
        return false
    }

    static removeEventListener(id) {
        if (typeof(id) === 'string') {
            return delete EventRegister.listeners.refs[id]
        }
        return false
    }

    static removeAllListeners() {
        let removeError = false;
        Object.keys(EventRegister.listeners.refs).forEach(id => {
            const removed = delete EventRegister.listeners.refs[id];
            removeError = (!removeError) ? !removed : removeError
        });
        return !removeError
    }

    static emitEvent(eventName, data) {
        Object.keys(EventRegister.listeners.refs).forEach(id => {
            if (
                EventRegister.listeners.refs[id] &&
                eventName === EventRegister.listeners.refs[id].name
            )
                EventRegister.listeners.refs[id].callback(data)
        })
    }


    static on(eventName, callback) {
        return EventRegister.addEventListener(eventName, callback)
    }

    static off(eventName) {
        return EventRegister.removeEventListener(eventName)
    }

    static offAll() {
        return EventRegister.removeAllListeners()
    }

    static emit(eventName, data) {
        EventRegister.emitEvent(eventName, data)
    }

}

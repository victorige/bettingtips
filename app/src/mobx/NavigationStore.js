import {action, observable} from 'mobx'
import EventRegister, {RESET_REQUEST} from "../util/EventRegister";

export default class NavigationStore {

    @observable navigation = {
        prevScreen: null,
        currentScreen: null
    }

    @action onChangeNavigation(prevScreen, currentScreen) {
        if (prevScreen === 'EmptyMenu') EventRegister.emit(RESET_REQUEST)
        if (currentScreen === 'Search') {
            this.navigation = {prevScreen: null, currentScreen}
        } else {
            this.navigation = {prevScreen, currentScreen}
        }
    }
}
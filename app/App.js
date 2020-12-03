import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import LoadingView from "./src/component/LoadingView";
import {AppContainer} from "./src/router/AppRouter";
import NavigationActions from "./src/router/NavigationActions";
import {inject, observer} from "mobx-react";
import {STATUS_BAR_HEIGHT} from "./Constant";
import OneSignal from 'react-native-onesignal'; 

@inject('loadingStore')
@inject('navigationStore')
@observer
export default class App extends Component {

    constructor(properties) {
        super(properties);
        //Remove this method to stop OneSignal Debugging 
        //OneSignal.setLogLevel(6, 0);
        
        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init("6474ad8d-1fab-4bab-b437-b069d280aa90", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
        OneSignal.enableVibrate(true);
        OneSignal.enableSound(true);

        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
      
         OneSignal.addEventListener('received', this.onReceived);
         OneSignal.addEventListener('opened', this.onOpened);
         OneSignal.addEventListener('ids', this.onIds);
      }

    componentDidMount() {
        // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
    }

    componentWillUnmount() {
        // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        //console.log("Notification received: ", notification);
      }
    
      onOpened(openResult) {
        //console.log('Message: ', openResult.notification.payload.body);
        //console.log('Data: ', openResult.notification.payload.additionalData);
        //console.log('isActive: ', openResult.notification.isAppInFocus);
        //console.log('openResult: ', openResult);
      }
    
      onIds(device) {
        //console.log('Device info: ', device);
      }
    

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.statusBar}>
                    <StatusBar
                        translucent={true}
                    />
                </View>
                <AppContainer ref={ref => NavigationActions.setTopLevelNavigator(ref)}
                              onNavigationStateChange={this.handleNavigationChange}/>
                <LoadingView/>
            </View>
        );
    }

    handleNavigationChange = (prevState, newState) => {
        const currentScreen = getActiveRouteName(newState)
        const prevScreen = getActiveRouteName(prevState)
        if (prevScreen !== currentScreen) {
            this.props.navigationStore.onChangeNavigation(prevScreen, currentScreen)
        }
    }
}

    function myiOSPromptCallback(permission){
        // do something with permission value
    }

const styles = StyleSheet.create({
    statusBar: {
        height: STATUS_BAR_HEIGHT,
    }
});

const getActiveRouteName = (navigationState) => {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}
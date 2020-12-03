import React, {Component} from "react";
import {Platform, ImageBackground, Image, StyleSheet, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import {sizeHeight, sizeWidth, sizeFont} from "../../util/Size";
import DialogUtil from "../../util/DialogUtil";
import ToolBar from "../../component/ToolBar";
import {strings} from "../../config/i18n/i18n";
import AppText from "../../component/Text";
import Button from "../../component/Button";
import NavigationActions from "../../router/NavigationActions";
import Icon from "../../component/Icon";
import DropDown from "../../component/DropDown";
import Fontello from "../../component/Fontello";
import AnimateInput from "../../component/animate-input";
import axios from 'axios';
import { getUniqueId } from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';
import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    acknowledgePurchaseAndroid,
    consumePurchaseAndroid,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
  } from 'react-native-iap';

  const itemSkus = Platform.select({
    android: [
      'android.test.purchased'
    ],
  });

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default class Main extends Component {
    state = {
        productList: [],
        name: '',
        coins: 0,
        games: [],
        betgames: [],
        g1: 0,
        g2: 0,
        g3: 0,
        daily: 0,
        spinner: true
    }

    async componentDidMount(){
        try {
            await RNIap.initConnection();
            await RNIap.consumeAllItemsAndroid();
          } catch (err) {}



          purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase: InAppPurchase | SubscriptionPurchase) => {
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                this.setState({
                    spinner: true
                })
                try {
                    const uniqueid = await getUniqueId()
                    const response = await axios.post("https://oforum.ng/api/betcoin", {
                        deviceid: uniqueid,
                        purchase: purchase
                    }, {
                            headers: {
                                securepass: 'k$w;8f:XrwLp{x3('
                            } 
                        });
                        if(response.status == 200 && response.data.success == true){
                            await acknowledgePurchaseAndroid(purchase.purchaseToken);
                            await finishTransaction(purchase);
                           
                           this.setState({
                            spinner: false
                            })

                           return DialogUtil.showMessageDialog("Success", "Your purchase of 100 coins was successful", "Okay", () => this.reload())
                        }
                        this.setState({
                            spinner: false
                        })
                        return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK', () => this.reload());
                    
                  } catch (error) {
                    this.setState({
                        spinner: false
                    })
                    return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK', () => this.reload());
                       
                  }

              }
            },
          );

          purchaseErrorSubscription = purchaseErrorListener(
            (error: PurchaseError) => {},
          );

          try {
            await RNIap.getProducts(itemSkus);
          } catch (err) {}

          
          
        try {
            const uniqueid = await getUniqueId()
            const response = await axios.get("https://oforum.ng/api/betlist/" + uniqueid, {
                    headers: {
                        securepass: 'k$w;8f:XrwLp{x3('
                    } 
                });
                if(response.status == 200 && response.data.success == true){
                   return this.setState({
                        name: response.data.user.name,
                        coins: response.data.user.coins,
                        games: response.data.games,
                        betgames: response.data.betgames,
                        g1: response.data.user.package1,
                        g2: response.data.user.package2,
                        g3: response.data.user.package3,
                        daily: response.data.betinfos.daily,
                        spinner: false
                    })
                }
                this.setState({
                    spinner: false
                })
                return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK', () => this.reload());
            
          } catch (error) {
                
            this.setState({
                spinner: false
            })
            return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK', () => this.reload());
               
          }
    }

    componentWillUnmount() {
        if (purchaseUpdateSubscription) {
          purchaseUpdateSubscription.remove();
          purchaseUpdateSubscription = null;
        }
        if (purchaseErrorSubscription) {
          purchaseErrorSubscription.remove();
          purchaseErrorSubscription = null;
        }
        RNIap.endConnection();
      }

      requestPurchase = async (sku) => {
        try {
          await RNIap.requestPurchase(sku);
        } catch (err) {
          alert('Payment Failed')
        }
      };

    render() {
        
        return (
           
                <ImageBackground style={styles.backgroundImage} source={require('../../../res/images/ic_main.png')}>
                    <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    />

                <View style={styles.topbar}>
                    <View style={styles.topbarview}>
                        <Text style={styles.texttopbar}>Main Menu</Text>
                        <TouchableOpacity style={styles.texttopbarr} onPress={() => this.reload()}>
                            <Text style={styles.texttopbarrr}>[Refresh]</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
               
                <View style={styles.gamearea}>
                    <ScrollView>
                    {this.state.betgames.map((data) => (

                        <TouchableOpacity key={data._id} onPress={() => this.viewgame(data.games, data.odds, data.gameid)} style={styles.gameareaview}>
                            <View key={data.id} style={{marginVertical: sizeHeight(2), marginHorizontal: sizeWidth(4)}}>
                                <Text style={styles.odds}>+{data.odds} Odds</Text>
                                <Text style={styles.total}>Total Match: {data.games.length}</Text>
                                <Text style={styles.time}>{data.date} GMT</Text>

                                {data.status == 1 && <Text style={styles.statusy}>Status: Waiting</Text>}
                                {data.status == 2 && <Text style={styles.statusg}>Status: Won</Text>}
                                {data.gameid == 1 && this.state.g1 != this.state.daily && <Text style={styles.lock}>LOCKED</Text>}
                                {data.gameid == 2 && this.state.g2 != this.state.daily && <Text style={styles.lock}>LOCKED</Text>}
                                {data.gameid == 3 && this.state.g3 != this.state.daily && <Text style={styles.lock}>LOCKED</Text>}
                                {data.gameid == 1 && this.state.g1 == this.state.daily && <Text style={styles.unlock}>UNLOCKED</Text>}
                                {data.gameid == 2 && this.state.g2 == this.state.daily && <Text style={styles.unlock}>UNLOCKED</Text>}
                                {data.gameid == 3 && this.state.g3 == this.state.daily && <Text style={styles.unlock}>UNLOCKED</Text>}
                                
                                {data.gameid == 1 && this.state.g1 != this.state.daily &&  <Text style={styles.message}>Buy this coupon for {data.type == 1 && 25}{data.type == 2 && 50}{data.type == 3 && 100} coins</Text>}
                                {data.gameid == 2 && this.state.g2 != this.state.daily &&  <Text style={styles.message}>Buy this coupon for {data.type == 1 && 25}{data.type == 2 && 50}{data.type == 3 && 100} coins</Text>}
                                {data.gameid == 3 && this.state.g3 != this.state.daily &&  <Text style={styles.message}>Buy this coupon for {data.type == 1 && 25}{data.type == 2 && 50}{data.type == 3 && 100} coins</Text>}

                            </View>
                        </TouchableOpacity>

                    ))}
                    <Text style={styles.texttopbar1}>Previous 10 Days</Text>
                    {this.state.games.map((data) => (

                        <TouchableOpacity key={data._id} onPress={() => this.gotogame(data.games, data.odds)} style={styles.gameareaview}>
                            <View key={data.id} style={{marginVertical: sizeHeight(2), marginHorizontal: sizeWidth(4)}}>
                                <Text style={styles.odds}>+{data.odds} Odds</Text>
                                <Text style={styles.total}>Total Match: {data.games.length}</Text>
                                <Text style={styles.time}>{data.date} GMT</Text>

                                {data.status == 1 && <Text style={styles.statusy}>Status: Waiting</Text>}
                                {data.status == 2 && <Text style={styles.statusg}>Status: Won</Text>}
                                {data.status == 3 && <Text style={styles.statusr}>Status: Lost</Text>}

                                <Text style={styles.unlock}>UNLOCKED</Text>
                            </View>
                        </TouchableOpacity>

                    ))}



                    </ScrollView>
                </View>

                <View style={styles.bottomview}>
                    <View style={styles.bbb}>
                        <View style={styles.c1}>
                            <View style={styles.option}>
                                <Text style={styles.text3}>{this.state.name}</Text>
                                <Image style={styles.icon} source={require('../../../res/images/ic_user.png')}/>
                            </View>
                        </View>

                        <View style={styles.c2}>
                            <View style={styles.option}>
                                <Text style={styles.text1}>COINS</Text>
                                <Text style={styles.text2}>{this.state.coins}</Text>
                                <Image style={styles.icon} source={require('../../../res/images/ic_coins.png')}/>
                            </View>
                        </View>
                    </View>

                    <Button onPress={() => this.buycoins()} text={'Buy 100 Coins'}/>
                </View>

                
                
               </ImageBackground>
            
        )
    }
    gotogame = (games, odds) => {
        NavigationActions.navigate('Games', {
            games: games,
            odds: odds,
          })
    }

    viewgame = (games, odds, gameid) => {
        if(gameid == 1 && this.state.g1 != this.state.daily){
            this.buy(gameid)
        }else if(gameid == 2 && this.state.g2 != this.state.daily){
            this.buy(gameid)
        }else if(gameid == 3 && this.state.g3 != this.state.daily){
            this.buy(gameid)
        }else{
            NavigationActions.navigate('Games', {
                games: games,
                odds: odds,
              })
        }
    }

    buy = (id) =>{
        if(id == 1 ){
            DialogUtil.showConfirmDialog("Buy", "Buy for 25 coins", "Buy", "Cancel", () => this.dbuy(25, 1) )
        }
        if(id == 2 ){
            DialogUtil.showConfirmDialog("Buy", "Buy for 50 coins", "Buy", "Cancel", () => this.dbuy(50, 2))
        }
        if(id == 3 ){
            DialogUtil.showConfirmDialog("Buy", "Buy for 100 coins", "Buy", "Cancel", () => this.dbuy(100, 3))
        }
    }

    dbuy(id, pid) {
        if(this.state.coins < id){
            DialogUtil.showConfirmDialog("Insufficient Coins", "You don't have enough coins to buy this coupon", "Buy Coins", "Cancel", () => this.buycoins())
        }else{
            this.packagecoins(pid)
        }
    }

    packagecoins = async (id) => {
        this.setState({
            spinner: true
        })
        try {
            const uniqueid = await getUniqueId()
            const response = await axios.post("https://oforum.ng/api/betpackage", {
                deviceid: uniqueid,
                package: id
            }, {
                    headers: {
                        securepass: 'k$w;8f:XrwLp{x3('
                    } 
                });
                if(response.status == 200 && response.data.success == true){
                   if(response.data.purchase == 0){
                    this.setState({
                        spinner: false
                    })
                        return DialogUtil.showConfirmDialog("Insufficient Coins", "You don't have enough coins to buy this coupon", "Buy Coins", "Cancel", () => this.buycoins())
                   }

                   this.setState({
                    spinner: false
                })
                   return DialogUtil.showMessageDialog("Success", "You can now view your coupon", "Okay", () => this.reload())
                }
                this.setState({
                    spinner: false
                })
                return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK', () => this.reload());
            
          } catch (error) {
            this.setState({
                spinner: false
            })
            return DialogUtil.showMessageDialog('Error', 'Check your internet connection and try again', 'OK', () => this.reload());
               
          }

    }

    buycoins = () => {
        this.requestPurchase('android.test.purchased')
    }

    reload(){
        return NavigationActions.resetPage('Main')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
   
    topbar: {
        shadowColor: 'rgba(0, 0, 0, 0.06)',
        shadowOffset: { width: 0, height: sizeHeight(12.5) },
        shadowRadius: sizeWidth(12.5),
        borderRadius: sizeWidth(7.5),
        borderColor: '#e5e5f1',
        borderStyle: 'solid',
        borderWidth: sizeWidth(0.25),
        backgroundColor: '#ffffff',
        marginHorizontal: sizeWidth(8.5),
        top: sizeHeight(5),
        
    },
    time: {
        opacity: 0.6,
        color: '#000077',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3),
        fontWeight: '700',
    },
    odds: {
        position: 'absolute',
        left: sizeWidth(55),
        right: sizeWidth(0),
        top: sizeHeight(2.5),
        color: '#000077',
        fontFamily: 'sf-semibold',
        fontSize: sizeFont(3.5),
        fontWeight: '600',
    },
    message:{
        position: 'absolute',
        top: sizeHeight(4.6),
        opacity: 0.66,
        color: 'red',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3),
        fontWeight: '700',
    },
    total: {
        position: 'absolute',
        left: sizeWidth(25.7),
        right: sizeWidth(0),
        top: sizeHeight(2.5),
        color: '#000077',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3),
        fontWeight: '700',
    },
    statusy: {
        position: 'absolute',
        top: sizeHeight(2.5),
        color: '#a3691f',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3),
        fontWeight: '700',
    },
    statusg: {
        position: 'absolute',
        top: sizeHeight(2.5),
        color: 'green',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3),
        fontWeight: '700',
    },
    statusr: {
        position: 'absolute',
        top: sizeHeight(2.5),
        color: 'red',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(3),
        fontWeight: '700',
    },
    lock: {
        position: 'absolute',
        top: sizeHeight(0),
        right: sizeWidth(0),
        color: 'red',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(2.5),
        fontWeight: '700',
    },
    unlock: {
        position: 'absolute',
        top: sizeHeight(0),
        right: sizeWidth(0),
        color: 'green',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(2.5),
        fontWeight: '700',
    },
    gamearea: {
        top: sizeHeight(8),
        height: sizeHeight(53),
        position: 'relative',
    },
    gameareaview: {
        width: sizeWidth(85.75),
        height: sizeHeight(10),
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: sizeWidth(12.5),
        borderRadius: sizeWidth(5.5),
        backgroundColor: '#ffffff',
        marginHorizontal: sizeWidth(8.5),
        marginVertical: sizeHeight(1)
    },

    texttopbar: {
        color: '#000077',
        fontFamily: 'sf-black',
        fontSize: sizeFont(3.5),
        fontWeight: '900',
        lineHeight: sizeHeight(3.5),
       
        
    },

    texttopbar1: {
        color: '#000077',
        fontFamily: 'sf-black',
        fontSize: sizeFont(3.5),
        fontWeight: '900',
        lineHeight: sizeHeight(3.5),
        marginHorizontal: sizeWidth(12.5),
    },

    texttopbarr: {
        position: 'absolute',
        right: sizeWidth(2.5)
    },
    texttopbarrr: {
        color: 'black',
        fontFamily: 'sf-black',
        fontSize: sizeFont(3),
        fontWeight: '900',
        lineHeight: sizeHeight(3.5),
    },

    topbarview: {
        alignItems: 'center',
        marginVertical: sizeHeight(2)
    },

    bottomview: {
        bottom: sizeHeight(3),
        width: '100%',
        position: 'absolute',
        
    },

    bbb: {
        flexDirection: 'row'
    },

    option: {
        width: sizeWidth(38.25),
        height: sizeHeight(13.25),
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: sizeHeight(2.5) },
        shadowRadius: sizeWidth(12.5),
        borderRadius: sizeWidth(7.5),
        backgroundColor: '#ffffff',
        bottom: sizeHeight(3),
    },

    c1: {
        left:  sizeWidth(0),
        marginHorizontal: sizeWidth(5.5)
    },

    c2: {
        right:  sizeWidth(0),
        marginHorizontal: sizeWidth(5.5)
    },

    text1: {
        opacity: 0.8,
        color: '#000077',
        fontFamily: 'sf-bold',
        fontSize: sizeFont(2.75),
        fontWeight: '700',
        position: 'absolute',
        top: sizeHeight(7.5),
        left: sizeWidth(13.25)
    },

    text2: {
        color: '#000077',
        fontFamily: 'sf-black',
        fontSize: sizeFont(5),
        fontWeight: '900',
        position: 'absolute',
        top: sizeHeight(3.5),
        left: sizeWidth(13.25)
    },
    text3: {
        color: '#000077',
        fontFamily: 'sf-black',
        fontSize: sizeFont(3),
        fontWeight: '900',
        position: 'absolute',
        top: sizeHeight(5.5),
        left: sizeWidth(13.25)
    },
    icon: {
        width: sizeWidth(6),
        height: sizeHeight(3),
        position: 'absolute',
        left: sizeWidth(5.5),
        top: sizeHeight(5)
    }
   
});
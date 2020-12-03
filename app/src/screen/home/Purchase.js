import React, {Component} from "react";
import {Platform, Alert, ImageBackground, Image, StyleSheet, ScrollView, TouchableOpacity, View, Text} from 'react-native';
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
    ios: [
      'com.cooni.point1000',
      'com.cooni.point5000', // dooboolab
    ],
    android: [
      'android.test.purchased',
      'android.test.canceled',
      'android.test.refunded',
      'android.test.item_unavailable',
      'point_1000'
      // 'point_1000', '5000_point', // dooboolab
    ],
  });

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default class Purchase extends Component {
    state = {
        productList: [],
        receipt: '',
        availableItemsMessage: '',
    }

    async componentDidMount() {
        
        try {
            await RNIap.initConnection();
            await RNIap.consumeAllItemsAndroid();
          } catch (err) {}

          purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase: InAppPurchase | SubscriptionPurchase) => {
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                try {
                  //consumePurchaseAndroid(purchase.purchaseToken);
                  

                  await acknowledgePurchaseAndroid(purchase.purchaseToken);
                  await finishTransaction(purchase);
                
                  
                } catch (ackErr) {
                  alert('Error occured')
                }
      
                this.setState({receipt}, () => this.goNext());

              }
            },
          );
      
          purchaseErrorSubscription = purchaseErrorListener(
            (error: PurchaseError) => {
              alert('error')
            },
          );
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

      goNext = () => {
        alert('Receipt', this.state.receipt);
      };
    
      getItems = async () => {
        try {
          const products = await RNIap.getProducts(itemSkus);
          // const products = await RNIap.getSubscriptions(itemSkus);
          console.log('Products', products);
          this.setState({productList: products});
        } catch (err) {
          console.warn(err.code, err.message);
        }
      };
    
      getSubscriptions = async () => {
        try {
          const products = await RNIap.getSubscriptions(itemSubs);
          console.log('Products', products);
          this.setState({productList: products});
        } catch (err) {
          console.warn(err.code, err.message);
        }
      };

      getAvailablePurchases = async () => {
        try {
          console.info(
            'Get available purchases (non-consumable or unconsumed consumable)',
          );
          const purchases = await RNIap.getAvailablePurchases();
          console.info('Available purchases :: ', purchases);
          if (purchases && purchases.length > 0) {
            this.setState({
              availableItemsMessage: `Got ${purchases.length} items.`,
              receipt: purchases[0].transactionReceipt,
            });
          }
        } catch (err) {
          console.warn(err.code, err.message);
          alert(err.message);
        }
      };
    
      // Version 3 apis
      requestPurchase = async (sku) => {
        try {
          RNIap.requestPurchase(sku);
        } catch (err) {
          console.warn(err.code, err.message);
        }
      };
    
      requestSubscription = async (sku) => {
        try {
          RNIap.requestSubscription(sku);
        } catch (err) {
          alert(err.message);
        }
      };

    render() {
        const {productList, receipt, availableItemsMessage} = this.state;
        const receipt100 = receipt.substring(0, 100);
        return (
          
           <View style={styles.container}>
               <ScrollView>
               <Button onPress={() => this.requestPurchase('android.test.purchased')} text={'Buy 100 Coins'}/>
               <Text style={{margin: 5, fontSize: 15, alignSelf: 'center'}}>
                {availableItemsMessage}
                </Text>
                <Text style={{margin: 5, fontSize: 9, alignSelf: 'center'}}>
              {receipt100}
            </Text>
            <Text style={{margin: 5, fontSize: 15, alignSelf: 'center'}}>
              {availableItemsMessage}
            </Text>


            {productList.map((product, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 12,
                      color: 'black',
                      minHeight: 100,
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                    }}>
                    {JSON.stringify(product)}
                  </Text>
                  <Button onPress={() => this.requestSubscription(product.productId)} text={'Request purchase for above product'}/>
                  
                </View>
              );
            })}
            </ScrollView>
           </View>
           
        )

}

reload(){
    return NavigationActions.resetPage('Purchase')
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
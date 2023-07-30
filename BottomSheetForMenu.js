import React, { useRef ,useState} from "react";
import { SafeAreaView, TouchableOpacity,Alert, Text,TextInput, StyleSheet ,View,Image} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import RestaurantBill from "./Cart";
import { Ionicons } from '@expo/vector-icons';

import * as myConstClass from './HttpLink';


function BottomSheetComponent ({ViewChanger,cart,setCart}) {
  // Needed in order to use .show()
  const [tableNo, setTableNo] = useState();

  const bottomSheet = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
      <View>


{/* Navbar */}
{/************************************ */}
<View style={{ flex: 1, justifyContent: 'center', padding: 24}}>
        <View style={{marginTop:20, flexDirection: 'row', height: 55, backgroundColor: "white", borderRadius: 8 }}>
            
            <TouchableOpacity
                style={{ 
                    flex: 1,
                    backgroundColor: null, 
                    borderRadius: 6,
                }}
                onPress={() => {
                    //ViewChanger("menu")
                }}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',marginRight: 20, justifyContent: 'center' }}>
                <Image 
                    style={{
                        width: 20,
                        height: 20, 
                    }}
                    tintColor= "#1D256E"
                    source={require('./assets/icons/back_arrow_icon.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ 
                    flex: 1,
                    backgroundColor:null, 
                    margin: 5,
                    borderRadius: 8,
                }}
                // onPress={() => NavbarButtonHandler("chart")}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>Your Cart</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ 
                    flex: 1,
                    backgroundColor: null, 
                    margin: 5,
                    borderRadius: 8,
                }}
                // onPress={() => NavbarButtonHandler("add")}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                   
                </View>
            </TouchableOpacity>
        </View>
    </View>
    
    <View style={{
                backgroundColor: "#ECECEC",
                borderRadius: 8,
                paddingVertical: 7,
                paddingHorizontal: 7,
                marginHorizontal: 24,
                marginVertical: 10
            }}> 
        <View style={{backgroundColor: "#F5F6FC", borderRadius: 8, flexDirection: "row"}}>

        </View>
    </View>

    <RestaurantBill items={cart} />
    
{/* Idhar Total Print karne ka hai !!!*/}
<TextInput 
    style={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
        marginTop: 28,
        fontFamily: 'GothamLight', 
        fontSize: 14,
        marginHorizontal: 10
    }}
    placeholder="*Required if you are not paying with the wallet " 
    value={tableNo}
    onChangeText={text => setTableNo(text)}
/>
<View style={{flexDirection:'row'}}>
<TouchableOpacity 
    style={{paddingTop: 10,marginTop: 10, flex:1,marginBottom: 20, margin: 10}}
    onPress={() => {
        console.log("Confirm Order button is pressed!!", ...cart);

        fetch(`${myConstClass.HTTP_LINK}/placeOrder`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                cart: cart,
                uid:1,
                rid:1,
            })
        })
        .then(data=>{
            console.log('Successfully done!!');
            Alert.alert("Your Order is placed Successfully!");
        })
        .catch(err=>{
            Alert.alert('Some Error Occured..., please Retry');
            console.log(err);
        })
        ViewChanger("scan");
        setCart([]);
    }}        
>
        <View style={{
            backgroundColor: "#222222",
            padding: 12,
            borderRadius: 6,
        }}>
            <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>Confirm Order</Text>
        </View>
    </TouchableOpacity>
    </View>
  </View>
    
        </BottomSheet>
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
      >
        <Ionicons name="cart" size={24} color="#fff" />
        <Text style={styles.text}>Open Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#110008",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
    flexDirection:'row'
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomSheetComponent;
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import BottomSheetComponent from './BottomSheetForMenu';
import ToggleButton from './ToggleButton';

export default function Menu({menuCard,ViewChanger,cart,setCart}) {

    const [names, setNames] = useState([]);
    const menu_items = [...menuCard];
    return (
        <>
        <View style={{ flex: 1, justifyContent: 'center', padding: 24, marginTop: 30, marginBottom: 20}}>

        <ToggleButton />
   
        

            {menu_items.map(item => 

            (
            
                
                <View key={item.fname}
                    style={{
                        backgroundColor: "#ECECEC",
                        borderRadius: 8,
                        paddingVertical: 7,
                        paddingHorizontal: 7,
                        marginHorizontal: 7,
                        marginVertical: 10
                }}> 
                        
                    <View style={{backgroundColor: "#F5F6FC", borderRadius: 8, flexDirection: "row"}}>
                        <Image source={{uri: item.image}} 
                            style={{ 
                                width: 90, 
                                height: "100%", 
                                resizeMode: "stretch",
                                borderRadius: 15,
                            }}
                        />
                        <View style={{flexDirection:'row',}}> 
                            <View>
                            <Text style={{
                                marginLeft: 10,
                                width:110,
                                lineHeight: 15,
                                marginTop: 10,
                                flex:1,
                                flexDirection:'row',
                            }}>{item.fname}</Text>
                                
                            <View style={{padding: 1, marginVertical: 10, width:50,bottom:15, marginLeft: 10 , backgroundColor: "#E4E6F3"}} />
                            
                            <Text style={{
                                fontSize: 12,
                                fontFamily: 'GothamMedium', 
                                marginLeft: 10,
                                bottom:15
                            }}>Price: {item.price}</Text>
                         </View>

                            <View style={{flexDirection: "column",left:20,}}>
                            <TouchableOpacity 
                                style={{  margin: 10}}
                                onPress={() => {
                                    const index = cart.findIndex(a=>a === item);
                                    console.log(index);
                                    if (index == -1){
                                        setCart([...cart,item]);
                                    }
                                    else{
                                        const tempCart= cart;
                                        tempCart[index].quantity = tempCart[index].quantity + 1;
                                    
                                        
                                        setCart([...tempCart]);
                                    }
                                }}
                            >
                                <View style={{
                                    backgroundColor: "green",
                                    paddingHorizontal: 14,
                                    paddingVertical:6,
                                    borderRadius: 6,
                                }}>
                                    <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>+</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{margin: 10}}
                                onPress={() => {
                                    const index = cart.findIndex(item)
                                    if (index == -1){
                        
                                    }
                                    else{
                                        const q = cart[index].quantity -1;
                                        if(q==0)
                                        {
                                            tempCart = cart;
                                            tempCart[index].quantity = q;
                                            tempCart.splice(index,1);
                                            setCart(tempCart);
                                        }
                                    }
                                }}
                            >
                                <View style={{
                                    backgroundColor: "tomato",
                                    padding: 6,
                                    borderRadius: 6,
                                }}>
                                    <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>-</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
                        {cart.length > 0 ? <BottomSheetComponent ViewChanger={ViewChanger} cart={cart} setCart={setCart}/> : null}

        </View>
                

        

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
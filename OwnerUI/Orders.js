import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image , TextInput} from 'react-native';


export default function Order( { orders, deleteItemButtonHandler }) {

    "Whopper x2,Paneer Overload x1"
    
    return (
        <View>

            <Text style={{ alignSelf: "center", marginBottom: 40, fontSize: 16, fontFamily: 'GothamMedium', color: "black" }}>Current orders going on ......😋 🍔 🍟 🍕</Text>

                    <View >
                        {console.log(orders)}
                    {orders.map(item => {
                    return(
                        <View 
                            style={{
                                backgroundColor: "white", 
                                
                                borderRadius: 10, 
                                marginHorizontal: 20,
                                marginBottom: 20
                            }}
                            key={item.oid}
                        >    
                            <Text style={{ marginLeft: 0, fontSize: 22, fontFamily: 'GothamMedium', marginTop: 10, color: "black", textAlign: "center" }} >Table No. {item.oid}</Text>
                            <View style={{borderBottomWidth: 1, borderBottomColor: "black", marginHorizontal: 90, marginTop: 10}} />
                            
                            <View style={{backgroundColor: "#C8C8C8", borderRadius: 10, marginTop: 20, marginHorizontal: 10}}>
                                <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: 'GothamBold', marginTop: 10, color: "black"}} >Order </Text>
                                <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: 'GothamMedium', lineHeight: 22, marginTop: 10, color: "black"}} >{
                                        
                                        item.fnames.split(',').map(e =>{
                                            return(
                                                <Text key={e}>
                                                    {e + '\n'}
                                                </Text>
                                            )
                                        })
                                }</Text>
                            </View>


                            <View style={{backgroundColor: "#C8C8C8", borderRadius: 10, marginTop: 20, marginHorizontal: 10}}>
                                <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: 'GothamBold', marginTop: 10, color: "black"}} >Total</Text>
                                <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: 'GothamBold', marginTop: 10, color: "green", marginBottom: 10}} >{item.total}</Text>
                            </View>

                        </View>
                    
                    )
                })} 
                
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    backgroundColor: "#222222",
    padding: 12,
    borderRadius: 6,
}
});
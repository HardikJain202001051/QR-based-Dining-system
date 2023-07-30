import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, LogBox, Alert, TextInput, Button } from 'react-native';
import ToggleButton from './ToggleButton';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Home({ViewChanger,GoToMenuButtonHandler, LoginButtonHandler}) {

    const [restaurantId, setRestaurantId] = useState(null);

       

    
    const handleBarCodeScanned = ({ type, data }) => {
		alert(`Scanned ${type} code with data ${data}`);
        GoToMenuButtonHandler(1);
	  };
    return (<>
        <View style={{zIndex:0}}> 

           

			
			<View style={{ marginTop:10,width: 300, height: 300,alignSelf:'center' }}>

			<BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={{flexGrow:1}}/>
			</View>



<TouchableOpacity 
                style={{paddingTop: 10,marginTop: 10,marginBottom: 20, margin: 10}}
                onPress = {() => {
                    console.log("Scan QR code button is Pressed!!");
                    //clickImage();
                    GoToMenuButtonHandler(1);
                    ViewChanger('menu');

                }} 
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>Scan QR code</Text>
                </View>
            </TouchableOpacity>




            

            <Text style={{color: "red", textAlign: "center", fontFamily: 'GothamMedium'}}>Or Enter ID</Text>
            
            <TextInput 
                style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#D1D1D1",
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 20,
                    fontFamily: 'GothamLight', 
                    fontSize: 14,
                    marginHorizontal: 10
                }}
                value={restaurantId}
                onChangeText={text => setRestaurantId(text)}
            />
            

        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: "black", marginHorizontal: 15, marginTop: 30}} />
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
    button : {
        backgroundColor: "#222222",
        padding: 18,
        borderRadius: 6,
    }
});
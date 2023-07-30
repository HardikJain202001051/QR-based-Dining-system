import React, {useState} from 'react';
import {  View,ScrollView, Alert } from 'react-native';
import Home from './Home'
import Menu from './Menu'
import Wallet from './Wallet';
import TopBar from './TopBar';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import Login from './Login';
import * as myConstClass from './HttpLink';
import Owner from './OwnerUI/Owner';
import Register from './Registration';

export default function App() {

	const [viewMode, setViewMode] = useState("login");
	const [user, setUser] = useState("user");
	const [qrCode_url, setQrCode_url] = useState(1);
	const [menuCard, setMenuCard] = useState([]);
	const [cart, setCart] = useState([]);
	const [ownerId, setOwnerId] = useState();
	
	const ViewChanger = (mode) => {
		setViewMode(mode)
	}

	let [fontsLoaded] = useFonts({
			'GothamBlack': require('./assets/fonts/Gotham-Black.otf'),
			'GothamBold': require('./assets/fonts/Gotham-Bold.otf'),
			'GothamMedium': require('./assets/fonts/GothamMedium.ttf'),
			'GothamLight': require('./assets/fonts/GothamLight.ttf'),
			'GothamThin': require('./assets/fonts/Gotham-Thin.otf'),
			'GothamBoldItalic': require('./assets/fonts/GothamBoldItalic.ttf'),
			'GothamBookItalic': require('./assets/fonts/Gotham-BookItalic.otf')
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	const fetchMenuCard = () =>{
		console.log("Inside FetchMenuCard");
        if(qrCode_url) {
			console.log(`${myConstClass.HTTP_LINK}/getMenu/${qrCode_url}`);
			fetch(`${myConstClass.HTTP_LINK}/getMenu/${qrCode_url}`)
			.then(res=>res.json())
			.then(results=>{
				console.log("Menu-card ka data is received.", ...results);
				results.forEach(dict => {
					dict.quantity = 1;
				  })
				setMenuCard([...results]);
			})
			
		}
        return 1;
	}
	

	/********* Button Handlers *********/
  
	const GoToMenuButtonHandler = (id) => {
		setQrCode_url(id);
		fetchMenuCard();
		
		setTimeout(() => {
			setViewMode("menu");
			console.log("After timeout");
			console.log("This is Menu-card2 :-",...menuCard);
		}, 2000);
	}


	const LoginButtonHandler = (id) => {
		console.log(id);
		fetch(`${myConstClass.HTTP_LINK}/login/${id}`)
		.then(res=>res.json())
		.then(results => {
			if(results._id === -1) {
				Alert.alert("Restaurant not found, #404. Try Again.");
			} else {
				//setOwnerId(results._id);
				setOwnerId(1);
				//setUser('owner');
			}
		})
        .catch(e => console.log(e));		
	}
	
	  

	return (<>
    <TopBar ViewChanger={ViewChanger} />
	<ScrollView>
		    
		    {viewMode ==='wallet' && <Wallet />}
	        {viewMode === 'login' && <Login ViewChanger={ViewChanger} />}
			{viewMode === 'register' && <Register ViewChanger={ViewChanger}/>}
			{viewMode === "scan"  && <Home ViewChanger={ViewChanger} GoToMenuButtonHandler={GoToMenuButtonHandler} LoginButtonHandler={LoginButtonHandler} cart={cart} setCart={setCart}/>}
			{viewMode === "menu" && <Menu menuCard={menuCard} ViewChanger={ViewChanger} cart={cart} setCart={setCart}/>}
			{user == "owner" && <Owner ownerId={1} />}
			{}
	</ScrollView>
    </>
	);
}
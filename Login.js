import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, LogBox, Alert, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function Login({ViewChanger}){
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleRegister = () => {
    ViewChanger("register")
  };
  const handleLogin = () => {
    ViewChanger("scan");
  };

  return (<>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={{ marginTop:10,width: 200, height: 200,alignSelf:'center' }}>
  
  <Image style={{
          width: 200,
          height: 200,
          alignSelf: "center", 
      }} source={require('./assets/images/qr_code.gif')}  />
</View>


      
      <View style={ styles.inputContainer}
      >
        <View
          style={[
            styles.phoneInputContainer,
            isFocused ? styles.phoneInputContainerFocused : null,
          ]}
        >
          <Text style={styles.phoneCode}>{String.fromCodePoint(0x1F1EE, 0x1F1F3)} +91</Text>
          <View style={styles.verticalLine} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            caretHidden = {!isFocused}
            selectionColor="#000000"
          />
        </View>

        <View style={{...styles.phoneInputContainer}}>
             <TextInput
        style={styles.phoneInput}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Feather
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  <Text style={styles.loginButtonText}>Log In</Text>
</TouchableOpacity>
        


      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>No account yet? Sign up</Text>
        </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: '96%',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
  },
  inputContainerFocused: {
    borderColor: '#000000',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  phoneInputContainerFocused: {
    borderColor: '#000000',
  },
  phoneCode: {
    fontSize: 16,
    marginRight: 8,
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#c0c0c0',
    marginHorizontal: 8,
  },
  phoneInput: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  registerContainer: {
    marginTop: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },  
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  input: {
    marginTop : 16,
    borderWidth: 1,
    borderColor: 'black',
    width: '96%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  loginButton: {
    marginTop: 24,
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text,TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as myConstClass from './HttpLink';





export default function Wallet() {

  
const [balance,setBalance] = useState(0)
const [credits,setCredits] = useState(0)


fetch(`${myConstClass.HTTP_LINK}/credit/1}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);

        }
        return response.json();
      })
      .then(data => {
        setBalance(data.amount);
        setCredits(data.credits)
      })
      .catch(error => {
        setError(error.message);
      });

      const redeem=()=>{
        const temp = balance + credits*0.1;
        setBalance(temp);
      }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Wallet</Text>
        <Ionicons name="wallet-outline" size={24} color="white" />
      </View>
      <View style={styles.userDetailsContainer}>
        <Ionicons name="person-outline" size={24} color="black" />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>John Smith</Text>
          <Text style={styles.userEmail}>johnsmith@example.com</Text>
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>₹ {balance}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Ionicons name="add-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Add Money</Text>
        </View>
        <View style={styles.button}>
          <Ionicons name="cash-outline" size={24} color="white" />
          <TouchableOpacity onPress={redeem}>
          <Text style={styles.buttonText}>Redeem Credit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    color: 'gray',
    fontSize: 18,
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

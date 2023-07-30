import React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Paystack from 'react-native-paystack';

Paystack.init({
  publicKey: 'pk_test_fce28308d512e400d86203c0c8bce8ebe764e92a', // Your public key
});

const Payment = () => {
  const [showPaystack, setShowPaystack] = useState(false);
  const [cart, setCart] = useState([]);

  const getTotal = () => {
    // compute the total amount based on the items in the cart
  };

  const handlePayment = async () => {
    const amountInKobo = getTotal() * 100; // convert total to lowest currency unit
    try {
      const transaction = await Paystack.transactionRequest({
        amount: amountInKobo,
        email: 'user@example.com',
        reference: (new Date()).getTime().toString(),
      });
      // Send transaction details to your backend server
      await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: transaction.reference,
          amount: getTotal(),
        }),
      });
      // Redirect user to the payment URL
      setShowPaystack(false);
      setCart([]);
      // Redirect user to the home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {showPaystack ? (
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Make Payment</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowPaystack(true)}
        >
          <Text style={styles.buttonText}>Pay with Paystack</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Payment;

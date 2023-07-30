import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    width: 60,
    textAlign: 'right',
    marginRight: 8,
  },
  itemQuantity: {
    width: 40,
    textAlign: 'right',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalPrice: {
    fontWeight: 'bold',
  },
});

const RestaurantBill = ({ items }) => {
  const renderItems = () => {
    
    
    return items.map((item, index) => (
      <View style={styles.itemContainer} key={index}>
        <Text style={styles.itemName}>{item.fname}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemQuantity}>x{item.quantity}</Text>
        <Text style={styles.itemPrice}>{item.price*item.quantity}</Text>
      </View>
    ));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      {renderItems()}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>{calculateTotal()}</Text>
      </View>
    </View>
  );
};

export default RestaurantBill;

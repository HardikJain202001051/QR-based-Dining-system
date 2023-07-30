import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ToggleButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Takeaway 🛍️</Text>
      <Switch
       thumbColor='white' 
       
       trackColor={{true:'black',false:'black'}     }
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        
        value={isEnabled}
      />
      <Text style={styles.label}>Dine-In 🍽️</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ToggleButton;

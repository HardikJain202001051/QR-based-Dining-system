import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import SideMenu from './SideMenu';

export default function TopBar({ViewChanger}) {
  const [isSideSheetOpen,setIsSideSheetOpen] = useState(false);
  const onToggleSideSheet = () =>{
    setIsSideSheetOpen(!isSideSheetOpen);

  }
  const HamburgerIcon = () => {
    return (
      <View style={styles.container}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#ECECEC" barStyle="dark-content" />
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={onToggleSideSheet}>
          <HamburgerIcon color="#000" />
        </TouchableOpacity>
        <Text style={styles.text}>OEase</Text>
        
      </View>
      {isSideSheetOpen && <SideMenu ViewChanger={ViewChanger} onToggleSideSheet={onToggleSideSheet}/>}
    </>
  );
}

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    height: 60,
    
  },
  text: {
    fontFamily: 'GothamMedium',
    fontSize: 25,
    color: '#000',
    flexGrow: 1,
    textAlign: 'center',
    left:-15
  },
  container: {
    width: 30,
    height: 23,
    justifyContent: 'space-between',
    marginLeft: 30,
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#000',
    borderRadius: 3,
  },
});

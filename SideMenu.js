import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SideMenu = ({ onToggleSideSheet ,ViewChanger}) => {
  return (
    <View style={[styles.sidebar, { left: 0 }]}>
      <View style={styles.sidebarLogo}>
        <Ionicons name="restaurant-outline" size={32} color="#333" style={styles.menuIcon} />
        <Text style={styles.logoName}>OEase</Text>
      </View>
      <View style={styles.sidebarContent}>
        <TouchableOpacity style={styles.list} onPress={onToggleSideSheet}>
          <Ionicons name="home-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={()=>{ViewChanger("wallet")}}>
          <Ionicons name="wallet-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.link}>Wallet</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={()=>{ViewChanger("login")}}>
            <Ionicons name="log-out-outline" size={24} color="#333" style={styles.icon} />
            <Text style={styles.link}>Logout</Text>
          </TouchableOpacity>
          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex:10,
    width: '70%',
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: '#f2f2f2',
  },
  sidebarLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
  },
  logoName: {
    fontFamily: 'GothamBold',
    fontSize: 24,
    color: '#333',
  },
  sidebarContent: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  icon: {
    marginRight: 15,
  },
  link: {
    fontFamily: 'GothamMedium',
    fontSize: 18,
    color: '#333',
  },
  bottomContent: {
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    marginTop: 30,
    paddingTop: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
});

export default SideMenu;

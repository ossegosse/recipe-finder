import React from 'react';
import { StatusBar } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function TabLayout() {

  return (
    <>
    <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true}
      />
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'mon-sb'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipes',
         tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='food-variant' color={color} size={size} />  
          
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Ionicons name='bookmark-outline' color={color} size={size} /> 
        }}
      />
    </Tabs>
    </>
  );
}

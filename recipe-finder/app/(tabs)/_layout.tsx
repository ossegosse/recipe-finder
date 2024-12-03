import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function TabLayout() {

  return (
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
  );
}

import { StyleSheet, View } from 'react-native'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import ExploreHeader from '@/components/ExploreHeader'
import Recipes from '@/components/Recipes'

const index = () => {
  const [category, setCategory] = useState('Beef');
  const onDataChanged = (category: string) => {
    setCategory(category);
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
      options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
      }} 
      />
      <Recipes recipes={[]} category={category}/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
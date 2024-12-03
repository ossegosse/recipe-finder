import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'


interface Props {
    recipes: any[];
    category: string;
}

const Recipes = ({ recipes, category }: Props) => {

    useEffect(() => {
        console.log('RELOAD RECIPES')
    }, [category])

  return (
    <View> 
      <Text>Recipes</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Recipes


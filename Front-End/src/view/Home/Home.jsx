import React from "react"
import { Text, Button, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function Home() {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Home</Text>
      <Button title="click me" onPress={() => navigation.navigate('Login')}></Button>
    </View>
  )
}

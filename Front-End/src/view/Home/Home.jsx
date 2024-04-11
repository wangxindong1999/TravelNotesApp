import React from "react"
import { Text, Button, View, SafeAreaView, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function Home() {
  const navigation = useNavigation()
  return (
    <View style={{backgroundColor: "white", paddingTop:StatusBar.currentHeight}}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Text>Home</Text>
      <Button title="navigate to login" onPress={() => navigation.navigate('Login')}></Button>
      <Button title="navigate to details" onPress={() => navigation.navigate('Details')}></Button>
      <Button title="navigate to addtrade" onPress={() => navigation.navigate('AddTrade')}></Button>
      <Button title="navigate to welcome" onPress={() => navigation.navigate('Welcome')}></Button>
    </View>
  )
}

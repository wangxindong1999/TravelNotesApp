import React from "react"

import { Text, Button, View,StatusBar,StyleSheet ,TextInput,TouchableOpacity,MagnifyingGlassIcon} from "react-native"
// import { Text, Button, View, SafeAreaView, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Title from "./title"
import TestWaterfallFlowScreen from "./TestWaterfallFlowScreen"

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent /> 
        <View style={styles.contentContainer} >
          <Title/>
        </View>
        <Button title="navigate to login" onPress={() => navigation.navigate('Login')}></Button>
        <Button title="navigate to details" onPress={() => navigation.navigate('Details')}></Button>
        <TestWaterfallFlowScreen />
        {/* <Button title="click me" onPress={() => navigation.navigate('Login')}></Button> */}
    </View>
    // <SafeAreaView style={{backgroundColor: "green", flex: 1, paddingTop:StatusBar.currentHeight}}>
    //   <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    //   <Text>Home</Text>
    //   <Button title="navigate to login" onPress={() => navigation.navigate('Login')}></Button>
    //   <Button title="navigate to details" onPress={() => navigation.navigate('Details')}></Button>
    // </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width:'95%',
    alignSelf:'center',
    marginBottom:10,
    marginTop: StatusBar.currentHeight,
  },
  search:{
      borderWidth: 1,
      marginTop:20,
      borderColor: 'gray',
      padding: 10,
      height:35,
      fontSize:10,
      borderRadius: 20,
  }
});

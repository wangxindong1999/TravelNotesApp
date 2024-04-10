import React from "react"
import { Text, Button, View,StatusBar,StyleSheet ,TextInput,TouchableOpacity,MagnifyingGlassIcon} from "react-native"
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
        <TestWaterfallFlowScreen />
        {/* <Button title="click me" onPress={() => navigation.navigate('Login')}></Button> */}
    </View>
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

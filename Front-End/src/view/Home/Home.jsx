import React, { useRef } from "react"

import { Text, Button, View,StatusBar,StyleSheet ,TextInput,TouchableOpacity,MagnifyingGlassIcon} from "react-native"
// import { Text, Button, View, SafeAreaView, StatusBar } from "react-native"
import { useNavigation,useFocusEffect } from "@react-navigation/native"
import Title from "./title"
import TestWaterfallFlowScreen from "./TestWaterfallFlowScreen"



export default function Home() {
  const navigation = useNavigation();
  const childRef=useRef(null);
  childLoadData=()=>{
    childRef.current.loadData(1,true);
  }
  useFocusEffect(
    React.useCallback(() => {
      // 在这里执行每次跳转重新加载页面
      this.childLoadData();
      console.log("Home tab focused");
    })
  )

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent /> 
        <View style={styles.contentContainer} >
          <Title/>
        </View>
        {/* <Button title="navigate to login" onPress={() => navigation.navigate('Login')}></Button> */}
        {/* <Button title="navigate to details" onPress={() => navigation.navigate('Details')}></Button> */}
         {/* <Button title="navigate to addtrade" onPress={() => navigation.navigate('AddTrade')}></Button> */}
        {/* <Button title="navigate to welcome" onPress={() => navigation.navigate('Welcome')}></Button>  */}
        <TestWaterfallFlowScreen navigation={navigation} ref={childRef}/>
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

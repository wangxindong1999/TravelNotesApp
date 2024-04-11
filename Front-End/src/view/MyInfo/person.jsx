import React from "react"
import { Text,View,StyleSheet, TouchableOpacity,Image, Button} from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function Title() {
  const navigation = useNavigation();
  return (
    <View>
       <TouchableOpacity onPress={() => {console.log(22)}}>
       <View style={styles.container}>
            <Text style={{fontSize:20}}>头像</Text>
                <Image
                  source={require('../../assets/person1.jpg')}
                  style={{ width: 40, height: 40 }}
                />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {console.log(22)}}>
        <View style={styles.container}>
            <Text style={{fontSize:20}}>名字</Text>
            <Text style={{fontSize:18}}>路西西</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {console.log(22)}}>
       <View style={styles.container}>
            <Text style={{fontSize:20}}>修改密码</Text>
                <Image
                  source={require('../../assets/right.png')}
                  style={{ width: 30, height: 30 }}
                />
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
         <View style={{borderRadius:10,backgroundColor:'#4AB05C',width:'80%',height:50,alignItems:'center',justifyContent:'center',
         marginTop:'120%',marginLeft:'10%'}}>
            <Text style={{color:'#fff'}}>退出登录</Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // marginTop:20,
        flexDirection: 'row', // 水平排列
        alignItems: 'center', // 垂直居中,
        justifyContent:'space-between',
        backgroundColor:'#fff',
        height:60,
        borderBottomWidth:1,
        borderBlockEndColor:'gray',
        paddingLeft:5,
        paddingRight:5
    }
  });
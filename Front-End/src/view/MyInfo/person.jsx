import React from "react"
import { Text,View,StyleSheet, TouchableOpacity,Image, Button} from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function Person({route}) {
  const { username, userImg } = route.params;
  console.log(username,userImg)
  const navigation = useNavigation();
  logout =async ()=>{
  console.log(598)
    try{
      const response=await fetch('http://10.0.2.2:3000/logout',{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include' // 包含凭据（包括 cookie）
      });
      if(response.ok){
        const messages=await response.json();
        if(messages.message=="成功退出！"){
          alert("成功退出！");
          navigation.navigate("Homes")
        }else {
          alert("退出失败！")
        }
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <View>
       <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { uname: username,uImg:userImg, index:'0' })}>
       <View style={styles.container}>
            <Text style={{fontSize:20}}>头像</Text>
                <Image
                  source={userImg}
                  style={{ width: 40, height: 40 }}
                />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { uname: username,uImg:'', index:'1' })}>
        <View style={styles.container}>
            <Text style={{fontSize:20}}>名字</Text>
            <Text style={{fontSize:18}}>{username}</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { uname: username,uImg:'', index:'2' })}>
        <View style={styles.container}>
            <Text style={{fontSize:20}}>修改密码</Text>
                <Image
                  source={require('../../assets/right.png')}
                  style={{ width: 30, height: 30 }}
                />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{this.logout()}}>
         <View  style={{borderRadius:10,backgroundColor:'#4AB05C',width:'80%',height:50,justifyContent:'center',alignItems:'center',
         marginLeft:35,marginTop:300}}>
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
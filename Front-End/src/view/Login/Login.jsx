import React, { useEffect, useState } from "react";
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/feature/userSlice';

export default function Login() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [userImg, setUserImg] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  // useEffect(() => {
  //   const fetchUser = async () => { 
  //     const username = await AsyncStorage.getItem("username");
  //     const userImg = await AsyncStorage.getItem("userImg");
  //     setUsername(username);
  //     setUserImg(userImg);
  //   }
  //   fetchUser();
  // }, [])

  async function handleLogin() {
    const response = await fetch("http://10.0.2.2:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    const cookies = response.headers.get("set-cookie")
    // console.log(response.headers.get("set-cookie"))
    // console.log(cookies);

    if (response.ok) {
      // 获取用户头像
      // const user = await data.user;
      // await AsyncStorage.setItem("username", user.username);
      // await AsyncStorage.setItem("userImg", user.userImg);
      const cookieArray =  cookies.split(', ');
      const userdata = {};
      cookieArray.forEach(cookie => {
        const [key, value] = cookie.split(';')[0].split('=');
        userdata[key] = decodeURIComponent(value);
      });
      const user = {
        userId: userdata.userId,
        username: userdata.username,
        userImg: userdata.userImg,
      }
      dispatch(setUser(user));
      // console.log("user", user);
      alert("登录成功")
      navigation.navigate("Home")
    } else {
      alert(data.error)
    }
}

  return (
    <View style={styles.background}>
      <View style={styles.welcomeContainer}>
        {/* <Text style={styles.welcomeText}>游记本</Text> */}
        <Image
          source={require("../../assets/welcomeText.png")}
          style={styles.welcomeImage} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/login.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="用户名"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View style={styles.pwdContainer}>
          <TextInput
            style={styles.input}
            placeholder="密码"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity style={styles.eye} onPress={() => setHidePassword(!hidePassword)}>
            <Feather name={hidePassword ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity style={styles.registerText} onPress={() => navigation.navigate('Register')}>
            <Text style={{color: "gray", fontSize: 16}}>点击注册</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgetPsw} onPress={() => console.log("忘记密码")}>
            <Text style={{color: "gray", fontSize: 16}}>忘记密码</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>登      录</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight,
  },
  welcomeContainer: {
    position: "absolute",
    width: "100%",
    height: hp("15%"),
    top: hp("5%"),
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "black",
    // borderWidth: 10,
  },
  welcomeImage: {
    flex: 1,
    width: wp("70%"),
    resizeMode: "contain",
    marginLeft: 20,
    // borderColor: "black",
    // borderWidth: 1,
  },
  // welcomeText: {
  //   fontSize: 30,
  //   color: "green",
  //   fontWeight: "bold",
  // },
  imageContainer: {
    width: "100%",
    height: hp("40%"),
    top: hp("20%"),
    position: "absolute",
    // borderColor: "black",
    // borderWidth: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "stretch",
    top: 0,
  },
  loginContainer: {
    backgroundColor: "white",
    width: wp("100%"),
    height: hp("40%"),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  input: {
    width: wp("80%"),
    height: hp("6%"),
    marginTop: hp("4%"),
    paddingLeft: wp("3%"),
    paddingRight: wp("15%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    fontSize: 18,
  },
  pwdContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 1,
  },
  eye: {
    position: "absolute",
    right: wp("3%"),
    // top: hp("3%") + 40,
    bottom: hp("3%") - 12,
    // borderColor: "gray",
    // borderWidth: 1,
  },
  textContainer: {
    flexDirection: "row",
    marginTop: hp("1%"),
    width: wp("80%"),
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 1,
  },
  registerText: {
    // marginLeft: wp("10%")
    // borderColor: "gray",
    // borderWidth: 1,
  },
  forgetPsw: {
    // position: "absolute",
    // marginLeft: wp("50%")
    // right: wp("10%"),
    // borderColor: "gray",
    // borderWidth: 1,
  },
  buttonContainer: {
    marginTop: hp("2%"),
  },
  loginButton: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    width: wp("80%"),
    height: hp("6%"),
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 2,
  },
  // registerButton: {
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   width: wp("20%"),
  //   height: hp("5%"),
  //   margin: 5,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // registerText: {
  //   fontSize: 16,
  //   color: "black",
  //   paddingBottom: 2,
  // },
})

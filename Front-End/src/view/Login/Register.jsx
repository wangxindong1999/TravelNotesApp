import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

export default function Login() {
  const navigation = useNavigation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  async function handleRegister() {
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
    const data = await response.json()

    if (response.ok) {
      alert("注册成功")
      navigation.navigate("Login")
    } else {
      alert(data.error)
    }
  }

  return (
    <View style={styles.background}>
      <View style={styles.welcomContainer}>
        <Image
          source={require("../../assets/welcomeText.png")}
          style={styles.welcomeImage} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/register.jpg")}
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
          <TouchableOpacity style={styles.loginText} onPress={() => navigation.navigate("Login")}>
            <Text style={{color: "gray", fontSize: 16}}>返回登录</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>注      册</Text>
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
  welcomContainer: {
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
  loginText: {
  },
  forgetPsw: {
  },
  buttonContainer: {
    marginTop: hp("2%"),
  },
  registerButton: {
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
  registerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 2,
  },
})

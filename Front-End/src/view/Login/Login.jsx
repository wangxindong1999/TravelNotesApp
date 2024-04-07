import React, { useState } from "react"
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

export default function Login() {
  const navigation = useNavigation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <View style={styles.background}>
      <View style={styles.welcomContainer}>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginText}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => console.log("注册")}>
            <Text style={styles.registerText}>注册</Text>
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
    marginTop: 40,
    paddingLeft: 10,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
  },
  pwdContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 1,
  },
  eye: {
    position: "absolute",
    right: 10,
    // top: hp("3%") + 40,
    bottom: hp("3%") - 12,
    // borderColor: "gray",
    // borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  loginButton: {
    borderWidth: 1,
    borderRadius: 10,
    width: wp("20%"),
    height: hp("5%"),
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  loginText: {
    fontSize: 16,
    color: "white",
    paddingBottom: 2,
  },
  registerButton: {
    borderWidth: 1,
    borderRadius: 10,
    width: wp("20%"),
    height: hp("5%"),
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "black",
    paddingBottom: 2,
  },
})

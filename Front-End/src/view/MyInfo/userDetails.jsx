import React, { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Text,
  TextInput,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"

export default function UserDetails({ route }) {
  const { uname, uImg, index } = route.params
  const [value, setText] = useState(uname)
  // const userImg=uImg.uri
  const [img, changeImg] = useState(uImg)
  // console.log(img)
  const [prePassword, setPrePassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const navigation = useNavigation()
  const submitPassword = () => {
    console.log(prePassword, newPassword)
  }

  // 添加图片
  handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    })

    if (!result.canceled) {
      // console.log(result.assets[0].base64, "dwadw")
      // setImages(result.assets[0].base64);
      changeImg({ uri: result.assets[0].base64 })
    }
  }

  updateImage = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/updateUserImg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: uname,
          userImg: img,
        }),
      })

      if (response.ok) {
        alert("修改成功！")
        navigation.navigate("Homes")
      } else {
        alert("修改失败！")
      }
    } catch (err) {
      console.log(err)
    }
  }

  updateName = async () => {
    console.log(value)
    try {
      const response = await fetch("http://10.0.2.2:3000/updateName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: uname,
          newUsername: value,
        }),
      })

      if (response.ok) {
        alert("修改成功！")
        navigation.navigate("Homes")
      } else {
        alert("修改失败！")
      }
    } catch (err) {
      console.log(err)
    }
  }

  updatePassword = async () => {
    console.log(value)
    try {
      const response = await fetch("http://10.0.2.2:3000/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: uname,
          prePassword: prePassword,
          newPassword: newPassword,
        }),
      })

      if (response.ok) {
        alert("修改成功！")
        navigation.navigate("Homes")
      } else {
        alert("修改失败！")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      {index == 0 && (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.handleSelectImage()
            }}
          >
            <Image
              source={
                img.uri.includes("http")
                  ? img
                  : { uri: "data:image/jpeg;base64," + img.uri }
              }
              style={{
                width: 300,
                height: 300,
                marginBottom: 50,
                marginLeft: "10%",
              }}
            />
          </TouchableOpacity>
          <Button title="确认修改" onPress={() => this.updateImage()}></Button>
        </View>
      )}
      {index == 1 && (
        <View>
          <TextInput
            placeholder={uname}
            style={styles.search}
            onChangeText={(value) => setText(value)}
            returnKeyType="done"
          />
          <Button
            title="确认修改"
            onPress={() => {
              this.updateName()
            }}
          ></Button>
        </View>
      )}
      {index == 2 && (
        <View>
          <TextInput
            placeholder="请输入原密码"
            style={styles.search}
            onChangeText={(text) => setPrePassword(text)}
            returnKeyType="done"
          />
          <TextInput
            placeholder="请输入新密码"
            style={styles.search}
            onChangeText={(text) => setNewPassword(text)}
            returnKeyType="done"
          />
          <Button
            title="确认修改"
            onPress={() => {
              this.updatePassword()
            }}
          ></Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "90%",
    marginLeft: "5%",
    flex: 1,
  },
  search: {
    marginLeft: "2.5%",
    borderWidth: 1,
    marginTop: 10,
    borderColor: "gray",
    padding: 10,
    height: 35,
    fontSize: 10,
    marginBottom: 10,
  },
})

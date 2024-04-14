import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native"
import CardList from "./cardList"
import { useSelector, useDispatch } from "react-redux"
import { setActiveIndex } from "../../store/feature/activeIndexSlice"
import { useNavigation } from "@react-navigation/native"

export default function MyInfo() {
  childRef = React.createRef()
  const bkImage = {
    uri: "https://img1.baidu.com/it/u=1884825806,3687074543&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
  }

  const activeIndex = useSelector((state) => state.activeIndex.value)
  const dispatch = useDispatch()
  const [username, setUsername] = useState()
  const [userImg, setUserImg] = useState()
  const handlePress = async function (newIndex) {
    await dispatch(setActiveIndex(newIndex))
    // if (this.childRef.current) {
    //     this.childRef.current.loadData(1,true);
    // } else {
    //     console.log(596);
    // }
  }
  // useEffect(() => {
  //   console.log(activeIndex);
  // }, [activeIndex]);
  const [userInfo, setUserInfo] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/person", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 包含凭据（包括 cookie）
        })
        if (response.ok) {
          const person = await response.json()
          setUsername(person.username)
          setUserImg(person.userImg)
          setUserInfo(true)
        } else {
          alert("请登录！")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchData()
  }, [])
  const navigation = useNavigation() // 使用 useNavigation 钩子获取导航属性

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Image source={bkImage} style={{ height: "30%" }} />
          <Person userImg={userImg} username={username} />
          {/* <Button title="navigate to details" onPress={() => navigation.navigate('Details')}></Button> */}
          <ButtonGroup
            activeIndex={activeIndex}
            handlePress={handlePress.bind(this)}
          />
          <CardList
            username={username}
            activeIndex={activeIndex}
            navigation={navigation}
          />
        </>
      ) : (
        <Text>请登录</Text>
      )}
    </View>
  )
}

// 头像展示
const Person = ({ userImg, username }) => {
  const uname = username
  // const tImage = { uri: userImg };
  const tImage = {
    uri: "https://img1.baidu.com/it/u=2226443709,1655735334&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=1226",
  }
  const navigation = useNavigation()
  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
          position: "absolute",
          bottom: -40,
          right: 5,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            marginRight: 5,
            marginTop: 4,
          }}
        >
          {uname}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Person", { username: uname, userImg: tImage })
          }
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: "hidden",
            }}
          >
            <Image
              source={tImage}
              style={{
                flex: 1,
                resizeMode: "cover",
                width: null,
                height: null,
              }}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// 状态组件
const CustomButton = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isActive ? styles.activeButton : null]}
    >
      <Text style={isActive ? styles.activeText : styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const ButtonGroup = ({ activeIndex, handlePress }) => {
  return (
    <View style={styles.buttomContainer}>
      <CustomButton
        title="已通过"
        isActive={activeIndex === 0}
        onPress={() => handlePress(0)}
      />
      <CustomButton
        title="待审核"
        isActive={activeIndex === 1}
        onPress={() => handlePress(1)}
      />
      <CustomButton
        title="未通过"
        isActive={activeIndex === 2}
        onPress={() => handlePress(2)}
      />
      <CustomButton
        title="草稿"
        isActive={activeIndex === 3}
        onPress={() => handlePress(3)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
    marginBottom: 5,
  },
  button: {
    padding: 10,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  text: {
    color: "gray",
  },
  activeText: {
    color: "black",
    fontWeight: "bold",
  },
})

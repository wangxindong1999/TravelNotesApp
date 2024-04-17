import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import CarouselComponent from "./CarouselComponent"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { Ionicons } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/feature/userSlice"

export default function Details() {
  const user = useSelector(selectUser)
  const navigation = useNavigation()
  const route = useRoute()
  const status = route.params.status
  const images = route.params.all_base64[0]
    ? route.params.all_base64
    : route.params.all_thumbURL
  // console.log(images);
  let userImg = route.params.userImg
  // if (!route.params.userImg.includes("http")) {
  //   const imagePath = "img/" + userImg + ".png"
  //        imageBuffer = fs.readFileSync(imagePath)
  //         userImg =
  //           "data:image/jpeg;base64," + imageBuffer.toString("base64")
  //       }
  // }
  const username = route.params.username
  const title = route.params.title
  const content = route.params.content
  const reason = route.params.reason
  const reason_type = route.params.reason_type

  const [activeSlide, setActiveSlide] = useState(0)
  const updateActiveSlide = (index) => {
    setActiveSlide(index)
  }

  // 检验是否有用户信息
  if(!user.username) {
    return (
      <ImageBackground source={require('../../assets/loginFirst.png')} style={styles.background}>
        <View style={styles.wrapper}>
          <Text style={styles.promptText}>请先登录</Text>
          <Button
            title="登录"
            color="#F194FF"
            accessibilityLabel="点击按钮登录"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ImageBackground>
    )
  }

  return (
    <View style={styles.background}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* 头部 */}
      <View style={styles.headContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Ionicons name="chevron-back" size={32} color="gray" />
        </TouchableOpacity>
        {/* 用户头像 */}
        {/*uri不能为空值，因此使用“123456”作为占位符，防止空值报错*/}
        <Image
          source={{ uri: userImg ? userImg : "123456" }} // userImg
          style={styles.userImage}
        />
        {/* 用户名 */}
        <Text style={styles.username}>{username}</Text>
        {/* 分享按钮 */}
        <TouchableOpacity style={styles.shareButton}>
          <SimpleLineIcons name="share-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: wp("100%") }}>
        {/* 轮播图 */}
        {/* {images.length > 0 && ( */}
        <CarouselComponent
          images={images}
          activeSlide={activeSlide}
          updateActiveSlide={updateActiveSlide}
        />
        {/* )} */}
        <View style={styles.articleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        {status === "rejected" ? (
          <View style={styles.reasonContainer}>
            <Text style={styles.reason}>！违规类型：{reason_type}</Text>
            <Text style={styles.reason}>！违规原因：{reason}</Text>
          </View>
        ) : null}
        <View style={styles.postedTimeContainer}>
          <Text style={styles.postedTime}>
            {status === "rejected"
              ? "审核未通过"
              : status === "committed"
              ? "待审核"
              : status === "published"
              ? "已发布"
              : status === "draft"
              ? "草稿"
              : null}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  headContainer: {
    width: wp("100%"),
    height: hp("7%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp("2%"),
  },
  goBackButton: {
    marginLeft: wp("3%"),
  },
  userImage: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: 20,
    marginLeft: -wp("20%"),
    borderColor: "black",
    borderWidth: 1,
  },
  username: {
    marginLeft: -wp("20%"),
    fontSize: 20,
  },
  shareButton: {
    marginLeft: wp("20%"),
    marginRight: wp("3%"),
  },
  articleContainer: {
    width: wp("100%"),
    padding: wp("3%"),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    marginTop: wp("3%"),
    fontSize: 18,
  },
  postedTimeContainer: {
    width: wp("100%"),
    padding: wp("3%"),
    alignItems: "flex-end",
  },
  postedTime: {
    fontSize: 12,
    color: "gray",
  },
  reasonContainer: {
    padding: wp("3%"),
  },
  reason: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
})

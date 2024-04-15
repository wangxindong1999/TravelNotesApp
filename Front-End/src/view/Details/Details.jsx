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
  const navigation = useNavigation()
  const route = useRoute()
  // const postId = route.params.itemId;
  // const url = route.params.url;
  // console.log(url);
  // const images = route.params.all_url;
  // const images = route.params.all_base64;
  const images = route.params.all_base64[0]
    ? route.params.all_base64
    : route.params.all_thumbURL
  // console.log(images);
  const userImg = route.params.userImg
  const username = route.params.username
  const title = route.params.title
  const content = route.params.content
  const postedAt = route.params.postedAt
  const reason = route.params.reason
  const reason_type = route.params.reason_type
  const user = useSelector(selectUser)
  // const [username, setUsername] = useState('');
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 获取图片
  //       const response = await axios.get(
  //         `http://10.0.2.2:3000/posts/${postId}`
  //       )
  // console.log(response.data);
  // console.log("0");
  // console.log("1", response.data.images);
  // const thumbURLs = response.data.images.map(image => image.thumbURL)
  // setImages(thumbURLs)
  // const thumbURLs = response.data.images.map((image) =>
  //   image.thumbURL
  //     ? image.thumbURL
  //     : `data:image/jpeg;base64,${image.base64}`
  // )
  // setImages(thumbURLs)
  // console.log("2",thumbURLs);
  // console.log("3",images);
  // console.log("4");
  // setImages(response.data.images.map(image => `data:image/jpeg;base64,${image.base64}`))

  // 获取文章标题和内容
  // setTitle(response.data.title)
  // setContent(response.data.content)

  // // 获取用户名和头像
  // const userId = response.data.user
  // const userResponse = await axios.get(
  //   `http://10.0.2.2:3000/users/${userId}`
  // )
  // console.log(userResponse.data);
  // setUsername(userResponse.data.username)
  // setUserAvatar(userResponse.data.userImg)
  // setUserAvatar(`data:image/jpeg;base64,${userResponse.data.userImg}`)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const [activeSlide, setActiveSlide] = useState(0)
  const updateActiveSlide = (index) => {
    setActiveSlide(index)
  }
  // console.log("6", images.length);

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
        <View style={styles.reasonContainer}>
          <Text style={styles.reason}>！违规类型：{reason_type}</Text>
          <Text style={styles.reason}>！违规原因：{reason}</Text>
        </View>
        {/* <View style={styles.postedTimeContainer}>
          <Text style={styles.postedTime}>
            {postedAt ? `发布时间：${postedAt}` : "尚未发布"}
          </Text>
        </View> */}
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
    // borderColor: "black",
    // borderWidth: 1,
  },
  goBackButton: {
    marginLeft: wp("3%"),
    // borderColor: "black",
    // borderWidth: 1,
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
    // fontWeight: "bold",
    // borderColor: "black",
    // borderWidth: 1,
  },
  shareButton: {
    marginLeft: wp("20%"),
    marginRight: wp("3%"),
    // borderColor: "black",
    // borderWidth: 1,
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

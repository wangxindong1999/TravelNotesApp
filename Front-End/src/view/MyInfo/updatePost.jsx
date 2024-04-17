import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "../../store/feature/userSlice"
import { Button, Input } from "@rneui/themed"
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { Ionicons, AntDesign } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"
import { Dimensions } from "react-native"
import axios from "axios"
import * as FileSystem from "expo-file-system"
// import { useHistory } from 'react-router-dom';

export default function UpdatePost() {
  const route = useRoute()
  const postId = route.params.itemId
  // console.log(postId)
  const userImg = route.params.userImg
  // console.log(userImg);
  const username = route.params.username
  const [title, setTitle] = useState(route.params.title)
  const [content, setContent] = useState(route.params.content)
  const [images, setImages] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/getPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
          }),
        })

        const data = await response.json()
        // console.log(data)
        const thumbURLs = data.images.map((image) => ({
          width: image.width,
          height: image.height,
          thumbURL: image.thumbURL ? image.thumbURL : null,
          base64: image.base64,
        }))

        setImages(thumbURLs)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [postId])

  const [isScrollEnabled, setIsScrollEnabled] = useState(true)
  const contentWidth = useRef(0)
  const navigation = useNavigation()
  const [height, setHeight] = useState(0)

  const onContentLayout = (e) => {
    const { width } = e.nativeEvent.layout
    const screenWidth = Dimensions.get("window")
    contentWidth.current = width
    // console.log(contentWidth.current, screenWidth.width);
    setIsScrollEnabled(contentWidth.current > 0.8 * screenWidth.width)
  }

  // 添加图片
  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true,
    })

    // console.log(result);

    if (!result.canceled) {
      // setImages(result.assets[0].base64);
      setImages((prevImages) => [
        ...prevImages,
        {
          uri: result.assets[0].uri,
          base64: result.assets[0].base64,
          thumbURL: null,
          height: result.assets[0].height,
          width: result.assets[0].width,
        },
      ])
    }
  }

  // 图片列表
  const renderImages = () => {
    return images.map((image, index) => {
      return (
        <Image
          key={index}
          source={{
            uri: image.base64
              ? `data:image/jpeg;base64,${image.base64}`
              : image.thumbURL,
          }}
          style={styles.imageList}
        />
      )
    })
  }

  // 图片压缩
  const compressImage = async (image) => {
    // console.log("Image before compress: ", image);
    // const compressedImage = await ImageManipulator.manipulateAsync(
    //   image.uri,
    //   [{ resize: { width: 300 } }],
    //   { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    // )
    const returnImage = {
      // uri: compressedImage.uri,
      thumbURL: image.thumbURL,
      base64: image.base64,
      thumbURL: image.thumbURL,
      height: image.height / (image.width / 300),
      width: 300,
    }
    return returnImage
  }

  // 存入数据库
  const handleSubmit = async (status) => {
    try {
      const compressedImagesPromises = images.map(async (image) => {
        return compressImage(image)
      })
      const compressedImages = await Promise.all(compressedImagesPromises)
      const response = await fetch("http://10.0.2.2:3000/updatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          content: content,
          status: status,
          images: compressedImages,
          postId: postId,
          username: username,
        }),
      })
      if (response.ok) {
        alert("发布成功")
        navigation.navigate("MyInfo")
      } else {
        alert("发布失败")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  // 存入草稿箱
  const handleDraft = () => {
    console.log("存入草稿箱")
    handleSubmit("draft")
  }

  // 发布游记
  const handlePublish = () => {
    console.log("发布游记")
    handleSubmit("committed")
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
        <Image source={{ uri: userImg }} style={styles.userImage} />
        {/* 用户名 */}
        <Text style={styles.username}>{username}</Text>
      </View>

      <ScrollView style={{ width: wp("100%"), height: hp("15%") }}>
        <ScrollView
          style={{ width: "100%", marginLeft: 20 }}
          horizontal={true}
          scrollEnabled={isScrollEnabled}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.imageListContainer} onLayout={onContentLayout}>
            {renderImages()}
            <TouchableOpacity
              style={styles.addImageContainer}
              onPress={handleSelectImage}
            >
              <Image
                source={require("../../assets/加号_o.png")}
                style={styles.addImage}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TextInput
          style={styles.titleInput}
          placeholder={title}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.contentInput}
          placeholder={content}
          value={content}
          multiline={true}
          onChangeText={(text) => setContent(text)}
          onContentSizeChange={(event) => {
            setHeight(event.nativeEvent.contentSize.height)
          }}
        />
      </ScrollView>
      <TouchableOpacity style={styles.inboxContainer} onPress={handleDraft}>
        <View style={styles.iconContainer}>
          <AntDesign
            name="inbox"
            size={24}
            color="black"
            style={styles.inboxIcon}
          />
        </View>
        <Text style={styles.inboxText}>存草稿</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
        <Text style={styles.postText}>发布游记</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  goBackButton: {
    padding: 10,
  },
  imageList: {
    width: hp("12%"),
    height: hp("15%"),
    resizeMode: "contain",
    // marginLeft: 20,
    marginRight: 0,
    // borderColor: "gray",
    // borderWidth: 2,
    // borderRadius: 10,
  },
  imageListContainer: {
    // width: wp("500%"),

    height: hp("15%"),
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: 20,
    // flexWrap: "wrap",
    // justifyContent: "center",
    // alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  addImageContainer: {
    width: hp("15%"),
    height: hp("15%"),
    // justifyContent: "center",
    // alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  addImage: {
    // flex: 1,
    width: hp("15%"),
    height: hp("15%"),
    resizeMode: "contain",
    // marginLeft: 20,
    marginRight: -10,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
  },
  titleInput: {
    width: wp("90%"),
    height: hp("5%"),
    marginTop: 10,
    marginLeft: 20,
    borderColor: "gray",
    borderBottomWidth: 2,
    fontSize: 16,
  },
  contentInput: {
    width: wp("90%"),
    minHeight: hp("1%"),
    // height: Math.max(35, height),
    // marginTop: 8,
    marginLeft: 20,
    fontSize: 16,
    // borderColor: "black",
    // borderWidth: 2,
  },
  inboxContainer: {
    width: wp("15%"),
    height: hp("5%"),
    bottom: hp("2%"),
    left: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  iconContainer: {
    width: wp("7%"),
    height: wp("7%"),
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
    backgroundColor: "#eaeded",
    borderRadius: 25,
  },
  inboxIcon: {},
  inboxText: {
    fontSize: 16,
    // borderColor: "black",
    // borderWidth: 2,
  },
  publishBtn: {
    width: wp("75%"),
    height: hp("5%"),
    backgroundColor: "#59b051",
    borderRadius: 20,
    position: "absolute",
    bottom: hp("2%"),
    right: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  postText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingBottom: wp("1%"),
  },
  userImage: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: 20,
    marginLeft: -wp("20%"),
    borderColor: "black",
    borderWidth: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  wrapper: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
  },
  promptText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
})

import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logout } from "../../store/feature/userSlice"
import { Button, Input } from "@rneui/themed"
import { View, ScrollView, Image, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
// import { useHistory } from 'react-router-dom';

export default function AddTrade() {
  const user = useSelector(selectUser)
  console.log("user", user);
  // const history = useHistory()
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const contentWidth = useRef(0);
  const navigation = useNavigation()
  const [height, setHeight] = useState(0);
  // const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])

  // 先登录
  // useEffect(() => {
  //   if (user.username === "") {
  //     navigation.navigate("Login")
  //   }
  // }, [user])

  const onContentLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    const screenWidth = Dimensions.get('window');
    contentWidth.current = width;
    // console.log(contentWidth.current, screenWidth.width);
    setIsScrollEnabled(contentWidth.current > 0.8 * screenWidth.width);  
  }

  // 添加图片
  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.canceled) {
      // setImages(result.assets[0].base64);
      setImages(prevImages => [...prevImages, {
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
        height: result.assets[0].height,
        width: result.assets[0].width
      }
    ]);
    }
  }

  // 图片列表
  const renderImages = () => {
    return images.map((image, index) => {
      return (
        <Image
          key={index}
          source={{ uri: image.uri }}
          style={styles.imageList}
        />
      )
    })
  }

  // 图片压缩
  const compressImage = async (image) => {
    // console.log("Image before compress: ", image);
    const compressedImage = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    )
    const returnImage = {
      // uri: compressedImage.uri,
      // thumbURL: compressedImage.uri,
      base64: image.base64,
      height: image.height/(image.width/300),
      width: 300
    }
    // console.log("Image after compress: ", returnImage);
    return returnImage;
}

  // 存入数据库
  const handleSubmit = async (status) => {
    try {
      const compressedImagesPromises = images.map(async (image) => compressImage(image));
      const compressedImages = await Promise.all(compressedImagesPromises);
      const response = await fetch("http://10.0.2.2:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          content: content,
          images: compressedImages,
          status: status,
          // user: "6616cdfea41ccfe9f7678ff1", // user先以此代替
          userId: user.userId,
          username: user.username,
          userImg: user.userImg,
        }),
    })
    if (response.ok) {
      setTitle("")
      setContent("")
      setImages([])
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
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {/* 头部 */}
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="chevron-back" size={32} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: wp("100%"), height: hp("15%")}}>
        <ScrollView style={{width: "100%", marginLeft: 20}} horizontal={true} scrollEnabled={isScrollEnabled} showsHorizontalScrollIndicator={false}>
          <View style={styles.imageListContainer} onLayout={onContentLayout}>
            {renderImages()}
            <TouchableOpacity style={styles.addImageContainer} onPress={handleSelectImage}>
              <Image
                source={require("../../assets/加号_o.png")}
                style={styles.addImage}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TextInput
          style={styles.titleInput}
          placeholder="填写标题后更吸引人哦~"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="添加正文"
          value={content}
          multiline={true}
          onChangeText={(text) => setContent(text)}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height)
        }}
        />
      </ScrollView>
      <TouchableOpacity style={styles.inboxContainer} onPress={handleDraft}>
        <View style={styles.iconContainer}>
          <AntDesign name="inbox" size={24} color="black" style={styles.inboxIcon} />
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
  contentInput:{
    width: wp("90%"),
    minHeight: hp("1%"),
    // height: Math.max(35, height),
    // marginTop: 8,
    marginLeft: 20,
    fontSize: 16,
    // borderColor: "black",
    // borderWidth: 2,
  },
  inboxContainer:{
    width: wp("15%"),
    height: hp("5%"),
    bottom: hp("2%"),
    left: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  iconContainer:{
    width: wp("7%"),
    height: wp("7%"),
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
    backgroundColor: "#eaeded",
    borderRadius: 25,
  },
  inboxIcon: {

  },
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
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  wrapper: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20
  },
  promptText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
})

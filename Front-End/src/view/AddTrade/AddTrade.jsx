import React, { useEffect, useState } from "react"
// import { StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { setName, setAge } from "../../store/feature/userSlice"
import { Button, Input } from "@rneui/themed"
import { View, ScrollView, Image, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function AddTrade() {
  const navigation = useNavigation()
  const [height, setHeight] = useState(0);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const theme = useSelector((state) => state.theme)
  // const styles = StyleSheet.create({
  //   container: {
  //     backgroundColor: theme.back_theme,
  //     color: theme.font_theme,
  //   },
  // })
  useEffect(() => {
    // console.log("user", user)
    dispatch(setName("John"))
    dispatch(setAge(20))
  }, [])
  return (
    <View style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {/* 头部 */}
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="chevron-back" size={32} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: wp("100%")}}>
        <TouchableOpacity style={styles.addImageContainer}>
          <Image
            source={require("../../assets/加号_o.png")}
            style={styles.addImage}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.titleInput}
          placeholder="填写标题后更吸引人哦~"
        />
        <TextInput
          style={styles.contentInput}
          placeholder="添加正文"
          multiline={true}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height)
        }}
        />
        {/* <Input
          style={styles.contentInput}
          placeholder="Comment"
          multiline={true}
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          onChangeText={value => this.setState({ comment: value })}
        /> */}
      </ScrollView>
      <TouchableOpacity style={styles.inboxContainer} onPress={() => navigation.goBack()}>
        <View style={styles.iconContainer}>
          <AntDesign name="inbox" size={24} color="black" style={styles.inboxIcon} />
        </View>
        <Text style={styles.inboxText}>存草稿</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.publishBtn} onPress={() => navigation.goBack()}>
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
  addImageContainer: {
    width: wp("100%"),
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
    marginLeft: 20,
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
})

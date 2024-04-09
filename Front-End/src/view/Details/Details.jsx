import React, { Component } from "react";
import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import CarouselComponent from "./CarouselComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require("../../assets/1.jpg"),
        require("../../assets/2.jpg"),
        require("../../assets/3.jpg"),
      ],
      activeSlide: 0
    };
  }

  updateActiveSlide = (index) => {
    this.setState({ activeSlide: index });
  }

  render() {
    return (
      <View style={styles.background}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {/* 头部 */}
        <View style={styles.headContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          {/* 用户头像 */}
          <Image
            source={require("../../assets/头像.png")}
            style={styles.userImage}
          />
          {/* 用户名 */}
          <Text style={styles.username}>用户名</Text>
          {/* 分享按钮 */}
          <TouchableOpacity style={styles.shareButton}>
            <SimpleLineIcons name="share-alt" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{width: wp("100%")}}>
          {/* 轮播图 */}
          <CarouselComponent 
            images={this.state.images}
            activeSlide={this.state.activeSlide}
            updateActiveSlide={this.updateActiveSlide}
          />
          <View style={styles.articleContainer}>
            <Text style={styles.title}>标题</Text>
            <Text style={styles.content}>正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文</Text>
          </View>
          <View style={styles.postedTimeContainer}>
            <Text style={styles.postedTime}>发布时间</Text>
          </View>
        </ScrollView>

      </View>
    ) 
}}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  headContainer: {
    width: wp('100%'),
    height: hp('7%'),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp('2%'),
    // borderColor: "black",
    // borderWidth: 1,
  },
  goBackButton: {
    marginLeft: wp('3%'),
    // borderColor: "black",
    // borderWidth: 1,
  },
  userImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 20,
    marginLeft: -wp('20%'),
    borderColor: "black",
    borderWidth: 1,
  },
  username: {
    marginLeft: -wp('20%'),
    fontSize: 24,
    fontWeight: "bold",
    // borderColor: "black",
    // borderWidth: 1,
  },
  shareButton: {
    marginLeft: wp('20%'),
    marginRight: wp('3%'),
    // borderColor: "black",
    // borderWidth: 1,
  },
  articleContainer: {
    width: wp('100%'),
    padding: wp('3%'),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    marginTop: wp('3%'),
    fontSize: 18,
  },
  postedTimeContainer: {
    width: wp('100%'),
    padding: wp('3%'),
    alignItems: "flex-end",
  },
  postedTime: {
    fontSize: 12,
    color: "gray",
  },
})

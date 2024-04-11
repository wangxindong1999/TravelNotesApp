import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation()
  return (
    <View style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Image
        source={require("../../assets/welcome.png")}
        style={styles.welcomeImage} 
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btnText}>出发吧</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  welcomeImage: {
    width: wp("100%"),
    height: hp("100%"),
    position: "absolute",
  },
  btnContainer: {
    width: wp("100%"),
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  btn: {
    width: wp("90%"),
    height: hp("7%"),
    backgroundColor: "#4bd122",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  btnText: {
    color: "#e5e8e3",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 3,
  },
})
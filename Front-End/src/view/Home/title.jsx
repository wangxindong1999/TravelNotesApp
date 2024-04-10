import React from "react"
import { Text,View,StyleSheet, TouchableOpacity,Image} from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function Title() {
  const navigation = useNavigation();
  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.textstyle}>享受生活  记录生活</Text>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Image
                  source={require('../../assets/search.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flexDirection: 'row', // 水平排列
        justifyContent: 'space-between', // 在两端对齐
        alignItems: 'center', // 垂直居中
    },
    textstyle:{
      fontSize:26,
        color:'#67B553',
        fontWeight:'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.35)', // 阴影颜色
        textShadowOffset: { width: 1, height: 1 }, // 阴影偏移量
        textShadowRadius: 3, // 阴影半径

    },
    avatarContainer: {
      width: 30,
      height: 30,
    }
  });
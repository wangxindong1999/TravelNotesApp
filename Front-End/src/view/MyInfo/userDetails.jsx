import React ,{useState}from 'react';
import {View,StyleSheet, TouchableOpacity,Image, Button,Text,TextInput} from "react-native"

export default function UserDetails({route}){
    const { uname, uImg ,index} = route.params;
    const [value, onChangeText] = React.useState(uname);
    const [img, changeImg] = React.useState(uImg);
    const [searchText, setSearchText] = React.useState('');
    const [prePassword,setPrePassword]=React.useState('');
    const [newPassword,setNewPassword]=React.useState('');
    console.log(uname, uImg ,index);
    const handleSearch = () => {
        setSearchText(value);
        console.log(searchText);
    };
    const submitPassword = () => {
        console.log(prePassword,newPassword);
    };
    return(<View style={styles.container}>
        {index==0&&( <View >
            <TouchableOpacity onPress={() => console.log(2568)}>
                <Image
                  source={img}
                  style={{ width: 300, height: 300,marginBottom:50,marginLeft:"10%" }}
                />
        </TouchableOpacity>
        <Button title='确认修改' onPress={(item)=>changeImg(item)}></Button>
        </View>       )} 
        {index==1&&(
            <View>
                <TextInput
                placeholder={uname}
                style={styles.search}
                onChangeText={(text)=>onChangeText(text)}
                returnKeyType="search"/>
                 <Button title='确认修改' onPress={handleSearch}></Button>
            </View>)}
      {index==2&&(<View>
        <TextInput
          placeholder="请输入原密码"
          style={styles.search}
          onChangeText={(text)=>setPrePassword(text)}
          returnKeyType="search"
      />
      <TextInput
          placeholder="请输入新密码"
          style={styles.search}
          onChangeText={(text)=>setNewPassword(text)}
          returnKeyType="search"
      />
      <Button title="确认修改" onPress={submitPassword} 
      ></Button>
      </View>
      )}
    </View>)
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        width:"90%",
        marginLeft:"5%",
        flex:1,
    },
    search:{
      marginLeft:'2.5%',
      borderWidth: 1,
      marginTop:10,
      borderColor: 'gray',
      padding: 10,
      height:35,
      fontSize:10,
      marginBottom:10
  }
  });
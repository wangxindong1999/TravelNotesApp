import React from "react";
import { TextInput,StyleSheet,View } from "react-native";

export default function Search() {
    const [value, onChangeText] = React.useState('Useless Placeholder');
    const handleSearch = () => {
      console.log(value);
    };
    return(
        <View style={styles.container}>
            <TextInput placeholder="Search..."style={styles.search} onSubmitEditing={handleSearch} 
            onChangeText={text => onChangeText(text)} returnKeyType="search" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'95%',
        alignSelf:'center',
        marginBottom:10,
    },
    search:{
      borderWidth: 1,
      marginTop:20,
      borderColor: 'gray',
      padding: 10,
      height:35,
      fontSize:10,
      borderRadius: 20,
  }
  });
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window')

const CarouselComponent = ({images, updateActiveSlide, activeSlide}) => {
  const _renderItem = ({item, index}, parallaxProps) => {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
         {...parallaxProps}
       />
    </View>
    );
  }
  const pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <Pagination
            dotsLength={images.length}
            activeDotIndex={activeSlide}
            containerStyle={{
            alignSelf: 'center',
            paddingBottom: 30,
            backgroundColor: 'rgba(208, 208, 208, 0)'
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          inactiveDotStyle={{
            
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
  );
}
  if(images.length === 0) {
      return <View></View>
  }else {
      return (
        <View style={styles.carousel_container}>
          <Carousel
            data={images}
            renderItem={_renderItem}
            onSnapToItem={(index) => updateActiveSlide(index)}
            hasParallaxImages={true}
            sliderWidth={width}
            // sliderHeight={width}
            itemWidth={ wp('85%') }
          />
          { pagination() }
        </View>
        );
      }
}

const styles = StyleSheet.create({
  paginationContainer: {
    // backgroundColor: 'rgba(0, 0, 0, 0.75)',
    // paddingVertical: 10 ,
    width: wp('100%'),
    height: hp('7%'),
  },
  carousel_container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp("100%"),
    height: hp('38%'),
    marginTop: 20,
    backgroundColor: 'white',
    // backgroundColor: 'rgba(208, 208, 208, .6)',
    // borderColor: 'black',
    // borderWidth: 2
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('85%'),
    height: hp('30%'),
  },
  imageContainer: {
    flex: 1,
    // marginBottom: 1,
    // backgroundColor: 'white',
    borderRadius: 25,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
})

export default CarouselComponent;
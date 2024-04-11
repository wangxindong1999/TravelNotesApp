import { PureComponent, Component } from 'react'
import { View, Dimensions, Image, Animated, ImageProps, ActivityIndicator, Text, Platform, TouchableOpacity, Alert } from 'react-native'
import WaterfallFlow from 'react-native-waterfall-flow'
import imgList from './imgList'

const window = Dimensions.get('window')

export default class TestWaterfallFlowScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      refreshing: false,
      noMore: false,
      inited: false
    }
    this.page = 1
    this.pageSize = 10
    this.loading = false
    this.listRef = null
  }

  componentDidMount() {

    this.loadData(1)

    setTimeout(() => { // test WaterfallFlow's methods
      // this.listRef.scrollToIndex({ index: 6 })
      // this.listRef.scrollToEnd()
      // this.listRef.scrollToOffset({ offset: 200 })
    }, 3000)
  }

  loadData = (page = 1, refreshing) => {
    if (this.loading) {
      return
    }
    this.loading = true
    if (refreshing) {
      this.setState({
        refreshing: true
      })
    } 
    setTimeout(() => { // mock request data
      const newData = imgList.slice((page - 1) * this.pageSize, page * this.pageSize).map(img => {
        const { width, height } = img
        const cardWidth = Math.floor(window.width / 2)
        return {
          ...img, 
          width: cardWidth,
          height: Math.floor(height / width * cardWidth)
        }
      })
      const noMore = newData.length < this.pageSize
      this.loading = false
      this.page = refreshing ? 1 : page
      this.setState({
        data: refreshing ? newData : this.state.data.concat(newData),
        refreshing: false,
        noMore,
        inited: true
      })
    }, refreshing ? 1000 : 500)
  }

  onEndReached = () => {
    if (!this.state.noMore) {
      this.loadData(this.page + 1)
    }
  }

  render() {
    const { data, refreshing, noMore, inited } = this.state
    return (
      <WaterfallFlow
        ref={ref => this.listRef = ref}
        style={{ width:'95%',alignSelf:'center'}}
        // contentContainerStyle={{ backgroundColor: '#EDF8EF' }}
        ListHeaderComponent={null}
        ListFooterComponent={<Footer noMore={noMore} inited={inited} isEmpty={data.length === 0}/>}
        ListEmptyComponent={<Empty inited={inited} />}
        data={data}
        numColumns={2}
        initialNumToRender={10}
        onEndReached={this.onEndReached}
        refreshing={refreshing}
        onRefresh={() => this.loadData(1, true)}
        renderItem={({ item, index, columnIndex }) => {
          return (
            <Card item={item} index={index} columnIndex={columnIndex} />
          )
        }}
      />
    )
  }
}

class Card extends PureComponent {
  detailPage = (item) => {
    console.log(item.title);
    console.log(888);
  };
  render() {
    const { item, index, columnIndex } = this.props
    return (
      <View style={{ flex: 1, overflow: 'hidden',borderRadius:5}}>
        <TouchableOpacity 
          style={{ backgroundColor: '#fff', flex: 1 ,marginBottom:5,marginLeft:columnIndex===0?0:5,borderRadius:5}} 
          activeOpacity={1}
          onPress={()=> this.detailPage(item) }
        >
          <Image 
            source={{ uri: item.thumbURL, width: item.width, height: item.height }} 
            resizeMode="cover" 
          />
          <Text style={{fontWeight:500,padding:5}}>{item.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'flex-end',padding:5}}>
            <Text style={{fontSize:12,color:'gray',marginRight:5}}>路西西</Text>
            <View style={{width: 20,height: 20,borderRadius: 10, overflow: 'hidden'}}>
                <Image source={require('../../assets/person1.jpg')} style={{ flex: 1,resizeMode: 'cover', width: null,
      height: null,}}/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

class Footer extends PureComponent {
  render() {
    const { noMore, inited, isEmpty } = this.props
    if (!inited || isEmpty) {
      return null
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60 }}>
        {!noMore && <ActivityIndicator color="red"/>}
        <Text style={{ color: '#999', marginLeft: 8 }}>{noMore ? '我是有底线的哦~' : '加载中...'}</Text>
      </View>
    )
  }
}


class Empty extends PureComponent {
  render() {
    const { inited } = this.props
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 300 }}>
        {!inited && <ActivityIndicator color="red"/>}
        <Text style={{ color: '#999', marginLeft: 8 }}>{inited ? '这里空空的哦~' : '获取数据中...'}</Text>
      </View>
    )
  }
}

class FadeImage extends Component<ImageProps> {

  constructor(props) {
    super(props)
    this._animatedValue = new Animated.Value(0)
  }

  render() {
    const { style, onLoadEnd } = this.props
    if (Platform.OS === 'android') {
      return <Image {...this.props}/>
    }
    return (
      <Animated.Image 
        {...this.props}
        onLoadEnd={() => {
          Animated.timing(this._animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }).start()
          onLoadEnd && onLoadEnd()
        }}
        style={[style, { opacity: this._animatedValue }]} 
      />
    )
  }
}
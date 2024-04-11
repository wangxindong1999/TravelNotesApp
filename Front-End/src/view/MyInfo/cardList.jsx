import { PureComponent, Component,useState,useEffect } from 'react'
import { View, Dimensions, Image, Animated, ImageProps, ActivityIndicator, Text, Platform, TouchableOpacity, Alert, Button } from 'react-native'
import WaterfallFlow from 'react-native-waterfall-flow'
import imgList from './imgList'
import { connect } from 'react-redux';

const window = Dimensions.get('window')
const mapStateToProps = (state) => {
  return {
    activeIndex: state.activeIndex.value
  };
};

class CardList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      refreshing: false,
      noMore: false,
      inited: false,
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

  loadData = async (page = 1, refreshing) => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    if (refreshing) {
      this.setState({
        refreshing: true
      });
    }
    try {
      const response = await fetch("http://10.0.2.2:3000/myInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPage: page,
          pageSize: this.pageSize,
          searchText:'',
          activeIndex:activeIndex,
        })
      });
  
      if (response.ok) {
        const cardList = await response.json();
        if (cardList.length !== 0) {
          const newData = cardList.map(item => {
            const width = item.images.width;
            const height = item.images.height;
            const thumbURL=item.images.thumbURL;
            const id=item.reviewer_id;
            const username=item.username;
            const userImg=item.userImg;
            const cardWidth = Math.floor(window.width / 2);
            const title=item.title;
            return {
              width: cardWidth,
              height: Math.floor((height / width) * cardWidth),
              thumbURL:thumbURL,
              id:id,
              userImg:userImg,
              username:username,
              title:title
            };
          });
  
          const noMore = newData.length < this.pageSize;
          this.loading = false;
          this.page = refreshing ? 1 : page;
          this.setState({
            data: refreshing ? newData : this.state.data.concat(newData),
            refreshing: false,
            noMore,
            inited: true
          });
        } else {
          alert("到底了！");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // 处理错误，例如显示错误信息给用户
    }
  };
  

  onEndReached = () => {
    if (!this.state.noMore) {
      this.loadData(this.page + 1)
    }
  }

  render() {
    const { data, refreshing, noMore, inited} = this.state
    const { activeIndex } = this.props;
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
            <ConnectedCard item={item} index={index} columnIndex={columnIndex}/>
          )
        }}
      />
    )
  }
}

class Card extends PureComponent {

  render() {
    const { item, index, columnIndex } = this.props;
    const { activeIndex } = this.props;
    const reason="涉及违规词汇"
    return (
      <View style={{ flex: 1, overflow: 'hidden',borderRadius:5}}>
        <TouchableOpacity 
          style={{ backgroundColor: '#fff', flex: 1 ,marginBottom:5,marginLeft:columnIndex===0?0:5,borderRadius:5}} 
          activeOpacity={1}
          onPress={()=>{console.log(activeIndex)} }
        >
          <Image 
            source={{ uri: item.thumbURL, width: item.width, height: item.height }} 
            resizeMode="cover" 
          />
          <Text style={{fontWeight:500,padding:5}}>{item.title}</Text>
          <ConnectedOperate/>
          {activeIndex===2 &&
            <Text style={{color:'red',fontWeight:'600',paddingLeft:5,marginBottom:5}}>!{reason}</Text>
          }
        </TouchableOpacity>
      </View>
    )
  }
}

class Operate extends PureComponent{

  render(){
    const { activeIndex } = this.props;
    return(
      <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',padding:5}}>
        {/* 分享 */}
        {activeIndex===0 &&
        <TouchableOpacity onPress={()=>{console.log(activeIndex)}}>
          <Image source={require('../../assets/share.png')} style={{width:18,height:18}}></Image>
        </TouchableOpacity>
        }
        {/* 编辑*/}
        {(activeIndex===1||activeIndex===2) &&
        <TouchableOpacity onPress={()=>{console.log(activeIndex)}}>
          <Image source={require('../../assets/write.png')} style={{width:17,height:17}}></Image>
        </TouchableOpacity>
        }
        {/* 删除 */}
        <TouchableOpacity onPress={()=>{console.log(activeIndex)}}>
          <Image source={require('../../assets/delete.png')} style={{width:20,height:20}}></Image>
        </TouchableOpacity>
        {/* 发布 */}
        {activeIndex===3 &&
          <View style={{borderRadius:10,backgroundColor:'#4AB05C',width:60,height:20,alignItems:'center'}}>
            <Text style={{color:'#fff'}}>发布</Text>
          </View>
        }
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


export default connect(mapStateToProps)(CardList);
const ConnectedCard= connect(mapStateToProps)(Card);
const ConnectedOperate= connect(mapStateToProps)(Operate);



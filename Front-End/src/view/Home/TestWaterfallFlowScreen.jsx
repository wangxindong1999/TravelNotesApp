import { PureComponent, Component } from "react"
import {
  View,
  Dimensions,
  Image,
  Animated,
  ImageProps,
  ActivityIndicator,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native"
import WaterfallFlow from "react-native-waterfall-flow"
import { connect } from "react-redux"

const window = Dimensions.get("window")

export default class TestWaterfallFlowScreen extends Component {
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
  }

  componentDidUpdate(prevProps) {
    // 当 searchText 发生变化时重新请求数据
    if (this.props.searchText !== prevProps.searchText) {
      this.loadData(1)
    }
  }

  loadData = async (page = 1, refreshing) => {
    if (this.loading) {
      return
    }
    this.loading = true
    if (refreshing) {
      this.setState({
        refreshing: true,
      })
    }
    try {
      const response = await fetch("http://10.0.2.2:3000/indexList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPage: page,
          pageSize: this.pageSize,
          searchText: "",
        }),
      })

      if (response.ok) {
        const cardList = await response.json()
        if (cardList.length === undefined) {
          this.loading = false
          this.setState({
            data: this.state.data,
            refreshing: false,
            noMore: true,
            inited: true,
          })
          return
        }
        if (cardList.length !== 0) {
          const newData = cardList.map((item) => {
            const width = item.images.width
            const height = item.images.height
            const thumbURL = item.images.thumbURL
            const all_thumbURL = item.all_images.map((image) => image.thumbURL)
            const base64 = item.images.base64
            const all_base64 = item.all_images.map((image) => image.base64)
            const id = item.reviewer_id
            const username = item.username
            const userImg = item.userImg
            const cardWidth = Math.floor(window.width / 2)
            const title = item.title
            const content = item.content
            // console.log(all_thumbURL)
            // console.log(userImg, "dwadawd")
            return {
              width: cardWidth,
              height: Math.floor((height / width) * cardWidth),
              thumbURL: thumbURL,
              all_thumbURL: all_thumbURL,
              base64: "data:image/png;base64," + base64,
              all_base64: all_base64,
              id: id,
              userImg: userImg,
              username: username,
              title: title,
              content: content,
              status: item.status,
            }
          })

          const noMore = newData.length < this.pageSize
          this.loading = false
          this.page = refreshing ? 1 : page
          this.setState({
            data: refreshing ? newData : this.state.data.concat(newData),
            refreshing: false,
            noMore,
            inited: true,
          })
        } else {
          alert("到底了！")
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      // 处理错误，例如显示错误信息给用户
    }
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
        ref={(ref) => (this.listRef = ref)}
        style={{ width: "95%", alignSelf: "center" }}
        ListHeaderComponent={null}
        ListFooterComponent={
          <Footer noMore={noMore} inited={inited} isEmpty={data.length === 0} />
        }
        ListEmptyComponent={<Empty inited={inited} />}
        data={data}
        numColumns={2}
        initialNumToRender={10}
        onEndReached={this.onEndReached}
        refreshing={refreshing}
        onRefresh={() => this.loadData(1, true)}
        renderItem={({ item, index, columnIndex }) => {
          return (
            <Card
              item={item}
              index={index}
              columnIndex={columnIndex}
              navigation={this.props.navigation}
            />
          )
        }}
      />
    )
  }
}

class Card extends PureComponent {
  detailPage = (item) => {
    console.log(item.title)
    console.log(888)
  }
  render() {
    const { item, index, columnIndex } = this.props
    return (
      <View style={{ flex: 1, overflow: "hidden", borderRadius: 5 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            flex: 1,
            marginBottom: 5,
            marginLeft: columnIndex === 0 ? 0 : 5,
            borderRadius: 5,
          }}
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate("Details", {
              itemId: item.id,
              thumbURL: item.thumbURL,
              all_thumbURL: item.all_thumbURL,
              base64: item.base64,
              all_base64: item.all_base64,
              userImg: item.userImg,
              username: item.username,
              title: item.title,
              content: item.content,
              postedAt: item.postedAt,
              status: item.status,
            })
          }
        >
          <Image
            source={{
              uri: item.thumbURL ? item.thumbURL : item.base64,
              width: item.width,
              height: item.height,
            }}
            resizeMode="cover"
          />
          <Text style={{ fontWeight: 500, padding: 5 }}>{item.title}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: "gray", marginRight: 5 }}>
              {item.username}
            </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.userImg }}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  width: null,
                  height: null,
                }}
              />
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 60,
        }}
      >
        {!noMore && <ActivityIndicator color="red" />}
        <Text style={{ color: "#999", marginLeft: 8 }}>
          {noMore ? "我是有底线的哦~" : "加载中..."}
        </Text>
      </View>
    )
  }
}

class Empty extends PureComponent {
  render() {
    const { inited } = this.props
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 300,
        }}
      >
        {!inited && <ActivityIndicator color="red" />}
        <Text style={{ color: "#999", marginLeft: 8 }}>
          {inited ? "这里空空的哦~" : "获取数据中..."}
        </Text>
      </View>
    )
  }
}

// export default connect(mapStateToProps)(TestWaterfallFlowScreen);

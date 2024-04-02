import Home from "../view/Home/Home"
import About from "../view/Login/Login"
import AddTrade from "../view/AddTrade/AddTrade"
import MyInfo from "../view/MyInfo/MyInfo"
import svgs from "../assets/svg/svgs"
import { Text } from "react-native"
const { Home: HomeSvg, User: UserSvg, Add: AddSvg } = svgs
//路由配置
const routes = [
  {
    name: "Home", //首页
    // component: Home,
    options: {
      //Stack路由的标题格式设置，这里设置为false不显示
      headerShown: false,
    },
    children: [
      {
        //Tab中嵌套的底部菜单栏路由
        name: "Homes",
        component: Home,
        options: {
          headerShown: false,
          //options中设置标题格式，公共样式在menu里
          title: "首页",
        },
      },
      {
        name: "AddTrade",
        component: AddTrade,
        options: {
          headerShown: false,
          title: "",
        },
      },
      {
        name: "MyInfo",
        component: MyInfo,
        options: {
          headerShown: false,
          title: "我的",
        },
      },
    ],
  },
  {
    name: "Login", //可以暂设为登录路由
    component: About,
  },
]
//图标选择函数
const getTabBarIcon = (focused, iconFoc, iconNoFoc) => {
  return focused ? iconFoc : iconNoFoc
}
//底部Nav自定义配置
export const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, size, color }) => {
    //底部导航栏图标
    return null
    // if (route.name === "Homes") {
    //   return null
    //   // return getTabBarIcon(focused, HomeSvg, HomeSvg)
    // } else if (route.name === "Homess") {
    //   return null
    //   // return getTabBarIcon(focused, UserSvg, UserSvg)
    // } else if (route.name === "Homesss") {
    //   // return getTabBarIcon(focused, AddSvg, AddSvg)
    //   return null
    // }
  },
  tabBarLabel: ({ focused, color, size }) => {
    let label = ""
    if (route.name === "Homes") {
      label = "首页"
    } else if (route.name === "MyInfo") {
      label = "我的"
    } else if (route.name === "AddTrade") {
      // return getTabBarIcon(focused, AddSvg, AddSvg)
      return (
        <Text
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#59b051",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            width: 50,
          }}
        >
          {AddSvg}
        </Text>
      )
    }
    return (
      <Text
        style={{
          color: focused ? "black" : "gray",
          fontSize: 20,
          fontWeight: focused ? "900" : "normal",
        }}
      >
        {label}
      </Text>
    )
  },
  //   //底部导航栏样式
  tabBarActiveTintColor: "black",
  tabBarInactiveTintColor: "gray",
  // tabBarLabelStyle: {
  //   fontSize: 20,
  // },
  // tabBarStyle: {
  //   // backgroundColor: "red",
  //   // height: 40,
  // },
})

export default routes

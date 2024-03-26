import Home from "../view/Home/Home"
import About from "../view/About/About"
import Homes from "../view/Home1/Home"
import Homess from "../view/Home2/Home"
import svgs from "../assets/svg/svgs"
const { Home: HomeSvg, User: UserSvg } = svgs
//路由配置
const routes = [
  {
    name: "Home", //首页
    component: Home,
    options: {
      //Stack路由的标题格式设置，这里设置为false不显示
      headerShown: false,
    },
    children: [
      {
        //Tab中嵌套的底部菜单栏路由
        name: "Homes",
        component: Homes,
        options: {
          //options中设置标题格式，公共样式在menu里
          title: "首页",
        },
      },
      {
        name: "Homess",
        component: Homess,
        options: {
          title: "首页2",
        },
      },
    ],
  },
  {
    name: "About", //可以暂设为登录路由
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
    if (route.name === "Homes") {
      return getTabBarIcon(focused, HomeSvg, HomeSvg)
    } else if (route.name === "Homess") {
      return getTabBarIcon(focused, UserSvg, UserSvg)
    }
  },
  //   //底部导航栏样式
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
  tabBarStyle: {
    backgroundColor: "red",
  },
})

export default routes

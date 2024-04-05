//导航栏路由
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const Tab = createBottomTabNavigator()
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()
import routes from "./routes"
import { screenOptions } from "./routes"

const tabRoute = (tab) => {
  return (
    <Tab.Navigator
      initialRouteName="Homes" //初始界面路由名称
      screenOptions={screenOptions} //底部导航栏样式
    >
      {tab.map((item) => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              //公共样式
              headerStyle: {
                backgroundColor: "#f4511e",
                height: 50,
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              ...item.options,
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}
const route = (routes) => {
  return (
    <Stack.Navigator>
      {routes.map((item) => {
        return (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={
              item.children ? () => tabRoute(item.children) : item.component
            }
            options={item.options}
          ></Stack.Screen>
        )
      })}
    </Stack.Navigator>
  )
}

export default function Menu() {
  return (
    <>
      <NavigationContainer>{route(routes)}</NavigationContainer>
    </>
  )
}

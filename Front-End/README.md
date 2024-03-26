1、底部导航栏的静态图片资源：首先要在 src/index 中进行 path 的导入；在 routes.js 的 screenOptions 函数中进行判断，选择标签选中与未选中的样式
2、目前一级路由共分为两个，一个是登录注册路由，一个是底部导航栏 Nav 路由。二级路由为 Nav 的子路由，即底部导航栏的路由。可在 router/routes.js 中进行路由的编写
3、toolkit 使用：案例可见 Home/Home.jsx
import { useSelector,useDispatch } from "react-redux"
import { setName, setAge } from "../../store/feature/userSlice"
const user = useSelector((state) => state.user)
const dispatch = useDispatch()
数据：user.xxx; 修改:dispatch(setName(参数))
4、svg 图片
目前 svg 图片存在问题，需要自己手动导入，但是由于 svg
图片用的不是很多，没有解决手动导入问题,阿里矢量库要选择复制 SVG 代码。复制到 svgs.js 中后要手动修改 calss 为 className；xmlns:xlink 改为 xmlnsXlink

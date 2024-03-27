import React, { useEffect } from "react"
import { StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { setName, setAge } from "../../store/feature/userSlice"
import { Button } from "@rneui/themed"

export default function Homes() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const theme = useSelector((state) => state.theme)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.back_theme,
      color: theme.font_theme,
    },
  })
  useEffect(() => {
    console.log("user", user)
    dispatch(setName("John"))
    dispatch(setAge(20))
  }, [])
  return (
    <div style={styles.container}>
      Homes
      <Button>测试按钮</Button>
    </div>
  )
}

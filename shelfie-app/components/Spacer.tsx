import { View } from 'react-native'

const Spacer = ({ width = "100%", height = 40 }: { width?: any, height?: any }) => {
  return (
    <View style={{ width, height }} />
  )
}

export default Spacer
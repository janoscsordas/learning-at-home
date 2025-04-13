import { Image, useColorScheme } from 'react-native'

// images
import DarkLogo from '../assets/img/logo_dark.png'
import LightLogo from '../assets/img/logo_light.png'

const ThemedLogo = ({ ...props }: { [key: string]: any }) => {
  const colorScheme = useColorScheme()
  
  const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

  return (
    <Image source={logo} {...props} />
  )
}

export default ThemedLogo
import BaseToggle from 'react-native-toggle-element'
import { ReactNativeToggleElementProps } from 'react-native-toggle-element/lib/types'
import Colors from '@/constants/Colors'

type IProps = Partial<ReactNativeToggleElementProps> & {}

function Toggle({ ...props }: IProps) {
  return (
    <BaseToggle
      {...props}
      thumbButton={{
        activeBackgroundColor: 'transparent',
        inActiveBackgroundColor: 'transparent',
      }}
      trackBar={{
        activeBackgroundColor: Colors.lightBackground,
        inActiveBackgroundColor: Colors.lightBackground,
        borderActiveColor: Colors.background,
        borderInActiveColor: Colors.background,
        borderWidth: 5,
        width: 100,
        height: 45,
      }}
    />
  )
}

export default Toggle

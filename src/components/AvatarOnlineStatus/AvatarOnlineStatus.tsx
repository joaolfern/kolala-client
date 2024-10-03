import { StyleSheet } from 'react-native'

import Colors from '@/constants/Colors'
import type { IAvatar } from '../Avatar/Avatar'
import AvatarWithIcon from '../AvatarWithIcon/AvatarWithIcon'
import Span from '../Span/Span'

type IProps = IAvatar & {
  isOnline: boolean
}

function AvatarOnlineStatus({ isOnline, ...rest }: IProps) {
  return (
    <AvatarWithIcon {...rest}>
      <Span
        style={[
          styles.onlineMarker,
          styles[isOnline ? 'onlineMarkerOnline' : 'onlineMarkerOffline'],
        ]}
      />
    </AvatarWithIcon>
  )
}

const styles = StyleSheet.create({
  onlineMarker: {
    width: 15,
    height: 15,
    borderRadius: 99999,
  },
  onlineMarkerOnline: {
    backgroundColor: Colors.green,
  },
  onlineMarkerOffline: {
    backgroundColor: Colors.red,
  },
})

export default AvatarOnlineStatus

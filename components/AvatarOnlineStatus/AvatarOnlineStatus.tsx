import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import Avatar, { IAvatar } from '../Avatar/Avatar'
import Span from '../Span/Span'

type IProps = IAvatar & {
  isOnline: boolean
}

function AvatarOnlineStatus({ isOnline, ...rest }: IProps) {
  return (
    <Span style={styles.Wrapper}>
      <Avatar {...rest} />
      <Span
        style={[
          styles.onlineMarker,
          styles[isOnline ? 'onlineMarkerOnline' : 'onlineMarkerOffline'],
        ]}
      />
    </Span>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    position: 'relative',
  },
  onlineMarker: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 0,
    bottom: 0,
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

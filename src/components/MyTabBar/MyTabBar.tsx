import { StyleSheet, View } from 'react-native'

import EventsButton from './EventsButton'
import ProfileTabButton from './ProfileTabButton'

function MyTabBar() {
  return (
    <View style={styles.TabBar}>
      <ProfileTabButton />
      <EventsButton />
    </View>
  )
}

const styles = StyleSheet.create({
  TabBar: {
    flexDirection: 'row',
    elevation: 0,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})

export default MyTabBar

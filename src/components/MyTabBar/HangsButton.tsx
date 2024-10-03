import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

import PersonSVG from '@/assets/images/person.svg'
import Colors from '@/constants/Colors'
import Button from '../Button/Button'
import Span from '../Span/Span'
import { usePreventGuest } from '@/hooks/usePreventGuest'

function HangsButton() {
  const hasNotifications = true
  const navigation = useNavigation()
  const { preventGuest } = usePreventGuest()

  const onPress = () => {
    preventGuest()
    navigation.navigate('Events')
  }

  return (
    <Button
      style={styles.HangsButton}
      onPress={onPress}
      accessibilityRole='button'
    >
      <PersonSVG />
      <Span style={styles.NotificationMarker} />
    </Button>
  )
}

const styles = StyleSheet.create({
  HangsButton: {
    backgroundColor: Colors.orangeColor,
    width: 51,
    height: 47,
    marginBottom: 17,
    marginRight: 16,
    position: 'relative',
  },
  Icon: {},
  NotificationMarker: {
    position: 'absolute',
    top: -2,
    right: -1.5,
    width: 15,
    height: 15,
    backgroundColor: Colors.primaryColor,
    borderRadius: 99999,
    elevation: 2,
    shadowColor: '#000000',
  },
})

export default HangsButton

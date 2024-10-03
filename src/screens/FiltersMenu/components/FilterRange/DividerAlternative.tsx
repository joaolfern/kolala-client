import { StyleSheet } from 'react-native'

import Span from '@/components/Span/Span'
import Text from '@/components/Text/Text'
import Colors from '@/constants/Colors'

function DividerAlternative() {
  return (
    <Span style={styles.DividerContainer}>
      <Text style={styles.DividerText}>ou</Text>
      <Span style={styles.DividerLine} />
    </Span>
  )
}

export default DividerAlternative

const styles = StyleSheet.create({
  DividerContainer: {
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  DividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.text,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: -1,
  },
  DividerText: {
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
})

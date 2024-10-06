import { MaterialIcons } from '@expo/vector-icons'
import type { SectionListData } from 'react-native'
import { StyleSheet } from 'react-native'
import Span from '@/components/Span/Span'
import Text from '@/components/Text/Text'
import Colors from '@/constants/Colors'
import type { IEventListItem, IEventSections } from '@/Models/Event'
import type { _eventListTypes } from '../../Events'
import NoResultMessage from '../NoResultMessage/NoResultMessage'
import Toggle from '@/components/Toggle/Toggle'

interface IProps {
  section: SectionListData<IEventListItem, IEventSections>
  showPastEvents: boolean
  toggleShowPastEvents(): void
}

function EventListSectionTitle({
  section,
  toggleShowPastEvents,
  showPastEvents,
}: IProps) {
  return (
    <Span style={styles.Wrapper}>
      <Span style={styles.Header}>
        <Text style={styles.Title}>
          {TRANSLATE_LIST_TYPE[section.title as _eventListTypes]}
        </Text>
        <Toggle
          value={showPastEvents}
          onPress={toggleShowPastEvents}
          thumbActiveComponent={
            <MaterialIcons
              size={38}
              name='history'
              color={Colors.secondaryColor}
            />
          }
          thumbInActiveComponent={
            <MaterialIcons
              size={40}
              name='explore'
              color={Colors.secondaryColor}
              solid
            />
          }
        />
      </Span>
      {!section.data.length && <NoResultMessage />}
    </Span>
  )
}

export default EventListSectionTitle

const styles = StyleSheet.create({
  Wrapper: {
    paddingVertical: 10,
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
  },
  Header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 7,
  },
  Toogle: {},
})

const TRANSLATE_LIST_TYPE: { [key in _eventListTypes]: string } = {
  organizing: 'Organizando',
  participating: 'Participando',
}

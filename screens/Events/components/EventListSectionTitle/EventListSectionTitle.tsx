import React from 'react'
import { SectionListData, StyleSheet } from 'react-native'
import Span from '../../../../components/Span/Span'
import Text from '../../../../components/Text/Text'
import { IEvent } from '../../../../Models/Event'
import NoResultMessage from '../NoResultMessage/NoResultMessage'
import Toggle from 'react-native-toggle-element'
import { _eventListTypes } from '../../Events'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../../constants/Colors'

interface IProps {
  section: SectionListData<IEvent.ListItem, IEvent.IEventSections>
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
          thumbButton={{
            activeBackgroundColor: 'transparent',
            inActiveBackgroundColor: 'transparent',
          }}
          thumbInActiveComponent={
            <MaterialIcons
              size={40}
              name='explore'
              color={Colors.secondaryColor}
              solid
            />
          }
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

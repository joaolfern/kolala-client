import React from 'react'
import Button from '../Button/Button'
import FilterSVG from '../../assets/images/filter.svg'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

interface IProps {}

function MapFilter({}: IProps) {
  const navigation = useNavigation()

  function openFilters() {
    navigation.navigate('FiltersMenu')
  }

  return (
    <>
      <Button style={styles.FilterButton} onPress={openFilters}>
        <FilterSVG />
      </Button>
    </>
  )
}

export default MapFilter

const styles = StyleSheet.create({
  FilterButton: {
    position: 'absolute',
    backgroundColor: Colors.secondaryColor,
    padding: 300,
    top: '25%',
    right: 16,
    zIndex: 1,
    width: 44,
    height: 44,
    borderRadius: 13,
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

import { useNavigation } from '@react-navigation/native'
import React from 'react'
import CommonWrapper from '../../components/CommonWrapper/CommonWrapper'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import Span from '../../components/Span/Span'

function Report() {
  const { navigate } = useNavigation()

  function onClose() {
    navigate('Root')
  }

  return (
    <CommonWrapper title='Dunúncias'>
      <Span></Span>
    </CommonWrapper>
  )
}

export default Report

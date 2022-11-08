import React from 'react'
import { Control } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import SocialMediaIcon from '../../../components/SocialMediaIcon/SocialMediaIcon'
import Span from '../../../components/Span/Span'
import TextInput from '../../../components/TextInput/TextInput'
import { ProfileFormEvent } from '../ProfileForm'

interface IProps {
  control: Control<ProfileFormEvent>
  name: keyof ProfileFormEvent
  icon: any
  placeholder: string
}

function SocialMediaInput({ control, icon, name, placeholder }: IProps) {
  return (
    <Span style={styles.SocialMediaRow}>
      <SocialMediaIcon icon={icon} />
      <TextInput
        style={styles.SocialMediaInput}
        name={name}
        control={control}
        placeholder={placeholder}
      />
    </Span>
  )
}

export default SocialMediaInput

const styles = StyleSheet.create({
  SocialMediaRow: {
    flexDirection: 'row',
  },
  SocialMediaInput: {
    flex: 1,
  },
})

import type { Control, DeepRequired, FieldErrorsImpl } from 'react-hook-form'
import { StyleSheet } from 'react-native'

import FormItem from '@/components/FormItem/FormItem'
import SocialMediaIcon from '@/components/SocialMediaIcon/SocialMediaIcon'
import Span from '@/components/Span/Span'
import TextInput from '@/components/TextInput/TextInput'
import type { IProfile } from '@/types/Profile'
import type { ProfileFormEvent } from '../ProfileForm'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface IProps {
  control: Control<ProfileFormEvent>
  name: keyof ProfileFormEvent
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  placeholder: string
  errors: FieldErrorsImpl<DeepRequired<Partial<IProfile>>>
}

function SocialMediaInput({
  control,
  icon,
  name,
  placeholder,
  errors,
}: IProps) {
  return (
    <FormItem label={undefined} error={errors[name]}>
      <Span style={styles.SocialMediaRow}>
        <SocialMediaIcon icon={icon} />
        <TextInput
          style={styles.SocialMediaInput}
          name={name}
          control={control}
          placeholder={placeholder}
        />
      </Span>
    </FormItem>
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

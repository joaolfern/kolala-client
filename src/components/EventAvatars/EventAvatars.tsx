import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'

import type { IEvent } from '../../Models/Event'
import { shadow } from '../../screens/EventForm/utils'
import Avatar from '../Avatar/Avatar'
import Span from '../Span/Span'

interface Props {
  image: IEvent.Model['EventImage'] | undefined
}

let timer: ReturnType<typeof setTimeout>

function EventAvatars({ image }: Props) {
  const [counter, setCounter] = useState(0)

  function interateImages() {
    timer = setTimeout(() => {
      setCounter((prev) => (prev + 1 >= (image?.length || 0) ? 0 : prev + 1))
      interateImages()
    }, 5000)
  }

  useEffect(() => {
    if ((image?.length || 0) > 0) interateImages()

    return () => {
      clearTimeout(timer)
    }
  }, [image])

  const displayedImage = image?.[counter]

  return (
    <Span style={style.container}>
      {displayedImage ? (
        <Span key={displayedImage.id} style={[style.pictureWrapper, shadow]}>
          <Avatar style={style.Avatar} source={{ uri: displayedImage.url }} />
        </Span>
      ) : (
        <Span style={style.pictureWrapper}>
          <Image
            style={style.Avatar}
            source={{
              uri: 'https://www.smart-stb.net/wp-content/plugins/supportcandy/asset/images/loader-white.gif',
            }}
          />
        </Span>
      )}
    </Span>
  )
}

export default EventAvatars

const style = StyleSheet.create({
  container: {},
  pictureWrapper: {
    borderRadius: 99999,
    overflow: 'hidden',
    width: 200,
    height: 200,
  },
  Avatar: {
    width: 200,
    height: 200,
  },
})

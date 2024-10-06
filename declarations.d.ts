declare module '*.png' {
  const value: string
  export = value as ImageURISource
}

declare module '*.svg' {
  import type React from 'react'
  import type { SvgProps } from 'react-native-svg'

  const content: React.FC<SvgProps>
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

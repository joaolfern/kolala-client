import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import dayjs from 'dayjs'
import dayjsBR from 'dayjs/locale/pt-br'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import Toast from './src/components/Toast/Toast'
import useCachedResources from './src/hooks/useCachedResources'
import InitialWidget from './src/navigation/InitialWidget'
import { store } from './src/store/store'
import { toastRef } from './src/utils/toast'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.extend(relativeTime)
dayjs.locale(dayjsBR)

LogBox.ignoreLogs(['EventEmitter.removeListener'])

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ActionSheetProvider>
          <InitialWidget />
        </ActionSheetProvider>
        <Toast {...{ ref: toastRef }} />
        <StatusBar backgroundColor='transparent' style='light' />
      </Provider>
    </SafeAreaProvider>
  )
}

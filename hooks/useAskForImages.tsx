import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'

function useAskForImages() {
  async function handleCameraPermission() {
    if (Constants?.platform?.ios) {
      const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
      if (
        cameraRollStatus.status !== 'granted' ||
        cameraStatus.status !== 'granted'
      ) {
        alert('Desculpa, não conseguimos operar sem essa permissão!')
        return false
      }
    }

    return true
  }

  return {
    handleCameraPermission,
  }
}

export default useAskForImages

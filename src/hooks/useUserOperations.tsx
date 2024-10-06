import type { IUserUpdateStatus } from '../Models/User'
import User from '../Models/User'

function useUserOperations() {
  async function updateStatus(args: IUserUpdateStatus) {
    try {
      await User.updateStatus(args)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    updateStatus,
  }
}

export default useUserOperations

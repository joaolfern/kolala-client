import type { IUserUpdateStatus } from '../Models/User'
import User from '../Models/User'

function useUserOperations() {
  async function updateStatus(args: IUserUpdateStatus, cb?: Function) {
    try {
      await User.updateStatsus(args)
      cb?.()
    } catch (err) {
      console.log(err)
    }
  }

  return {
    updateStatus,
  }
}

export default useUserOperations

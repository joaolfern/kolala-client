import React from 'react'
import User, { IUserUpdateStatus } from '../Models/User'

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

import { IUser, _userLevel } from '../../types/User'

interface IGetProfileSettingsOptions {
  level: _userLevel
  isOwnProfile: boolean
  target: IUser
}

export function getProfileSettingsOptions({
  isOwnProfile,
  level,
  target,
}: IGetProfileSettingsOptions) {
  const basePermission = 'Cancelar'
  const editPermission = 'Editar perfil'
  const reportPermission = 'Denunciar usuário'
  const banPermission = 'Suspender conta'
  const unbanPermission = 'Restaurar Conta'
  const promotePermission = 'Tornar administrador'
  const demotePermission = 'Remover administrador'

  const hasAdminPermission = level === 'admin'

  const isBanned = target.status === 0

  return [
    ...(isOwnProfile
      ? [editPermission]
      : [
          reportPermission,
          ...(hasAdminPermission
            ? [
                isBanned ? unbanPermission : banPermission,
                target.level === 'user' ? promotePermission : demotePermission,
              ]
            : []),
        ]),
    basePermission,
  ]
}

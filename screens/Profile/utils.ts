import { _userLevel } from '../../types/User'

interface IGetProfileSettingsOptions {
  level: _userLevel
  isOwnProfile: boolean
  targetLevel: _userLevel
}

export function getProfileSettingsOptions ({ isOwnProfile, level, targetLevel }: IGetProfileSettingsOptions) {
  const basePermission = 'Cancelar'
  const editPermission = 'Editar perfil'
  const reportPermission = 'Denunciar usuário'
  const banPermission = 'Suspender conta'
  const promotePermission = 'Tornar administrador'
  const demotePermission = 'Remover administrador'

  const hasAdminPermission = level === 'admin'

  return [
    ...(isOwnProfile ? [editPermission] : [
      reportPermission,
      ...(hasAdminPermission ? [banPermission, targetLevel === 'user' ? promotePermission : demotePermission]  : [] )
    ]),
    basePermission,
  ]
}

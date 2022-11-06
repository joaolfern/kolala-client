import { _userLevel } from '../../types/User'

export function getChatMessageContentOptions ({ isAuthor, level }: { isAuthor: boolean, level: _userLevel } ) {
  const basePermission = 'Cancelar'
  const deletingPermission = 'Deletar mensagem'
  const replyPermission = 'Responder'

  const canDeleteMessage = isAuthor || level === 'admin'

  return [
    ...(canDeleteMessage ? [deletingPermission] : []),
    replyPermission,
    basePermission
  ]
}

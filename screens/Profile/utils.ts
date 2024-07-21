import type { IUser, UserLevel } from "../../types/User";

interface IGetProfileSettingsOptions {
  level: UserLevel;
  isOwnProfile: boolean;
  target: IUser;
}

export function getProfileSettingsOptions({
  isOwnProfile,
  level,
  target,
}: IGetProfileSettingsOptions) {
  const basePermission = "Cancelar";
  const editPermission = "Editar perfil";
  const reportPermission = "Denunciar usuário";
  const banPermission = "Suspender conta";
  const unbanPermission = "Restaurar conta";
  const promotePermission = "Tornar administrador";
  const demotePermission = "Remover administrador";

  const hasAdminPermission = level === "admin";

  const isBanned = target.status === 0;

  return [
    ...(isOwnProfile
      ? [editPermission]
      : [
          ...(hasAdminPermission
            ? [
                isBanned ? unbanPermission : banPermission,
                target.level === "user" ? promotePermission : demotePermission,
              ]
            : [reportPermission]),
        ]),
    basePermission,
  ];
}

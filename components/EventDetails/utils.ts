import type { IEvent } from "../../Models/Event";
import type { IUser } from "../../types/User";

interface IGetEventDetailsMenuOptions {
  level: IUser["level"];
  isAuthor: boolean;
}

export function getEventDetailsMenuOptions({
  isAuthor,
  level,
}: IGetEventDetailsMenuOptions): (
  | typeof basePermission
  | typeof deletingPermission
  | typeof reportPermission
)[] {
  const basePermission = "Cancelar";
  const deletingPermission = "Deletar evento";
  const reportPermission = "Denunciar usuário";

  switch (level) {
    case "admin": {
      return [deletingPermission, basePermission];
    }
    case "user": {
      if (isAuthor) return [deletingPermission, basePermission];
      return [reportPermission, basePermission];
    }
    default: {
      return [];
    }
  }
}

export function transformDetailsToListItem(
  details: IEvent.Details,
): IEvent.ListItem {
  return {
    ...details,
    image: details.EventImage[0]?.url,
  };
}

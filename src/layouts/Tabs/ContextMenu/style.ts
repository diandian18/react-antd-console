import { setCssVar } from '@/utils/setCssVar';

export function setContextMenuPrimaryColor(color: string) {
  setCssVar({
    '--contexify-activeItem-bgColor': color,
  });
}

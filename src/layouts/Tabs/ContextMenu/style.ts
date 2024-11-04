import { setCssVar } from '@/utils/setCssVar';

// :root {
//   --contexify-menu-bgColor: #fff;
//   --contexify-separator-color: rgba(0,0,0,.2);
//   --contexify-item-color: #333;
//   --contexify-activeItem-color: #fff;
//   --contexify-activeItem-bgColor: #3498db;
//   --contexify-rightSlot-color: #6f6e77;
//   --contexify-activeRightSlot-color: #fff;
//   --contexify-arrow-color: #6f6e77;
//   --contexify-activeArrow-color: #fff;
// }

export function setContextMenuPrimaryColor(color: string) {
  setCssVar({
    '--contexify-activeItem-bgColor': color,
  });
}

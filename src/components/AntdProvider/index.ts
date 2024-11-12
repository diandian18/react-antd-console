import { PropsWithChildren, useEffect } from 'react';
import { App as AntdApp } from 'antd';
import type { MessageInstance } from 'antd/lib/message/interface';
import type { ModalStaticFunctions } from 'antd/lib/modal/confirm';
import type { NotificationInstance } from 'antd/lib/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

const AntdStaticFnInit = ({ children }: PropsWithChildren) => {
  const {
    message: antdMessage,
    notification: antdNotification,
    modal: antdModal,
  } = AntdApp.useApp();

  useEffect(() => {
    message = antdMessage;
    notification = antdNotification;
    modal = antdModal;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default AntdStaticFnInit;

export { message, notification, modal };

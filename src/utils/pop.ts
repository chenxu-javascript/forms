import { message } from "antd";

const success = (content: string, duration: number = 2) => {
  message.success(content, duration);
};

const info = (content: string, duration: number = 2) => {
  message.info(content, duration);
};

const error = (content: string, duration: number = 2) => {
  message.error(content, duration);
};

const warning = (content: string, duration: number = 3) => {
  message.warning(content, duration);
};

export { success, info, error, warning };
export default { success, info, error, warning };

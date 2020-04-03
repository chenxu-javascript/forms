export interface IProps {
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  value?: string | number | string[] | undefined;
  size?: "large" | "default" | "small";
  type?: "text" | "textarea";
  [propsName: string]: any;
}

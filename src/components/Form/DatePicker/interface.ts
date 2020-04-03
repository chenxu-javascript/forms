export interface IProps {
  defaultValue?: any;
  disabled?: boolean;
  allowClear?: boolean;
  value?: any;
  size?: "large" | "default" | "small";
  mode?: string;
  [propsName: string]: any;
}

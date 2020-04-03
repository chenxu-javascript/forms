export interface IProps {
  input_type: string;
  name: string;
  id?: string;
  rules?: any;
  className?: string;
  label?: string;
  layout?: "horizontal" | "vertical";
  show_required?: boolean;
  extra_text?: string;
  extend_text?: string;
  IconFont?: React.ReactElement;
  style?: any;
  value?: any;
  disabled?: boolean;
  options?: any[];
  is_required?: number;
  [propsName: string]: any;
}

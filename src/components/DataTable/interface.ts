import React from "react";

export interface FormItem {
  name: string;
  input_type: string;
  label?: string;
  is_required?: number;
  is_high?: boolean;
  options?: any[];
  [propsName: string]: any;
}

export interface TableItem {
  title: string;
  dataIndex: string;
  width?: number;
  algin?: string;
  render?: any;
  [propsName: string]: any;
}

export interface IProps {
  conditions: FormItem[];
  column: TableItem[];
  [propsName: string]: any;
}

export interface IPropsSearch {
  conditions: FormItem[];
  onSearch: (data: any) => void;
  is_view?: boolean;
  btnStyle?: React.CSSProperties;
  defaultValues?: any;
  [propsName: string]: any;
}

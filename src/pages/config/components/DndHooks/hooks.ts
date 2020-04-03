interface IItemConfig {
  u_id: number;
  name: string;
  input_type: number;
  form_type: string;
  type: string;
  icon: string;
  ishide?: undefined;
  child?: undefined;
  element_id?: any;
  itemName?: string | undefined;
  parentId?: string | undefined;
}

export { IItemConfig };

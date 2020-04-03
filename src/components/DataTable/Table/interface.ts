export interface IProps {
  columns: any[];
  dataSource: any[];
  loading?: boolean;
  rowKey?: string | undefined;
  total?: number | string | undefined;
  page?: number | string | undefined;
  pageSize?: number | string | undefined;
  onChange?: (data: any, filters: any, sorter: any, extra: any) => void;
}

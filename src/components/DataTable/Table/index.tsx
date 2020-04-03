import React from "react";
import { Table } from "antd";
import styles from "./index.less";
import { Resizable } from "react-resizable";
import { IProps } from "./interface";
const TableComponent: React.FC<IProps> = props => {
  const { columns, rowKey, total, page, loading, pageSize, onChange, dataSource, ...other } = props;
  const onPageChange = (params: any, filters: any, sorter: any, extra: any) => {
    const { showQuickJumper, showSizeChanger, simple, showTotal, total, current: page, ...other } =
      params || {};
    const { pageSize: per_page } = other || {};
    onChange && onChange({ page, per_page, page_size: per_page, ...other }, filters, sorter, extra);
  };

  const pagination = {
    total: Number(total) || 0,
    current: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    showQuickJumper: false,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "40", "50"],
    showTotal: (total: number) => `共有${total}条`
  };

  /**
   * 改变表格宽度
   * ResizeableTitle
   */
  const ResizeableTitle = props => {
    const { onResize, width = 100, ...restProps } = props || {};

    if (!width) {
      return <th {...restProps} />;
    }
    return (
      <Resizable
        height={0}
        width={width}
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };
  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

  return (
    <div className={styles["ys-table"]}>
      <Table
        bordered
        {...other}
        loading={loading}
        columns={columns}
        rowKey={rowKey}
        onChange={onPageChange}
        components={components}
        pagination={total ? pagination : false}
        dataSource={dataSource}
      />
    </div>
  );
};

export default TableComponent;

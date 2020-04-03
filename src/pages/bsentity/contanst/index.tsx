import React from "react";
import { Button } from "antd";

const getTableColumns = ({ onGoToPage }) => {
  return [
    {
      title: "表单名称",
      dataIndex: "name",
      algin: "center",
      width: 150
    },
    {
      title: "表单编码",
      dataIndex: "entity_alias",
      algin: "center",
      width: 150
    },
    {
      title: "描述",
      dataIndex: "remark"
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      width: 150,
      format: "YYYY-MM-DD HH:mm:ss"
    },
    {
      title: "操作",
      dataIndex: "action",
      width: 160,
      render: (text: any, record: any) => <Button onClick={() => onGoToPage()}>编辑</Button>
    }
  ];
};

export { getTableColumns };

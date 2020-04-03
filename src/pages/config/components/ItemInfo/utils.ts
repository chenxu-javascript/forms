// 获得新数据
const getNewData = (data: any[], entity_id: number, data_structure: string | any[]) => {
  return data?.filter(l => l.id !== entity_id && data_structure.includes(l.data_structure)) || [];
};

export { getNewData };

// 单行文本和数字
const getSingNumberByInputType = itemList =>
  itemList?.filter(o => [1, 8].includes(o.input_type)) || [];

// 固定和必填
const fixedList = list => {
  return (
    list?.filter(l => l?.field_permissions?.includes(3) && l?.field_permissions?.includes(1)) || []
  );
};

export { getSingNumberByInputType, fixedList };

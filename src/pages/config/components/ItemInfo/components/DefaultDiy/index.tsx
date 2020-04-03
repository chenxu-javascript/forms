import React, { useState, useEffect } from "react";
import { onRenderHooks } from "@config/utils/utils";
import { defaultValues, Defaults } from "@config/components/ItemInfo/methods";
import { Button } from "@components/FormHooks";
import { LayoutItem } from "@components/FormHooks";
import ModalForm from "./ModalForm";

import styles from "./styles.less";

interface IProps {
  itemList: any;
  itemInfo: any;
  methods: any;
  children?: any;
}
const DefaultDiy = React.memo((props: IProps) => {
  const { itemList, itemInfo, methods } = props;
  const { watch } = methods;
  const { parentId, extended_info } = itemInfo;
  const [modal, openModal] = useState(false);
  const watchDefault = watch("default_type");

  const handModalItems = (params: any) => {
    console.log(params);
    // if (params) {
    //   unregister("checkerror");
    // } else {
    //   register({ name: "checkerror" }, { required: true });
    // }
    // changeDataByName("extended_info", params);
  };
  // useEffect(() => {
  //   if (watchDefault === "custom") {
  //     unregister("checkerror");
  //   } else if (watchDefault === "link" && !extended_info) {
  //     register({ name: "checkerror" }, { required: true });
  //   }
  //   clearError();
  //   onChange && onChange();
  // }, [extended_info, watchDefault]);
  // const changeDataByName = (name, value) => {
  //   register({ name });
  //   setValue(name, value);
  //   onChange();
  // };

  const renderByWatch = () => {
    if (!watchDefault) return null;
    if (watchDefault === "custom") {
      return onRenderHooks({ ...defaultValues }, 99);
    } else if (watchDefault === "link") {
      return (
        <>
          <Button className="mt8" onClick={openModal}>
            设置数据联动
          </Button>
          {modal && (
            <ModalForm
              default_values={{
                ...itemInfo.extended_info
              }}
              onChange={handModalItems}
              onCancel={() => openModal(false)}
            />
          )}
        </>
      );
    }
  };
  if (parentId) return null;
  return (
    <LayoutItem>
      {onRenderHooks({ ...itemInfo, ...Defaults, is_hide: !!parentId }, 99)}
      {renderByWatch()}
    </LayoutItem>
  );
});

export default DefaultDiy;

import React, { Fragment, useState } from "react";
import { Row, Button } from "antd";
import { isArray } from "@/utils/util";
import { IPropsSearch } from "./../interface";
import Form from "./../../Form/Form";
import { useForm, FormContext } from "react-hook-form";
import style from "./index.less";
import classnames from "classnames";

const LIMITSEARCH = 3;
const SearchList = (props: IPropsSearch) => {
  const { conditions, defaultValues, onSearch, is_view, btnStyle, styles } = props;
  if (!isArray(conditions)) {
    console.log("conditions is not array!!");
    return null;
  }

  const methods = useForm({
    defaultValues
  });

  const { getValues, triggerValidation, watch } = methods;
  const [show_more_visible, setShowmore] = useState(false);
  // 搜索
  const handSearch = async() => {
    const resValidation = await triggerValidation();
    const data = getValues({ nest: true });
    console.log("data =>", resValidation, data);
    onSearch(data);
  };
  // 重置
  const handReset = () => {};

  const commonButtons = () => {
    return (
      <Fragment>
        <Button
          type="primary"
          className={style.mr10}
          disabled={is_view}
          onClick={handSearch}
          style={btnStyle}
        >
          查询
        </Button>
        <Button onClick={handReset} disabled={is_view} style={btnStyle}>
          重置
        </Button>
      </Fragment>
    );
  };

  const moreButtons = () => {
    return (
      <Button
        type={!show_more_visible ? undefined : "primary"}
        icon={!show_more_visible ? "down" : "up"}
        style={btnStyle}
        className={style.mr10}
        disabled={is_view}
        onClick={() => setShowmore(v => !v)}
      >
        更多
      </Button>
    );
  };

  const is_show_more_btn = conditions.length > LIMITSEARCH || conditions.some(l => l.is_high);
  return (
    <FormContext {...methods}>
      <section className={classnames(style["form-search"])} style={styles}>
        <Form data={conditions} />
        {is_show_more_btn && moreButtons()}
        {commonButtons()}
      </section>
    </FormContext>
  );
};
export default SearchList;

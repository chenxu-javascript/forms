import modelExtend from "dva-model-extend";
import { basicModel } from "@utils/model";
import { from } from "@services/admin";
import { getNewItems } from "@config/utils/utils";
import { success, warning } from "@utils/pop";

const businessTags = modelExtend(basicModel, {
  namespace: "formconfig",
  state: {
    form_type: 0,
    item_type: 0,
    template_detail: {},
    attrs_detail: {}
  },
  effects: {
    *postTemplate({ payload }, { call, put, select }) {
      const url = Number(payload.config_type) !== 4 ? from.postTemplate : from.postTemplateBusiness;
      const { code, message } = yield call(url, payload);
      if (code === "000000") {
        success("操作成功");
        window.history.go(-1);
      } else {
        warning(message);
      }
    },
    *getTemplate({ payload }, { call, put, select }) {
      const url = from.getTemplateField;
      console.log("data");
      let { data } = yield call(url, payload);
      if (data && data.attrs) {
        data.attrs = data?.attrs?.map((o: any) => {
          return getNewItems(o);
        });
      } else {
        data = {
          attrs: []
        };
      }
      console.log("object", data);
      return data;
    }
  }
});

export default businessTags;

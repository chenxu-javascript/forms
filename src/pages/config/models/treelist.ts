import { isArray } from "util";
import { from } from "@services/admin";
import { basicModel } from "@utils/model";
import modelExtend from "dva-model-extend";

interface IBaseState {
  templateList: any[];
  instanceList: any[];
  objformlist: any[];
  childdefaultList: any[];
}

const BaseState = {
  templateList: [],
  instanceList: [],
  objformlist: [],
  childdefaultList: []
};
// 表单
const businessTags = modelExtend(basicModel, {
  namespace: "treelist",
  state: BaseState,
  effects: {
    *getTemplate({ payload }, { call, put }) {
      const url = from.getTemplate;
      const { data } = yield call(url, { ...payload, per_page: 1000, page: 1 });
      console.log(data);
      const new_data = data?.data?.map((o: any) => {
        const { entity_id, name, data_structure, can_add_entity, primary_key } = o || {};
        return {
          name,
          title: name,
          parent_id: 0,
          isLeaf: false,
          id: entity_id,
          key: entity_id,
          value: entity_id,
          selectable: false,
          treeCheckable: false,
          disableCheckbox: true,
          data_structure,
          can_add_entity,
          primary_key
        };
      });
      yield put({
        type: "updateState",
        payload: {
          templateList: new_data
        }
      });
    },

    *getTemplateChild({ payload }, { call, put, select }) {
      const url = from.getTemplateField;
      const templateList = yield select(state => {
        return state.treelist.templateList;
      });
      let newtemplateList = templateList.concat();
      const { id, ...param } = payload;
      const { data } = yield call(url, { entity_id: id, id, ...param });
      if (!data) {
        newtemplateList = newtemplateList.map(o => {
          const { id: c_id } = o || {};
          if (`${c_id}` === `${id}`) return { ...o, isLeaf: true };
          return o;
        });
      } else {
        const new_list = data.attrs.map(o => {
          const { element_id, name, data_structure } = o || {};
          return {
            id: id + "#" + element_id,
            key: id + "#" + element_id,
            name,
            title: name,
            value: id + "#" + element_id,
            parent_id: id,
            isLeaf: true,
            selectable: true,
            disableCheckbox: false,
            treeCheckable: true,
            data_structure
          };
        });

        newtemplateList = newtemplateList.map(o => {
          const { id: c_id } = o || {};
          if (`${c_id}` === `${id}`) return { ...o, children: new_list };
          return o;
        });
      }
      yield put({
        type: "updateState",
        payload: {
          templateList: newtemplateList
        }
      });
    },

    *getTemplateChildByDefault({ payload }, { call, put, select }) {
      const url = from.getTemplateField;
      const { id, enterprise_id } = payload;
      const { data } = yield call(url, { entity_id: id, id, enterprise_id });
      const new_list =
        data?.attrs?.map(o => {
          const { element_id, input_type, name } = o || {};
          return {
            name,
            title: name,
            isLeaf: true,
            parent_id: id,
            id: element_id,
            key: element_id,
            selectable: true,
            value: element_id,
            treeCheckable: true,
            input_type,
            disableCheckbox: false
          };
        }) || [];
      yield put({
        type: "updateState",
        payload: {
          childdefaultList: new_list,
          objformlist: data.attrs
        }
      });
    },

    *getEntityInstance({ payload }, { call, put, select }) {
      const url = from.getEntityInstance;
      const { data } = yield call(url, {
        ...payload
      });

      const getNewData = o => {
        const { id, name } = o || {};
        o.children = o.child;
        if (isArray(o.child)) {
          o.children = o.children.map(l => getNewData(l));
        }
        if (o.hasOwnProperty("child")) {
          delete o.child;
        }
        return {
          ...o,
          key: id,
          title: name,
          isLeaf: !(isArray(o.children) && o.children.length > 0)
        };
      };

      data.data = data?.data?.map(o => {
        return getNewData(o);
      });

      yield put({
        type: "updateState",
        payload: { instanceList: data }
      });
      return data;
    }
  }
});

export default businessTags;

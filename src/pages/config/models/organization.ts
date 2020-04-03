import modelExtend from "dva-model-extend";
import { basicModel } from "@utils/model";
import { from } from "@services/admin";
// import pop from '@/utils/pop';
// import { bsWait } from '@utils/util';
// import { isArray } from 'util';

// 表单
const businessTags = modelExtend(basicModel, {
  namespace: "organizations",
  state: {
    organizations_list: [],
    roles_list: [],
    user_all_list: []
  },

  effects: {
    *getOrganization({ payload }, { call, put }) {
      const url = from.getOrganizationsTree;
      let { data } = yield call(url, { ...payload });
      const getNewData = o => {
        if (o.children && o.children.length > 0) {
          o.children = o.children.map(l => {
            return getNewData(l);
          });
        }
        return {
          ...o,
          key: o.id,
          value: o.id,
          title: o.name,
          isLeaf: !(o.children && o.children.length > 0)
        };
      };
      data = data?.map(o => {
        return getNewData(o);
      });
      yield put({
        type: "updateState",
        payload: {
          organizations_list: data
        }
      });
    },
    *getAllUsers({ payload }, { call, put, select }) {
      const url = from.getAllUsers;
      const { data } = yield call(url, { ...payload });
      yield put({
        type: "updateState",
        payload: {
          user_all_list: data
        }
      });
    },
    *getRoleUsers({ payload }, { call, put, select }) {
      const url = from.getRoleUsers;
      const { data } = yield call(url, { ...payload });
      yield put({
        type: "updateState",
        payload: {
          roles_list: data
        }
      });
    },

    *getOrganizationsUsers({ payload }, { call, put, select }) {
      const url = from.getOrganizationsUsers;
      const { data } = yield call(url, { ...payload, per_page: 1000, page: 1 });
      return data;
    }
  }
});

export default businessTags;

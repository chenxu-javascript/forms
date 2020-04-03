interface IState {
  formconfig: any;
  editTemplate: any;
  loading: any;
}

function mapStateToProps({ formconfig = {}, editTemplate = {}, loading = {} }: IState) {
  const { effects, models } = loading;
  return {
    formconfig,
    saveLoading: effects["formconfig/postTemplate"],
    getLoading: effects["formconfig/getTemplate"],
    btnLoading: effects["editTemplate/editTemplate"],
    gLoading: models["formconfig"]
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    // 初始化业务
    onInit() {
      dispatch({
        type: "organizations/updateState",
        payload: {
          organizations_list: [],
          roles_list: [],
          user_all_list: []
        }
      });
      dispatch({
        type: "formconfig/updateState",
        payload: {
          template_detail: {},
          attrs_detail: {}
        }
      });
      dispatch({
        type: "treelist/updateState",
        payload: {
          templateList: [],
          instanceList: [],
          childdefaultList: []
        }
      });
    },
    // 保存
    onPostTemplate(payload) {
      dispatch({
        type: "formconfig/postTemplate",
        payload
      });
    },
    // 获得表单
    getTemplate(payload = {}) {
      dispatch({
        type: "treelist/getTemplate",
        payload
      });
    },
    // 获取详情
    onGetTemplate(payload) {
      dispatch({
        type: "formconfig/getTemplate",
        payload
      }).then(o => {
        return o;
      });
    }
  };
};

export { mapStateToProps, mapDispatchToProps };

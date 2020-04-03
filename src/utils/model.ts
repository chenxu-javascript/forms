const basicModel = {
  reducers: {
    updateState(state: any, { payload }: any) {
      return { ...state, ...payload };
    }
  }
};

export { basicModel };

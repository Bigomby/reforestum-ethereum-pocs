export const state = () => ({
  contractAddress: '',
  account: '',
  tokenList: [],
});

export const mutations = {
  SET_CONTRACT_ADDRESS(state, value) {
    this.$rftContract.options.address = value;
    state.contractAddress = value;
  },

  SET_ACCOUNT(state, value) {
    state.account = value;
  },

  SET_TOKEN_LIST(state, value) {
    state.tokenList = value;
  },

  ADD_TOKEN(state, value) {
    state.tokenList.push(value);
  },
};

export const actions = {
  async updateTokenList({ commit }, { address }) {
    const balance = await this.$rftContract.methods.balanceOf(address).call();

    const ids = await Promise.all(
      Array.from({ length: balance }, (v, i) =>
        this.$rftContract.methods.tokenOfOwnerByIndex(address, i).call(),
      ),
    );

    const result = await Promise.all(
      ids.map(async id => ({
        id,
        token: await this.$rftContract.methods.getToken(id).call(),
      })),
    );

    const tokens = result.map(({ id, token }) => ({
      id: id,
      issued: token.issued,
      baseUnit: token.baseUnit,
      amount: token.amount,
      geoJson: token.geoJson,
    }));

    commit('SET_TOKEN_LIST', tokens);
  },

  requestToken({ state, commit }, { baseUnit, amount }) {
    if (!state.account) {
      throw Error('No account set');
    }

    this.$rftContract.methods
      .requestToken(baseUnit, amount)
      .send(0, { from: state.account });

    const listener = this.$rftContract.events.Transfer({
      filter: { to: state.account },
    });

    listener.once('data', async ({ returnValues: event }) => {
      const tokenData = await this.$rftContract.methods
        .getToken(event.tokenId)
        .call();
      const token = { id: event.tokenId, ...tokenData };
      commit('ADD_TOKEN', token);
    });
  },
};

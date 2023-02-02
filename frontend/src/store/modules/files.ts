import { ActionContext } from 'vuex';
import axios from '@/axios';

interface FilesState {
  files: [];
  isConnected: boolean;
}

const state: FilesState = {
  files: [],
  isConnected: false,
};

const getters = {
  getFiles: (state: FilesState) => {
    return state.files;
  },
  isConnected: (state: FilesState) => {
    return state.isConnected;
  },
};

const mutations = {
  setFiles: (state: FilesState, files: []) => {
    state.files = files;
  },
  setConnected: (state: FilesState, isConnected: boolean) => {
    state.isConnected = isConnected;
  },
  clearUser: (state: FilesState) => {
    state.files = [];
  },
};

const actions = {
  async fetchFiles(ctx: ActionContext<FilesState, any>) {
    const token = await ctx.dispatch('user/getToken', null, { root: true });
    const res = await axios.get('/files', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    ctx.commit('setFiles', res.data.files);
    ctx.commit('setConnected', res.data.isConnected);
  },
  async connectDrive(ctx: ActionContext<FilesState, any>) {
    const token = await ctx.dispatch('user/getToken', null, { root: true });
    const res = await axios.post('/files/connect', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  async setToken(ctx: ActionContext<FilesState, any>, code: string) {
    const token = await ctx.dispatch('user/getToken', null, { root: true });
    const res = await axios.post(
      '/files/connect/token',
      {
        token: code,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

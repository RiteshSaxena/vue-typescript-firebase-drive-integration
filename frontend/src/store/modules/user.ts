import {
  browserLocalPersistence,
  getAuth,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { ActionContext } from 'vuex';

interface UserState {
  user: User | null;
}

const state: UserState = {
  user: null,
};

const getters = {
  getUser: (state: UserState) => {
    return state.user;
  },
};

const mutations = {
  setUser: (state: UserState, user: User) => {
    state.user = user;
  },
  clearUser: (state: UserState) => {
    state.user = null;
  },
};

const actions = {
  async getToken() {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    const token = await auth.currentUser?.getIdToken();
    return token;
  },
  async getUser(ctx: ActionContext<UserState, any>) {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    ctx.commit('setUser', auth.currentUser);
    return auth.currentUser;
  },
  async forgotPassword(ctx: ActionContext<UserState, any>, email: string) {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    await sendPasswordResetEmail(auth, email);
  },
  async login(ctx: ActionContext<UserState, any>, payload: any) {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, payload.email, payload.password);
  },
  async logout(ctx: ActionContext<UserState, any>) {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    await signOut(auth);
    ctx.commit('clearUser');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import { createStore } from 'vuex';

// modules
import user from '@/store/modules/user';
import files from '@/store/modules/files';

export default createStore({
  modules: {
    user,
    files,
  },
});

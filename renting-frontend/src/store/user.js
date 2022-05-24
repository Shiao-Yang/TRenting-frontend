const key = 'user';
const user = {
    state() {
        return {
            user: null
        }
    },
    getters: {
        getUser: function (state) {
            if (state.user === null) {
                state.user = JSON.parse(localStorage.getItem(key))
            }
            return state.user
        }
    },
    mutations: {
        $_storeUser (state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        $_removeUser (state) {
            state.user = null
            localStorage.removeItem(key)
        }
    },
    actions: {
        saveUserInfo({ commit }, data) {
            commit('$_storeUser', data)
        },
        clearUserInfo({ commit }) {
            commit('$_removeUser');
        }
    }
};

export default user
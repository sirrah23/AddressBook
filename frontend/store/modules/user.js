const state = {
    uuid: null,
    token: null,
    username: null
}

const getters = {
    getUUID(state){
        return state.uuid
    },
    getToken(state){
        return state.token
    },
    getUsername(state){
        return state.username
    }
}

const mutations = {
    authenticate(state, {uuid, token, username}){
        state.uuid = uuid
        state.token = token
        state.username = username
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations
}
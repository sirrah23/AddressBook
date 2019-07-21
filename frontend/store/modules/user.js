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
    },
    logoff(state){
        state.uuid = null
        state.token = null
        state.username = null
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations
}
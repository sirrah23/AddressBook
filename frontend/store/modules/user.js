const state = {
    uuid: null,
    token: null
}

const getters = {
    getUUID(state){
        return state.uuid
    },
    getToken(state){
        return state.token
    }
}

const mutations = {
    authenticate(state, {uuid, token}){
        state.uuid = uuid
        state.token = token
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations
}
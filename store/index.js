export const state = () => ({
    categoriesList: []
})

export const mutations = {
    setCategoriesList (state, categories) {
        state.categoriesList = categories;
    }
}

export const actions = {
    async getCategoriesList ({ commit }, context) {
        try {
            /*
            https://http.nuxtjs.org/guide/
            npm install @nuxt/http
            */
            await this.$http.$get(`http://api.holypony.ru/catalog/categories?limit=0`)
                                    .then((res) => commit('setCategoriesList', res.items));
        }
        catch(err){
            console.log(err)
            throw new Error('getCategoriesList:', err);
        }
    }   // getCategoriesList
}   // actions

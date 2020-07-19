export default function ({ app, isServer, route, store, isDev }) {
    // initial remote server dialog
    if ( store.state.categoriesList.length == 0 ) {
        return store.dispatch('getCategoriesList');
    }
}

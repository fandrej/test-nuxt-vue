<template>
    <div>
        <top-header/>
        <div id="bc" class="alert alert-light" role="alert">
            <h5>{{$route.fullPath}}</h5>
        </div>
        <div class="container p-0 p-sm-1">
            <div class="d-flex flex-column flex-md-row">
                <div class="col-md-4">
                    <menu_categories :path="path" />
                </div>
                <div class="col-md-8 mt-3 mt-sm-0">
                    <nuxt/>
                    <no-ssr>
                        <vue-json-pretty :data="debug_data"></vue-json-pretty>
                    </no-ssr>
                </div>
            </div>
        </div>
        <bottom-footer/>
    </div>
</template>

<script>
import TopHeader from '~/components/commons/TopHeader.vue'
import BottomFooter from '~/components/commons/BottomFooter.vue'

export default {
    components: {
        TopHeader,
        BottomFooter,
        // Lazy loading (client mode only becouse throws "window is not defined" error)
        VueJsonPretty: () => process.client ? import('vue-json-pretty') : null,
    },  // components

    // DEBUG
    data(){
        return {
            debug_data: null,
        };
    },  // data

    mounted(){
        let self = this;
        self.$root.$on('show-categories', (categories)=>{
            self.debug_data = categories;
        });
    },  // mounted
    // END DEBUG

    computed: {
        path() {
            return '/catalog' + (this.$route.params["pathMatch"] ? '/' + this.$route.params["pathMatch"] : '');
        }
    },  // computed
}   // export default
</script>

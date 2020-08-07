<template>
    <div>
        <!-- https://bootstrap-vue.org/docs/components/dropdown -->
        <b-dropdown split block text="Список категорий" menu-class="w-100 shadow">
            <b-dropdown-text v-for="category in cats" :key="category.category_id">
                <nuxt-link :to="`${path}/${category.category_id}`">
                    {{ category.name }}
                </nuxt-link>
            </b-dropdown-text>
        </b-dropdown>

        <p class="mt-3">Меню идентичны по действию</p>
        
        <!--https://bootstrap-vue.org/docs/components/collapse-->
        <b-button block v-b-toggle.collapse-1 variant="primary">Список категорий</b-button>
        <b-collapse id="collapse-1" class="mt-2 shadow">
                <b-list-group><!--https://bootstrap-vue.org/docs/components/list-group-->
                    <b-list-group-item v-for="category in cats" :key="category.category_id">
                        <nuxt-link :to="`${path}/${category.category_id}`">
                            {{ category.name }}
                        </nuxt-link>
                    </b-list-group-item>
                </b-list-group>
        </b-collapse>

        <div class="d-none d-sm-block">
        <h4 class="mt-3">Описание</h4>
        <ol>
            <li>nuxt.js последней версии</li>
            <li>все URL вида /catalog ведут на 1 файл в папке pages - catalog.vue</li>
            <li>вся логика работы с каталогом помещена в store/index.js</li>
            <li>при загрузке страницы определяется текущая категория</li>
            <li>меню отражает древовидную структуру категорий</li>
            <li>меню сворачиваться\разворачиваться, ссылки являются nuxt-link</li>
            <li>меню доступно на всех страницах</li>
            <li>для наглядности breadcrumbs и url оставлено by id</li>
            <li>responsive</li>
        </ol>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        path: {
            type: String,
            default: null
        }
    },  // props

    computed: {
        ...mapState({
            categories: 'categoriesList'
        }),

        cats(){
            let self = this;
            let a = self.path.split("/");
            let parent_id = parseInt(a[a.length-1]) || null;

            let o = self.categories.filter((item) => {
                return item.parent_id == parent_id;
            })
            .sort((a, b) => {
                return a.category_id - b.category_id;
            });

            this.$root.$emit('show-categories', o); // debug
            return o;
        },   // cats
    },  // computed
}   // export default
</script>

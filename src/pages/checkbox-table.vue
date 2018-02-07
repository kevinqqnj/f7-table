<template>
    <f7-page>
        <f7-navbar title="Table with Checkbox & Sort" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-table :fields="fields" :querydata="querydata" :__checkbox="true" :sortOrders.sync="sortOrders" :per_page.sync="per_page" @orderChange="query_data_from_api()" @pageChange="query_data_from_api()">
		<!-- slot: data-table-header-selected -->
            <!-- thead -->
            <!-- tbody (can be customized) -->
    		<!-- slot: rows -->
        </f7-table>
    </f7-page>
</template>
<style>


</style>
<script>
import { querydata } from '../querydata.js'
export default {
    name: 'history',
    components: {
        "f7-table": require('../components/f7-table.vue'),
    },
    data() {
        return {
            fields: [
              {
                    name: 'name',
                    title: 'Dessert (100g serving)',
                    titleClass: 'label-cell',
                    dataClass: 'numeric-cell',
                    sortTable: 'Ob',
                },
                {
                    name: 'calories',
                    title: 'Calories',
                    titleClass: 'label-cell',
                    dataClass: 'numeric-cell',
                    sortTable: 'Ob',
                },
                {
                    name: 'fat',
                    title: 'Fat (g)',
                    titleClass: 'label-cell action-cell',
                },
                {
                    name: 'carbs',
                    title: 'Carbs (g)',
                    titleClass: 'label-cell action-cell',
                },
                {
                    name: 'protein',
                    title: 'Protein (g)',
                    titleClass: 'label-cell action-cell',
                },
                {
                    name: 'sodium',
                    title: 'Sodium (mg)',
                    titleClass: 'label-cell',
                    sortTable: 'Ob',
                },
                {
                    name: 'calcium',
                    title: 'Calcium (%)',
                    titleClass: 'label-cell',
                    sortTable: 'Ob',
                },
                {
                    name: 'iron',
                    title: 'Iron (%)',
                    titleClass: 'label-cell',
                    sortTable: 'Ob',
                },
            ],
            sortOrders: {
                'name': { direction: 'desc', table: 'Ob' }, //  asc or 'desc'
                '__activeField': 'name', // current sort field
            },
            per_page: {
                title: '每页显示',
                options: [5, 20, 50, 100, 200],
                selected: 1,
                next_page: -1,    // pagination indicator
            },
            selectedIndexList: [],  // 选中列的Index
            querydata: querydata,
        }
    },
    computed: {
    },
    methods: {
        query_data_from_api(page) {
          if (!page) page=this.per_page.next_page
            console.log(`query_data_from_api: ${JSON.stringify(this.per_page)}, per_page.selected: ${this.per_page.selected}`)
        }
    }
}

</script>

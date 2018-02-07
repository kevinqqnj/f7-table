<template>
    <f7-page>
        <f7-navbar title="Basic Table" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-table :fields="fields" :querydata="querydata" @pageChange="query_data_from_api()">
		<!-- slot: data-table-header-selected -->
            <!-- thead -->
            <!-- tbody - slot props available -->
    		<!-- slot: rows -->
        </f7-table>
    </f7-page>
</template>
<style>


</style>
<script>
import { querydata } from '../querydata.js'
export default {
    name: 'basic',
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
               //     sortTable: 'Ob',
                },
                {
                    name: 'calories',
                    title: 'Calories',
                    titleClass: 'label-cell',
                    dataClass: 'numeric-cell',
              //      sortTable: 'Ob',
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
               //     sortTable: 'Ob',
                },
                {
                    name: 'calcium',
                    title: 'Calcium (%)',
                    titleClass: 'label-cell',
                //    sortTable: 'Ob',
                },
                {
                    name: 'iron',
                    title: 'Iron (%)',
                    titleClass: 'label-cell',
              //      sortTable: 'Ob',
                },
            ],
		querydata: querydata,
        }
    },
    created() {
    },
    methods: {
        query_data_from_api() {
          console.log('getting data from api...')
      },
    }
}

</script>

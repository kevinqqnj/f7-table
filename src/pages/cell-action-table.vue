<template>
    <f7-page>
        <f7-navbar title="Table with cell action" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block-title>Click cells to trigger actions. Use checkbox to sum Calories.</f7-block-title>
        <f7-table :fields="fields" :querydata="querydata" :__checkbox="true" :sortOrders.sync="sortOrders" :per_page.sync="per_page" @orderChange="query_data_from_api()" @pageChange="query_data_from_api()">
            <div slot="data-table-header-selected" class="data-table-header-selected">
                <div class="data-table-title-selected">
                    Selected <f7-badge color="blue">{{selectedIndexList.length}}</f7-badge> Desserts, 
                    <f7-badge color="blue">{{selected_calories_sum.toFixed(1)}}</f7-badge> Calories
                </div>
            </div>
            <!-- thead -->
            <!-- tbody -->
            <tr slot="rows" slot-scope="props">
                <td class="checkbox-cell">
                    <label class="checkbox"><input type="checkbox" :value="props.tr_index" v-model="selectedIndexList"><i class="icon-checkbox"></i></label>
                </td>
                <td v-for="f in fields" @click="cell_clicked(props.tr_index, f.name, props.tr[f.name])">
                    {{ props.tr[f.name] }}
                </td>
                	<!-- if you need different CSS/Actions for different columns, not use "td v-for", just render "td" one by one-->
            </tr>
        </f7-table>
    </f7-page>
</template>
<style>


</style>
<script>
import { querydata } from '../querydata.js'
export default {
    name: 'report',
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
                'calories': { direction: 'desc', table: 'Ob' }, //  asc or 'desc'
                '__activeField': 'calories', // current sort field
            },
            per_page: {
                title: 'Per-page',
                options: [5, 20, 50, 100, 200],
                selected: 1,
                next_page: -1,    // pagination indicator
            },
            selectedIndexList: [],  // 选中列的Index
            querydata: querydata,
        }
    },
    computed: {
        selected_calories_sum() {
          let sum = 0
          this.selectedIndexList.forEach((sr, index, array) => {
            sum += this.querydata.data[sr].calories
          })
          return sum
        },
    },
    methods: {
        query_data_from_api(page) {
          if (!page) page=this.per_page.next_page
          console.log(`query_data_from_api: ${JSON.stringify(this.per_page)}, per_page.selected: ${this.per_page.selected}, sortOrders: ${JSON.stringify(this.sortOrders)}`)
        },
        	cell_clicked(index, name, value) {
        		alert(`Cell clicked: index=${index}, name=${name}, value=${value}`)
        	}
    }
}

</script>

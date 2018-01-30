<template>
    <f7-page>
        <f7-navbar title="Table with checkbox" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7table :fields="fields" :querydata="querydata" :__checkbox="true" :sortOrders.sync="sortOrders" :per_page.sync="per_page" @orderChange="query_data_from_api()" @pageChange="query_data_from_api()">
		<!-- slot: data-table-header-selected -->
            <!-- thead -->
            <!-- tbody 可以自定义字段显示格式 -->
    		<!-- slot: rows -->
        </f7table>
    </f7-page>
</template>
<style>


</style>
<script>
import { querydata } from '../querydata.js'
export default {
    name: 'history',
    components: {
        f7table: require('../components/f7-table.vue'),
    },
    data() {
        return {
            fields: [
              {
                    name: 'id',
                    title: '种子ID',
                    titleClass: 'label-cell',
                    dataClass: 'numeric-cell',
                    sortTable: 'Ob',
                    // callback: this.obidCallback,
                },
                {
                    name: 'size_f',
                    title: '大小(GB)',
                    titleClass: 'label-cell',
                    dataClass: 'numeric-cell',
                    sortTable: 'Ob',
                },
                {
                    name: 'seeds',
                    title: '做种',
                    titleClass: 'label-cell',
                    dataClass: 'numeric-cell',
                    sortTable: 'Ob',
                },
                {
                    name: 'securer_assigned',
                    title: '已分配',
                    titleClass: 'label-cell action-cell',
                },
                {
                    name: 'securer_accepted',
                    title: '已认领',
                    titleClass: 'label-cell action-cell',
                },
                {
                    name: 'self_downloaded',
                    title: '自行下载',
                    titleClass: 'label-cell action-cell',
                },
                {
                    name: 'seed_since',
                    title: '发布',
                    titleClass: 'label-cell',
                    // callback: toSmartDate,
                    sortTable: 'Ob',
                },
                {
                    name: 'desc',
                    title: 'Description',
                    titleClass: 'label-cell',
                    // callback: this.strToInput,
                    sortTable: 'Ob',
                },
                {
                    name: 'title',
                    title: 'Title',
                    titleClass: 'label-cell',
                    // callback: this.strToInput,
                    sortTable: 'Ob',
                },
                {
                    name: 'download_size',
                    title: '下载(GB)',
                    titleClass: 'label-cell tablet-only',
                    dataClass: 'numeric-cell',
                    sortTable: 'ourbits_users',
                },
                {
                    name: 'download_duration',
                    title: '下载时长',
                    titleClass: 'label-cell tablet-only',
                    sortTable: 'ourbits_users',
                },
                {
                    name: 'seeding_duration',
                    title: '做种时长',
                    titleClass: 'label-cell tablet-only',
                    sortTable: 'ourbits_users',
                },
                {
                    name: 'upload_size',
                    title: '上传(GB)',
                    titleClass: 'label-cell tablet-only',
                    dataClass: 'numeric-cell',
                    sortTable: 'ourbits_users',
                },
                {
                    name: 'finishes',
                    title: '完成次数',
                    titleClass: 'label-cell tablet-only',
                    dataClass: 'numeric-cell',
                    sortTable: 'Ob',
                },
            ],
            sortOrders: {
                'id': { direction: 'desc', table: 'Ob' }, //  asc or 'desc'
                '__activeField': 'id', // 当前选择的排序字段
            },
            per_page: {
                title: '每页显示',
                data: [5, 20, 50, 100, 200],
                selected: 1,
                next_page: -1,    // pagination indicator
            },
            selectIndex: [],  // 选中列的Index
            querydata: querydata,
        }
    },
    computed: {
        selected_size_sum() {
          let sum = 0
          this.selectIndex.forEach((sr, index, array) => {
            sum += this.querydata.data[sr].size_f
          })
          return sum
        },
    },
    methods: {
        query_data_from_api(page) {
          if (!page) page=this.per_page.next_page
            console.log(`query_data_from_api: ${JSON.stringify(this.per_page)}, per_page.selected: ${this.per_page.selected}`)
        }
    }
}

</script>

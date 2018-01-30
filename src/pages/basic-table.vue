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

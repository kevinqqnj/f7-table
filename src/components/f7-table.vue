<template>
    <div class="data-table data-table-init card" :id="table_id">
        <div class="card-header">
            <div class="data-table-header">
                <f7-label v-if="querydata.total>0">{{querydata.from}}-{{querydata.to}} of {{querydata.total}}</f7-label>
                <f7-label v-else="querydata.total==0">No data available</f7-label>
                <div class="data-table-actions">
                    <f7-list form form-store-data inline-labels>
                        <f7-list-item :title="per_page.title" class="per-page text-color-gray">
                            <f7-input type="select" placeholder="Please choose..." @input="per_page.selected = $event.target.value" :value="per_page.selected">
                                <option :value="index" v-for="(item, index) of per_page.options">{{item}}</option>
                            </f7-input>
                            <!-- pagination -->
                            <f7-link @click="page_change(querydata.current_page-1)" :class="querydata.current_page<=1?'disabled':''">
                                <f7-icon icon="fas fa-chevron-left color-blue"></f7-icon>
                            </f7-link>
                            <f7-link :popover-open="'#pop-paging'+popover_id" href="#" class="text-color-blue">{{querydata.current_page}} / {{querydata.last_page}}</f7-link>
                            <f7-link @click="page_change(querydata.current_page+1)" :class="querydata.current_page>=querydata.last_page?'disabled':''">
                                <f7-icon icon="fas fa-chevron-right color-blue"></f7-icon>
                            </f7-link>
                        </f7-list-item>
                    </f7-list>
                </div>
            </div>
            <slot name="data-table-header-selected">
                <div class="data-table-header-selected">
			<div class="data-table-title-selected">
                      {{selectedIndexList.length}} items selected
			</div>
                </div>
            </slot>
        </div>
        <div class="card-content">
            <table>
                <thead>
                    <tr>
                        <th v-if="__checkbox" class="checkbox-cell" title="Select/Unselect All">
                            <f7-checkbox />
                        </th>
                        <th v-for="item in fields" :key="item.name" :class="(item.name==sortOrders.__activeField) ? 'label-cell sortable-cell sortable-cell-active' : (item.sortTable!=undefined) ? 'sortable-cell '+item.titleClass : item.titleClass" @click="set_sortkey(item.name, item.sortTable)">{{item.title}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- https://vuejs.org/v2/guide/components#Scoped-Slots-->
                    <slot name="rows" v-for="(item, index) in querydata.data" :tr="item" :tr_index="index">
                        <tr>
                            <td v-if="__checkbox" class="checkbox-cell">
                                <label class="checkbox">
                                    <input type="checkbox" :value="index" v-model="selectedIndexList"><i class="icon-checkbox"></i>
                                </label>
                            </td>
                            <td v-for="f in fields">
                                {{ item[f.name] }}
                            </td>
                        </tr>
                    </slot>
                </tbody>
            </table>
        </div>
        <f7-popover class="popover-menu popover-max-height" :id="'pop-paging'+popover_id">
            <f7-list>
                <f7-list-item link="#" :title="sr" v-for="(sr, index) in querydata.last_page" :key="index" class="popover-close" @click="page_change(sr)" :class="querydata.current_page==sr ? 'color-blue' : ''">
                </f7-list-item>
            </f7-list>
        </f7-popover>
    </div>
</template>
<style>
.per-page .item-content .item-inner .item-title {
    min-width: 70px;
    font-size: 14px;
}
.md .item-input-wrap {
    min-width: 30px;
}
.md .list select {
    font-size: 14px;
}
.data-table .data-table-actions a.link {
    min-width: max-content;
}
.popover-max-height .popover-inner {
      max-height: 90vh;
}
</style>
<script>
// by ezhqing@gmail.com
// https://github.com/kevinqqnj/f7-table
import { f7Icon, f7List, f7ListItem, f7Popover, f7Label, f7Link, f7Row, f7Col, f7Checkbox, f7Input } from 'framework7-vue';
export default {
    name: 'f7-table',
    components: {
        f7Icon,
        f7List,
        f7ListItem,
        f7Popover,
        f7Label,
        f7Link,
        f7Row,
        f7Col,
        f7Checkbox,
        f7Input,
    },
    props: {
        fields: { type: Array, required: true, },
        querydata: { type: Object, required: true, },
        __checkbox: { type: Boolean, default: false, },
        table_id: { type: String, default: '', },
        sortOrders: {
            type: Object,
            default: () => {
                return {
                    'id': { direction: 'desc', table: '' }, //  asc or 'desc'
                    '__activeField': 'id', // current sort field
                }
            }
        },
        per_page: {
            type: Object,
            default: () => {
                return {
                    title: 'Per Page: ',
                    options: [10, 20, 50, 100, 200],
                    selected: 0,
                    next_page: -1,
                }
            }
        },
    },
    data() {
        return {
            selectedIndexList: [], // the index of selected rows
            popover_id: 0, // to distinguish multiple popovers
        }
    },
    filters: {
        filter1(para) {
            return para;
        }
    },
    created() {},
    mounted() {
        this.popover_id = Date.now()
    },
    beforeDestroy() {},
    computed: {
    },
    methods: {
        set_sortkey(sort_key, sortTable) {
            // console.log(`sort_key:${sort_key} sortTable:${sortTable}`)
            if (sortTable == undefined) return
            // if sort-key was clicked before
            if (this.sortOrders[sort_key]) {
                // same key
                if (sort_key == this.sortOrders.__activeField)
                    this.sortOrders[sort_key].direction = (this.sortOrders[sort_key].direction == 'desc') ? 'asc' : 'desc'
            }
            // if key never clicked before
            else {
                this.sortOrders[sort_key] = { direction: 'desc', table: sortTable, }
            }
            this.sortOrders.__activeField = sort_key
            // console.log(JSON.stringify(this.sortOrders))
            this.per_page.next_page = 1
            // bi-sync with parent's prop
            this.$emit('update:sortOrders', this.sortOrders)
            this.$emit('update:per_page', this.per_page)
            // emit event to parent
            this.$emit('orderChange')
        },
        page_change(page) {
            if (page==0) return
            this.per_page.next_page = page
            this.$emit('update:per_page', this.per_page)
            this.$emit('pageChange')
        },
    }
}
</script>

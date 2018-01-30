# f7-table
component of Framework7 table for Vue.js, including Pagination, Sorting, Selection, customized cell action

## Features
One line to create table:
```
<f7-table :fields="fields" :querydata="querydata" @pageChange="query_data_from_api()">
</f7-table>
```

## Usage
1) setup you framework7 (v2) + vue project.
Here's one kind of template: https://github.com/kevinqqnj/Framework7-Vue-Webpack-Template-v2
2) copy `src/components/f7-table.vue` to your project
3) import it as component in .vue `script`. e.g.
```
<script>
export default {
    components: {
        "f7-table": require('../components/f7-table.vue'),
    },
    ...
```
4) use component in .vue `template`, e.g.
```
<f7table :fields="fields" :querydata="querydata" :__checkbox="true" :sortOrders.sync="sortOrders" :per_page.sync="per_page" @orderChange="query_data_from_api()" @pageChange="query_data_from_api()">
<!-- slot: data-table-header-selected -->
    <!-- thead -->
    <!-- tbody -->
<!-- slot: rows -->
</f7table>
```

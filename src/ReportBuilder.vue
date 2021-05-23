<template>
    <section class="report-builder">
        <Spin size="large" fix v-if="loading"></Spin>
        <div class="rb-workspace">
                    <div id="designer-host">
                        <JSDesigner v-bind:report="{id: 'report.rdlx-json', displayName: 'lambda report' }"></JSDesigner>
                    </div>
        </div>
    </section>
</template>

<script>
import { Designer } from "@grapecity/activereports-vue";
import '@grapecity/activereports/styles/ar-js-ui.css';
import '@grapecity/activereports/styles/ar-js-designer.css';
export default {
    name:"Lambda report designer",
    components: {
        JSDesigner: Designer,
    },
    data(){
        return{
            loading:false,
            reportName:null,
            reportJson:null,
        }
    },
    methods:{
        saveReport(){}
    }
};
</script>

<style>
#designer-host {
    width: 100%;
    height: 100vh;
}
</style>

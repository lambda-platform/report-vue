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
import { Core } from "@grapecity/activereports";
Core.setLicenseKey("l6/zrbWoSbcLFwEetFh38rH3ErBZE9H+Cqix3R+wTlfA1wD5B+lUcCQn+EJ60I4RGrm0x1sFjkiLWwB0jAn6BWZv0W4WbqAKriOdeoivxDp1Wmjs3qkEDhvbsjPtfvwx2BHil6o+/tDrdMJQSGs18WZm2PoQLQuL+9VhZ4FNRHUQU3Jtioke/OZEGHJOdYVwvCGalzBad6QFOiVbDBQPePpS3++GJzOxN8SN/7lyS5/IdKiy3WJRaVGkB370+HbN6hKraDfUgReLX26yxRaKC/5aWnGAJ2NnWLoGyAGRcwT9dVjo4bcAZNrrA0U9JVKQxaSskhdv2p49XzJkltXx5w==");
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

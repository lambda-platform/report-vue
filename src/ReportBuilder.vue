<template>
    <section class="report-builder">
        <Spin size="large" fix v-if="loading"></Spin>
        <div class="rb-sidebar">
            <div class="rb-control">
                <div class="rb-control-item">
                    <label>Тайлан нэр</label>
                    <Input v-model="reportName" placeholder="Тайлан нэр"/>
                </div>
            </div>

            <div class="rb-submit">
                <Button type="success" long @click="saveReport">{{`${$static_words ? $static_words.save : 'Хадгалах'}`}}</Button>
            </div>
        </div>

        <div class="rb-workspace">
            <Tabs type="card" :animated="false">
                <TabPane label="Үндсэн тохиргоо" :key="`main-tab`" icon="md-code-working">
                    <div id="designer-host">
                        <JSDesigner v-bind:report="{id: 'report.rdlx-json', displayName: 'lambda report' }"></JSDesigner>
                    </div>
                </TabPane>
                <!-- Formula confiration -->
            </Tabs>
        </div>
    </section>
</template>

<script>
import { Designer } from "@grapecity/activereports-vue";
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

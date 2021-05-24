<template>
    <section class="report-builder">
        <Spin size="large" fix v-if="loading"></Spin>
        <div class="rb-workspace">
            <div id="designer-host"
                 :style="{ display: designerHidden ? 'none' : 'block' }">
                <JSDesigner v-bind:report="{id: 'report.rdlx-json', displayName: 'lambda report' }"
                            v-bind:onCreate="onCreateReport"
                            v-bind:onSave="onSaveReport"
                            v-bind:onSaveAs="onSaveAsReport"
                            v-bind:onOpen="onOpenReport"></JSDesigner>
            </div>
            <div
                id="viewer-host"
                :style="{ display: designerHidden ? 'block' : 'none' }"
            >
                <ReportViewer ref="reportViewer"/>
            </div>
        </div>
    </section>
</template>

<script>
import {templates} from "@grapecity/activereports/reportdesigner";
import {Viewer, Designer} from "@grapecity/activereports-vue";
import {PageReport} from "@grapecity/activereports/core";
import {exportDocument as PdfExport} from "@grapecity/activereports/pdfexport";
import {FontStore} from "@grapecity/activereports/core";
import '@grapecity/activereports/styles/ar-js-ui.css';
import '@grapecity/activereports/styles/ar-js-designer.css';
import '@grapecity/activereports/styles/ar-js-viewer.css';

export default {
    name: "Lambda report designer",
    components: {
        JSDesigner: Designer, ReportViewer: Viewer,
    },
    computed: {
        reportIds() {
            const ret = this.counter ? [...this.reportStorage.keys()] : [];
            return ret;
        },
    },
    data() {
        return {
            loading: false,
            reportName: null,
            reportJson: null,
            reportStorage: new Map(),
            counter: 0,
            designerHidden: false,
        }
    },
    mounted() {
        var designButton = {
            key: "$openDesigner",
            text: "Edit in Designer",
            iconCssClass: "mdi mdi-pencil",
            enabled: true,
            action: () => {
                this.designerHidden = false;
            },
        };
        var viewer = this.$refs.reportViewer.Viewer();
        viewer.toolbar.addItem(designButton);
        viewer.toolbar.updateLayout({
            default: [
                "$openDesigner",
                "$split",
                "$navigation",
                "$split",
                "$refresh",
                "$split",
                "$history",
                "$split",
                "$zoom",
                "$fullscreen",
                "$split",
                "$print",
                "$split",
                "$singlepagemode",
                "$continuousmode",
                "$galleymode",
            ],
        });
    },
    methods: {
        onCreateReport() {
            const reportId = `NewReport${this.counter + 1}`;
            this.counter++;
            return Promise.resolve({
                definition: templates.CPL,
                id: reportId,
                displayName: reportId,
            });
        },
        onSaveReport(info) {
            const reportId = info.id || `NewReport${this.counter + 1}`;
            this.reportStorage.set(reportId, info.definition);
            this.counter++;
            return Promise.resolve({displayName: reportId});
        },
        onSaveAsReport(info) {
            const reportId = `NewReport${this.counter + 1}`;
            this.reportStorage.set(reportId, info.definition);
            this.counter++;
            return Promise.resolve({id: reportId, displayName: reportId});
        },
        async onPdfPreview() {
            const reportInfo = await this.$refs.reportDesigner.getReport();
            const report = new PageReport();
            await report.load(reportInfo.definition);
            const doc = await report.run();
            const result = await PdfExport(doc);
            result.download("exportedreport");
        },
        onDesignerOpen() {
            this.designerHidden = false;
        },
        async onReportPreview(report) {
            this.designerHidden = true;
            this.$refs.reportViewer.Viewer().open(report.definition);
        },
    }
};
</script>

<style>
#designer-host {
    width: 100%;
    height: 100vh;
}
</style>

import Vue from "vue"
import axios from 'axios';
import lodash from 'lodash';
import {Core} from "@grapecity/activereports";

Vue.config.productionTip = false;

window._ = lodash;
window.axios = axios;
Vue.config.silent = true;

Core.setLicenseKey("l6/zrbWoSbcLFwEetFh38rH3ErBZE9H+Cqix3R+wTlfA1wD5B+lUcCQn+EJ60I4RGrm0x1sFjkiLWwB0jAn6BWZv0W4WbqAKriOdeoivxDp1Wmjs3qkEDhvbsjPtfvwx2BHil6o+/tDrdMJQSGs18WZm2PoQLQuL+9VhZ4FNRHUQU3Jtioke/OZEGHJOdYVwvCGalzBad6QFOiVbDBQPePpS3++GJzOxN8SN/7lyS5/IdKiy3WJRaVGkB370+HbN6hKraDfUgReLX26yxRaKC/5aWnGAJ2NnWLoGyAGRcwT9dVjo4bcAZNrrA0U9JVKQxaSskhdv2p49XzJkltXx5w==");

axios.interceptors.request.use(function (config) {
    config.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    return config;
});


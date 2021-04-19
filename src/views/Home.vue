<template>
  <div class="">
    <h1 class="py-3 text-2xl">Charts</h1>
    <p class="pb-3">Data for the last 30 minutes are displayed.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="(item,index) in items" :key="index">
        <div class="shadow p-3">
          <basic-line-chart :title="item.title" :dataSet="item.data" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import BasicLineChart from '../components/BasicLineChart.vue';

export default {
  name: 'Home',
  computed: {
    ...mapGetters('analytics', [
      'ttfb',
      'fcp',
      'domLoading',
    ]),
    items() {
      return [
        {
          title: 'TTFB',
          data: this.ttfb.map((item) => ({
            label: (new Date(item.timestamp)).toLocaleString(),
            value: item.value,
          })),
        },
        {
          title: 'FCP',
          data: this.fcp.map((item) => ({
            label: (new Date(item.timestamp)).toLocaleString(),
            value: item.value,
          })),
        },
        {
          title: 'DOM LOADING',
          data: this.domLoading.map((item) => ({
            label: (new Date(item.timestamp)).toLocaleString(),
            value: item.value,
          })),
        },
      ];
    },
  },
  mounted() {
    this.fetchData();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, process.env.VUE_APP_CHART_REFRESH_TIME ?? 5000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    ...mapActions('analytics', [
      'fetchData',
    ]),
  },
  components: {
    BasicLineChart,
  },
};
</script>

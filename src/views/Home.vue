<template>
  <div class="">
    <h1 class="py-5 text-2xl">Charts</h1>
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
      'fcb',
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
          title: 'FCB',
          data: this.fcb.map((item) => ({
            label: (new Date(item.timestamp)).toLocaleString(),
            value: item.value,
          })),
        },
      ];
    },
  },
  mounted() {
    this.fetchData();
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

<template>
  <canvas ref="chartArea" width="400" height="400"></canvas>
</template>

<script>

import Chart from 'chart.js/auto';

/**
 * Chart config
 */
const config = {
  type: 'line',
  options: {
    responsive: true,
  },
};

export default {
  name: 'BasicLineChart',
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chart = new Chart(this.$refs.chartArea, config);
    this.updateChartData(this.dataSet);
  },
  methods: {
    updateChartData(items) {
      const labels = items.map((item) => item.label);
      const data = items.map((item) => item.value);

      const chartData = {
        labels,
        datasets: [{
          label: this.title,
          data,
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        }],
      };

      this.chart.data = chartData;
      this.chart.update();
    },
  },
  watch: {
    dataSet(items) {
      this.updateChartData(items);
    },
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    dataSet: {
      type: Array,
      /**
       * @type {{labe: string, value: number}[]}
       */
      default: () => [

      ],
    },
  },
};
</script>

<style>

</style>

<template>
  <div class="">
    <h1 class="py-5 text-2xl">Charts</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="item in [1,2,3,4,5,6,7,8,9]" :key="item.id">
        <div class="shadow p-3">
          <basic-line-chart title="This is title" :dataSet="items" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BasicLineChart from '../components/BasicLineChart.vue';

export default {
  name: 'Home',
  data() {
    return {
      items: [
        {
          label: 'Red',
          value: 252,
        },
        {
          label: 'Blue',
          value: 19,
        },
        {
          label: 'Yellow',
          value: 3,
        },
        {
          label: 'Green',
          value: 5,
        },
      ],
    };
  },
  components: {
    BasicLineChart,
  },
};
</script>

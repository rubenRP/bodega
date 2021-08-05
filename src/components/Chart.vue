<template>
  <div :class="selector">
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Chart, { ChartItem } from 'chart.js/auto'

  export default defineComponent({
    name: 'Chart',
    props: {
      chartType: String,
      chartData: Object,
      chartOptions: Object,
      selector: String,
    },
    data: () => ({}),
    mounted() {
      this.chartConstructor(this.chartType, this.chartData, this.chartOptions)
    },
    computed: {},
    methods: {
      chartConstructor(chartType: any, chartData: any, chartOptions: any) {
        const chartElement = document.querySelector(`.${this.selector} canvas`)
        new Chart(<ChartItem>chartElement, {
          type: chartType,
          data: chartData,
          options: chartOptions,
        })
      },
    },
  })
</script>

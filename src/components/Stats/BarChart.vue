<template>
  <Chart
    chartType="bar"
    :selector="selector"
    :chartOptions="chartOptions"
    :chartData="chartData"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Chart from './Chart.vue'

  export default defineComponent({
    name: 'BarChart',
    components: {
      Chart,
    },
    props: {
      selector: String,
      data: <any>Object,
    },
    data: () => ({
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }),

    computed: {
      chartData(): any {
        let res = {
          datasets: [
            {
              data: <any>[],
              backgroundColor: <any>[],
            },
          ],
          labels: <any>[],
        }
        Object.entries(this.data).forEach(([key, value]) => {
          res.datasets[0].data.push(value)
          res.datasets[0].backgroundColor.push(
            `hsl(${Math.random() * 360}, 50%, 50%)`
          )
          res.labels.push(key)
        })
        return res
      },
    },
  })
</script>

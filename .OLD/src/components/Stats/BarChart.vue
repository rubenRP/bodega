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
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
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
            this.backgroundColor.pop() ||
              `hsl(${Math.random() * 360}, 50%, 50%)`
          )
          res.labels.push(key)
        })
        return res
      },
    },
  })
</script>

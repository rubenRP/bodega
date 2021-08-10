<template>
  <Chart
    chartType="line"
    :selector="selector"
    :chartOptions="chartOptions"
    :chartData="chartData"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Chart from './Chart.vue'

  export default defineComponent({
    name: 'LineChart',
    components: {
      Chart,
    },
    props: {
      selector: String,
      data: <any>Array,
      labels: <any>Array,
    },
    data: () => ({
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
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
              borderColor: '',
              label: '',
            },
            {
              data: <any>[],
              borderColor: '',
              label: '',
            },
          ],
          labels: <any>[],
        }
        for (let i = 0; i < this.data.length; i++) {
          Object.entries(this.data[i]).forEach(([key, value]) => {
            res.datasets[i].data.push({
              x: key,
              y: value,
            })
            res.datasets[i].borderColor = `hsl(${
              Math.random() * 360
            }, 50%, 50%)`
            res.datasets[i].label = this.labels[i]
            if (res.labels.indexOf(key) == -1) {
              res.labels.push(key)
            }
          })
        }
        return res
      },
    },
  })
</script>

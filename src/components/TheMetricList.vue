<template>
  <TheMetric
      v-for="(metric, i) in metrics"
      :name="metric.name"
      :total="metric.total"
      :diff="metric.diff"
      :percent="Math.round((metric.total / total) * 100 * 100) / 100"
      :color="backgroundColors[i % backgroundColors.length]"
  />
</template>

<script>
import TheMetric from "@/components/TheMetric.vue";

export default {
  name: "TheMetricList",
  components: {TheMetric},
  props: {
    data: {
      type: Array,
    }
  },
  data() {
    return {
      backgroundColors: ['#ef4444', '#f97316', '#22c55e', '#0ea5e9', '#6366f1', '#be123c']
    }
  },
  mounted() {
  },
  computed: {
    metrics() {
      return this.data.sort((a, b) => b.total - a.total)
    },
    total() {
      let sum = 0
      for (let metric of this.data) {
        sum += metric.total
      }

      return sum
    }
  }
}
</script>

<style scoped>

</style>
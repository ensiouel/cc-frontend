<template>
  <div class="border-b border-gray-200 mb-2  last:border-0">
    <div class="text-base text-gray-900 font-medium Details__labelIn truncate flex">
      <div>{{ name }}</div>
      <p :class="[diffPercent > 0 ? 'text-green-600' : 'text-red-600', 'text-sm ml-1 flex items-center font-semibold']">
        <ArrowUpIcon v-if="diffPercent > 0" class="h-5 w-5 flex-shrink-0 self-center text-green-500"
                     aria-hidden="true"/>
        <ArrowDownIcon v-else class="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true"/>
        {{ Math.abs(diffPercent) }}%
      </p>
    </div>
    <div class="Details__item font-base text-sm text-gray-900">
      <div class="Details__label">
        <div class="Details__count">
          {{ total }}
        </div>
      </div>
      <div class="Details__data">
        <div class="Details__dataLine">
          <div class="Details__line" :style="{'width': percent + '%', 'background-color': color}"></div>
          <div class="Details__percent">{{ percent }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ArrowDownIcon, ArrowUpIcon} from '@heroicons/vue/20/solid'

export default {
  name: "TheMetric",
  components: {ArrowDownIcon, ArrowUpIcon},
  props: {
    name: {
      type: String,
    },
    total: {
      type: Number,
    },
    percent: {
      type: Number
    },
    color: {
      type: String
    },
    diff: {
      type: Number
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  computed: {
    diffPercent() {
      const d = this.total - this.diff;

      if (this.diff === 0) {
        return 0
      }

      return d === 0 ? 100 : Math.round(this.diff / d * 100 * 100) / 100
    }
  }
}
</script>

<style scoped>
.Details__item {
  display: flex;
  align-items: center;
  min-height: 32px;
}

.Details__label {
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.Details__data {
  flex: 1;
  margin-left: 12px;
}

.Details__dataLine {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Details__line {
  height: 8px;
  border-radius: 16px;
}

.Details__percent {
  margin-left: 12px;
}
</style>
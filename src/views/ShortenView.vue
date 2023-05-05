<template>
  <div
      class="min-w-0 md:w-3/5 overflow-y-auto w-full top-0 absolute xl:border-r xl:border-l-0 xl:border-b xl:border-gray-200 bg-white md:border-l md:relative">

    <div class="px-8 h-16 flex items-center w-full justify-between">
      <h1 class="text-lg font-medium text-gray-900">Information</h1>
      <XMarkIcon @click="$router.push({name: 'shortens'})"
                 class="relative md:hidden cursor-pointer block h-6 w-6 text-gray-400 hover:text-gray-600"
                 aria-hidden="true"/>
    </div>

    <div class="block" aria-hidden="true">
      <div class="border-t border-gray-200"/>
    </div>

    <div v-if="shorten">
      <div class="px-8 py-4">
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <div class="space-y-2 truncate">
              <h3 class="text-base font-medium truncate">
                {{ shorten?.title }}
              </h3>
              <div class="flex items-center space-x-1">
                <CalendarIcon class="h-5 w-5 text-gray-500" aria-hidden="true"/>
                <span class="text-sm font-medium text-gray-500">{{ unix(shorten?.created_at).format('D MMMM YYYY HH:mm') }}</span>
              </div>
            </div>
            <div class="space-x-2 flex">
              <button
                  @click="$router.push({name: 'shorten.edit', params: {id: shorten?.id}})"
                  type="button"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <PencilIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                <span>Edit</span>
              </button>
              <Menu as="div">
                <div>
                  <MenuButton
                      class="items-center rounded-md border border-gray-300 px-2 py-2 text-gray-400 flex text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <EllipsisHorizontalIcon class="h-5 w-5 text-gray-700 flex-shrink-0 block"
                                            aria-hidden="true"/>
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem
                        @click="item.action"
                        v-for="item in shortenNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href"
                         :style="{color: item.color}"
                         :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm hover:bg-gray-50 hover:text-gray-900']">{{
                          item.name
                        }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="space-y-1 truncate">
              <a target="_blank" :href="'https://'+shorten?.short_url"
                 class="text-xl font-bold text-indigo-600 truncate">{{ shorten?.short_url }}</a>
              <div class="flex space-x-2 justify-start items-center">
                <ArrowUturnRightIcon
                    class="relative block h-5 w-5 text-gray-900"
                    aria-hidden="true"/>
                <a target="_blank" class="w-full truncate" :href="shorten?.long_url">{{ shorten?.long_url }}</a>
              </div>
            </div>
            <div>
              <button
                  @click="copy"
                  type="button"
                  class="flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <ClipboardIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                <span>{{ copyLabel }}</span>
              </button>
            </div>
          </div>
          <div>
            <h2 class="text-sm font-medium text-gray-500">Tags</h2>
            <ul role="list" class="mt-2 leading-8">
              <li v-if="shorten?.tags?.length > 0" v-for="tag in shorten?.tags" class="inline mr-2">
                <div class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                  <span class="text-sm font-medium text-gray-900">{{ tag }}</span>
                </div>
              </li>
              <li v-else class="text-sm font-medium text-gray-900">No tags</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="block" aria-hidden="true">
        <div class="border-t border-gray-200"/>
      </div>

      <div class="px-8 py-4 flex items-center">
        <svg v-if="statisticsLoading" class="animate-spin text-black mr-2 h-5 w-5"
             xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h1 class="text-lg font-medium text-gray-900">Statistics</h1>
      </div>

      <div class="block" aria-hidden="true">
        <div class="border-t border-gray-200"/>
      </div>

      <div class="px-8 pt-4 flex space-x-2 flex justify-between">
        <Datepicker
            class="w-full"
            :hide-input-icon="true"
            :enable-time-picker="false"
            :auto-apply="true"
            :clearable="false"
            :format="formatDate"
            @update:model-value="setDate" v-model="date" range :preset-ranges="presetRanges">
          <template #yearly="{ label, range, presetDateRange }">
            <span @click="presetDateRange(range)">{{ label }}</span>
          </template>
        </Datepicker>

        <Listbox as="div" v-model="unit">
          <div class="relative w-26 text-gray-700 font-medium">
            <ListboxButton
                class="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm">
              <span class="block truncate">{{ unit.name }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
              <ListboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-28 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption @click="setUnit" as="template" v-for="u in units" :key="u.id" :value="u"
                               v-slot="{ active, selected }">
                  <li :class="[active ? 'text-gray-900 bg-gray-50' : 'text-gray-700', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                    <span :class="[u.id === unit.id ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                        u.name
                      }}</span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <button
            @click="exportStats"
            type="button"
            class="flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <svg v-if="exportingStats" class="animate-spin text-black mr-2 h-5 w-5"
               xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <ArrowDownTrayIcon v-else class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
          <span>Export</span>
        </button>
      </div>

      <div v-if="stats && stats.click.total > 0" class="px-8 py-4">
        <div class="lg:col-span-2 col-span-1 h-64 mb-24">

          <div class="relative overflow-hidden rounded-lg bg-white">
            <dt>
              <p class="truncate text-base font-medium text-gray-500">Total clicks</p>
            </dt>
            <dd class="flex items-baseline pb-4">
              <p class="text-2xl font-semibold text-gray-900">{{ stats.click.total }}</p>
              <p :class="[stats.click.diff > 0 ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
                <ArrowUpIcon v-if="stats.click.diff > 0" class="h-5 w-5 flex-shrink-0 self-center text-green-500"
                             aria-hidden="true"/>
                <ArrowDownIcon v-else class="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true"/>
                <span class="sr-only"> {{ stats.click.diff > 0 ? 'Increased' : 'Decreased' }} by </span>
                {{ Math.abs(stats.click.diff) }}
              </p>
            </dd>
          </div>
          <Line :data="clickData" :options="clickOptions"/>
        </div>

        <div class="grid gap-8 xl:grid-cols-2 grid-cols-1">
          <div class="col-span-1">
            <div class="text-sm font-medium text-gray-500 mb-2">Platforms</div>
            <div>
              <TheMetricList v-if="stats" :data="stats.platform"/>
            </div>
          </div>
          <div class="col-span-1">
            <div class="text-sm font-medium text-gray-500 mb-2">Operating systems</div>
            <div>
              <TheMetricList v-if="stats" :data="stats.os"/>
            </div>
          </div>
          <div class="col-span-1">
            <div class="text-sm font-medium text-gray-500 mb-2">Referrers</div>
            <div>
              <TheMetricList v-if="stats" :data="stats.referer"/>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-sm font-medium text-gray-500 px-8 pt-8 pb-4">
        There are no statistics for the specified
        period
      </div>
    </div>
  </div>

</template>

<script>
import moment from "moment"
import Datepicker from '@vuepic/vue-datepicker'
import TheMetricList from "@/components/TheMetricList.vue"

import {
  XMarkIcon,
  CalendarIcon,
  ArrowUturnRightIcon,
  PencilIcon,
  ClipboardIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  EllipsisHorizontalIcon
} from '@heroicons/vue/24/outline'
import {
  Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/vue";

import {ArrowDownIcon, ArrowUpIcon} from '@heroicons/vue/20/solid'
import {CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon} from '@heroicons/vue/24/outline'

import {useShortenStore} from "@/stores/shorten";
import ShortenApi from "@/api/shorten.api";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, Filler, BarElement
} from 'chart.js'

import 'chartjs-adapter-moment';

import {Line, Pie, Bar} from 'vue-chartjs'

import useClipboard from 'vue-clipboard3'
import axios from "axios";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler,
    BarElement,
)

export default {
  name: "ShortenView",
  components: {
    Line, Pie, Bar,
    Listbox,
    ListboxOption,
    ListboxOptions,
    ListboxButton,
    TheMetricList,
    ArrowDownIcon,
    ArrowUpIcon,
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    UsersIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    EllipsisHorizontalIcon,
    ListboxLabel, XMarkIcon, CalendarIcon, ArrowUturnRightIcon, PencilIcon, ClipboardIcon, Datepicker, ChevronDownIcon
  },
  data() {
    return {
      shortenApi: new ShortenApi(),
      shortenStore: useShortenStore(),
      stats: null,
      statisticsLoading: false,
      tags: ['winline', 'dota 2'],
      date: [moment().subtract('7', 'day'), moment()],
      presetRanges: [
        {label: 'Today', range: [moment(), moment()]},
        {label: 'Last 7 days', range: [moment().subtract('7', 'day'), moment()]},
        {label: 'Last 30 days', range: [moment().subtract('30', 'day'), moment()]},
        {label: 'Last 180 days', range: [moment().subtract('180', 'day'), moment()]},
      ],
      units: [
        {id: 'hour', name: 'Hour'},
        {id: 'day', name: 'Day'},
        {id: 'week', name: 'Week'},
        {id: 'month', name: 'Month'},
      ],
      unit: {id: 'day', name: 'Day'},
      copyLabel: 'Copy',
      shortenNavigation: [
        {name: 'Delete', href: '#', 'color': '#dc2626', action: this.deleteShorten}
      ],
      exportingStats: false
    }
  },
  async mounted() {
    document.title = 'Shorten Info'

    this.statisticsLoading = true
    await this.fetchStats()
    this.statisticsLoading = false
  },
  methods: {
    async exportStats() {
      try {
        this.exportingStats = true

        await this.shortenApi.exportStats({
          key: this.$route.params.id,
          from: moment(this.date[0]).format('YYYY-MM-DD'),
          to: moment(this.date[1]).format('YYYY-MM-DD')
        })
      } catch (error) {
        if (error.response?.data?.error.code) {
          this.error = error.response?.data?.error
        } else {
          this.$toast.error(error)
        }
      } finally {
        this.exportingStats = false
      }
    },
    deleteShorten() {
      this.shortenStore.deleteShorten(this.shorten.id)

      this.$router.push({name: 'shortens'})
    },
    async copy() {
      await useClipboard().toClipboard('https://'+this.shorten.short_url)
      this.copyLabel = 'Copied!'
      setTimeout(() => {
        this.copyLabel = 'Copy'
      }, 1000)
    },
    formatDate(range) {
      const date1 = moment(range[0]);
      const date2 = moment(range[1]);

      return `${date1.format('LL')} — ${date2.format('LL')}`;
    },
    async setDate(date) {
      this.date = date

      this.statisticsLoading = true
      await this.fetchStats()
      this.statisticsLoading = false
    },
    async setUnit() {
      this.statisticsLoading = true
      await this.fetchStats()
      this.statisticsLoading = false
    },
    unix(timestamp) {
      return moment.unix(timestamp).locale('ru');
    },
    async fetchStats() {
      this.stats = await this.shortenApi.getShortenStats({
        key: this.$route.params.id,
        from: moment(this.date[0]).format('YYYY-MM-DD'),
        to: moment(this.date[1]).format('YYYY-MM-DD'),
        unit: this.unit.id,
        units: -1
      })
    },
  },
  computed: {
    shorten() {
      return this.shortenStore.getShortenById(this.$route.params.id)
    },
    clickData() {
      return {
        datasets: [{
          label: 'Clicks',
          borderColor: '#4f46e5',
          pointBorderColor: "#4f46e5",
          pointBackgroundColor: "white",
          pointBorderWidth: 2,
          data: this.stats?.click.values.map(value => {
            return {x: value.timestamp, y: value.count}
          })
        }]
      }
    },
    clickOptions() {
      return {
        type: 'line',
        elements: {
          line: {
            tension: 0.5
          },
          point: {
            radius: 3,
            hoverRadius: 3
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                size: 14
              }
            },
            display: false,
            position: 'bottom',
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#6b7280'
            },
            grid: {
              color: '#e5e7eb'
            },
            type: 'time',
            time: {
              tooltipFormat: 'DD.MM.YYYY HH:mm',
              unit: this.unit?.unit,
              displayFormats: {
                hour: 'HH:mm',
                day: 'DD.MM',
                week: 'DD.MM',
                month: 'MM.YYYY',
              }
            }
          },
          y: {
            grid: {
              color: '#e5e7eb'
            },
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
              stepSize: 1,
              color: '#6b7280'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          axis: 'x'
        },
      }
    },
  }
}
</script>

<style>
.dp__input_wrap {
  position: relative;
  width: 100%;
  box-sizing: unset
}

.dp__input_wrap:focus {
  border-color: var(--dp-border-color-hover);
  outline: none
}

.dp__input {
  background-color: var(--dp-background-color);
  border-radius: 4px;
  font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border: 1px solid var(--dp-border-color);
  outline: none;
  transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 6px 12px;
  color: var(--dp-text-color);
  box-sizing: border-box
}

.dp__input::placeholder {
  opacity: .7
}

.dp__input:hover {
  border-color: var(--dp-border-color-hover)
}

.dp__input_reg {
  caret-color: rgba(0, 0, 0, 0)
}

.dp__input_focus {
  border-color: var(--dp-border-color-hover)
}

.dp__disabled {
  background: var(--dp-disabled-color)
}

.dp__disabled::placeholder {
  color: var(--dp-disabled-color-text)
}

.dp__input_icons {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  stroke-width: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 6px 12px;
  color: var(--dp-icon-color);
  box-sizing: content-box
}

.dp__input_icon {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: var(--dp-icon-color)
}

.dp__clear_icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--dp-icon-color)
}

.dp__input_icon_pad {
  padding-left: 35px
}

.dp__input_valid {
  box-shadow: 0 0 4px var(--dp-success-color);
  border-color: var(--dp-success-color)
}

.dp__input_valid:hover {
  border-color: var(--dp-success-color)
}

.dp__input_invalid {
  box-shadow: 0 0 4px var(--dp-danger-color);
  border-color: var(--dp-danger-color)
}

.dp__input_invalid:hover {
  border-color: var(--dp-danger-color)
}

.dp__menu {
  position: absolute;
  background: var(--dp-background-color);
  border-radius: 4px;
  min-width: 260px;
  font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1rem;
  user-select: none;
  border: 1px solid var(--dp-menu-border-color);
  box-sizing: border-box
}

.dp__menu::after {
  box-sizing: border-box
}

.dp__menu::before {
  box-sizing: border-box
}

.dp__menu:focus {
  border: 1px solid var(--dp-menu-border-color);
  outline: none
}

.dp__menu_index {
  z-index: 99999
}

.dp__menu_readonly, .dp__menu_disabled {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1
}

.dp__menu_disabled {
  background: rgba(255, 255, 255, .5);
  cursor: not-allowed
}

.dp__menu_readonly {
  background: rgba(0, 0, 0, 0);
  cursor: default
}

.dp__arrow_top {
  left: 50%;
  top: -1px;
  height: 12px;
  width: 12px;
  background-color: var(--dp-background-color);
  position: absolute;
  border-left: 1px solid var(--dp-menu-border-color);
  border-top: 1px solid var(--dp-menu-border-color);
  transform: translate(-50%, -50%) rotate(45deg)
}

.dp__arrow_bottom {
  left: 50%;
  bottom: -1px;
  height: 12px;
  width: 12px;
  background-color: var(--dp-background-color);
  position: absolute;
  border-right: 1px solid var(--dp-menu-border-color);
  border-bottom: 1px solid var(--dp-menu-border-color);
  transform: translate(-50%, 50%) rotate(45deg)
}

.dp__now_wrap {
  text-align: center;
  padding: 2px 0
}

.dp__now_button {
  border: 1px solid var(--dp-primary-color);
  color: var(--dp-primary-color);
  padding: 0 4px;
  font-weight: bold;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0)
}

.dp__preset_ranges {
  width: 100%;
  padding: 5px;
  border-right: 1px solid var(--dp-border-color)
}

.dp__sidebar_left {
  padding: 5px;
  border-right: 1px solid var(--dp-border-color)
}

.dp__sidebar_right {
  padding: 5px;
  border-left: 1px solid var(--dp-border-color)
}

.dp__preset_range {
  padding: 5px
}

.dp__preset_range:hover {
  background-color: var(--dp-hover-color);
  cursor: pointer
}

.dp__menu_content_wrapper {
  display: flex
}

.dp__calendar_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  flex: 0
}

.dp__calendar_header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--dp-text-color);
  white-space: nowrap;
  font-weight: bold
}

.dp__calendar_header_item {
  text-align: center;
  flex-grow: 1;
  height: 35px;
  padding: 5px;
  width: 35px;
  box-sizing: border-box
}

.dp__calendar_row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0
}

.dp__calendar_item {
  text-align: center;
  flex-grow: 1;
  box-sizing: border-box;
  color: var(--dp-text-color)
}

.dp__calendar {
  position: relative
}

.dp__calendar_header_cell {
  border-bottom: thin solid var(--dp-border-color);
  padding: .5rem
}

.dp__cell_inner {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 4px;
  height: 35px;
  padding: 5px;
  width: 35px;
  border: 1px solid rgba(0, 0, 0, 0);
  box-sizing: border-box;
  position: relative
}

.dp__cell_auto_range_start, .dp__date_hover_start:hover, .dp__range_start {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0
}

.dp__cell_auto_range_end, .dp__date_hover_end:hover, .dp__range_end {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0
}

.dp__range_end, .dp__range_start, .dp__active_date {
  background: var(--dp-primary-color);
  color: var(--dp-primary-text-color)
}

.dp__cell_auto_range_end, .dp__cell_auto_range_start {
  border-top: 1px dashed var(--dp-primary-color);
  border-bottom: 1px dashed var(--dp-primary-color)
}

.dp__date_hover_end:hover, .dp__date_hover_start:hover, .dp__date_hover:hover {
  background: var(--dp-hover-color);
  color: var(--dp-hover-text-color)
}

.dp__cell_offset {
  color: var(--dp-secondary-color)
}

.dp__cell_disabled {
  color: var(--dp-secondary-color);
  cursor: not-allowed
}

.dp__range_between {
  background: #c7d2fe;
  border-radius: 0;
  border-top: 1px solid var(--dp-hover-color);
  border-bottom: 1px solid var(--dp-hover-color)
}

.dp__range_between_week {
  background: var(--dp-primary-color);
  color: var(--dp-primary-text-color);
  border-radius: 0;
  border-top: 1px solid var(--dp-primary-color);
  border-bottom: 1px solid var(--dp-primary-color)
}

.dp__today {
  border: 1px solid var(--dp-primary-color)
}

.dp__week_num {
  color: var(--dp-secondary-color);
  text-align: center
}

.dp__cell_auto_range {
  border-radius: 0;
  border-top: 1px dashed var(--dp-primary-color);
  border-bottom: 1px dashed var(--dp-primary-color)
}

.dp__cell_auto_range_start {
  border-left: 1px dashed var(--dp-primary-color)
}

.dp__cell_auto_range_end {
  border-right: 1px dashed var(--dp-primary-color)
}

.dp__calendar_header_separator {
  width: 100%;
  height: 1px;
  background: var(--dp-border-color)
}

.dp__calendar_next {
  margin-left: 10px
}

.dp__marker_line, .dp__marker_dot {
  height: 5px;
  background-color: var(--dp-marker-color);
  position: absolute;
  bottom: 0
}

.dp__marker_dot {
  width: 5px;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%)
}

.dp__marker_line {
  width: 100%;
  left: 0
}

.dp__marker_tooltip {
  position: absolute;
  border-radius: 4px;
  background-color: var(--dp-tooltip-color);
  padding: 5px;
  border: 1px solid var(--dp-border-color);
  z-index: 99999;
  box-sizing: border-box;
  cursor: default
}

.dp__tooltip_content {
  white-space: nowrap
}

.dp__tooltip_text {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  color: var(--dp-text-color)
}

.dp__tooltip_mark {
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: var(--dp-text-color);
  color: var(--dp-text-color);
  margin-right: 5px
}

.dp__arrow_bottom_tp {
  left: 50%;
  bottom: 0;
  height: 8px;
  width: 8px;
  background-color: var(--dp-tooltip-color);
  position: absolute;
  border-right: 1px solid var(--dp-border-color);
  border-bottom: 1px solid var(--dp-border-color);
  transform: translate(-50%, 50%) rotate(45deg)
}

.dp__instance_calendar {
  position: relative;
  width: 100%
}

@media only screen and (max-width: 600px) {
  .dp__flex_display {
    flex-direction: column
  }
}

.dp__cell_highlight {
  background-color: var(--dp-highlight-color)
}

.dp__month_year_row {
  display: flex;
  align-items: center;
  height: 35px;
  color: var(--dp-text-color);
  box-sizing: border-box
}

.dp__inner_nav {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 25px;
  width: 25px;
  color: var(--dp-icon-color);
  text-align: center;
  border-radius: 50%
}

.dp__inner_nav svg {
  height: 20px;
  width: 20px
}

.dp__inner_nav:hover {
  background: var(--dp-hover-color);
  color: var(--dp-hover-icon-color)
}

.dp__inner_nav_disabled:hover, .dp__inner_nav_disabled {
  background: var(--dp-disabled-color);
  color: var(--dp-disabled-color-text);
  cursor: not-allowed
}

.dp__month_year_select {
  width: 50%;
  text-align: center;
  cursor: pointer;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-sizing: border-box
}

.dp__month_year_select:hover {
  background: var(--dp-hover-color);
  color: var(--dp-hover-text-color)
}

.dp__month_year_wrap {
  display: flex;
  width: 100%
}

.dp__overlay {
  position: absolute;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background: var(--dp-background-color);
  top: 0;
  left: 0;
  transition: opacity 1s ease-out;
  z-index: 99999;
  font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--dp-text-color);
  box-sizing: border-box
}

.dp__overlay::-webkit-scrollbar-track {
  box-shadow: var(--dp-scroll-bar-background);
  background-color: var(--dp-scroll-bar-background)
}

.dp__overlay::-webkit-scrollbar {
  width: 5px;
  background-color: var(--dp-scroll-bar-background)
}

.dp__overlay::-webkit-scrollbar-thumb {
  background-color: var(--dp-scroll-bar-color);
  border-radius: 10px
}

.dp__overlay:focus {
  border: none;
  outline: none
}

.dp__container_flex {
  display: flex
}

.dp__container_block {
  display: block
}

.dp__overlay_container {
  height: 100%;
  flex-direction: column
}

.dp__overlay_row {
  padding: 0;
  box-sizing: border-box;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  max-width: 100%;
  width: 100%;
  align-items: center
}

.dp__overlay_container > .dp__overlay_row {
  flex: 1
}

.dp__overlay_col {
  box-sizing: border-box;
  width: 33%;
  padding: 3px;
  white-space: nowrap
}

.dp__overlay_cell_pad {
  padding: 10px 0
}

.dp__overlay_cell_active {
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  background: var(--dp-primary-color);
  color: var(--dp-primary-text-color)
}

.dp__overlay_cell {
  cursor: pointer;
  border-radius: 4px;
  text-align: center
}

.dp__overlay_cell:hover {
  background: var(--dp-hover-color);
  color: var(--dp-hover-text-color)
}

.dp__cell_in_between {
  background: var(--dp-hover-color);
  color: var(--dp-hover-text-color)
}

.dp__overlay_action {
  position: sticky;
  bottom: 0;
  background: #fff
}

.dp__over_action_scroll {
  right: 5px;
  box-sizing: border-box
}

.dp__overlay_cell_disabled {
  cursor: not-allowed;
  background: var(--dp-disabled-color)
}

.dp__overlay_cell_disabled:hover {
  background: var(--dp-disabled-color)
}

.dp__overlay_cell_active_disabled {
  cursor: not-allowed;
  background: var(--dp-primary-disabled-color)
}

.dp__overlay_cell_active_disabled:hover {
  background: var(--dp-primary-disabled-color)
}

.dp__month_picker_header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 35px
}

.dp__time_input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--dp-text-color)
}

.dp__time_col_reg {
  padding: 0 20px
}

.dp__time_col_reg_with_button {
  padding: 0 15px
}

.dp__time_col_sec {
  padding: 0 10px
}

.dp__time_col_sec_with_button {
  padding: 0 5px
}

.dp__time_col {
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column
}

.dp__time_display {
  cursor: pointer;
  color: var(--dp-text-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px
}

.dp__time_display:hover {
  background: var(--dp-hover-color);
  color: var(--dp-hover-text-color)
}

.dp__inc_dec_button {
  padding: 5px;
  margin: 0;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: var(--dp-icon-color);
  box-sizing: border-box
}

.dp__inc_dec_button svg {
  height: 32px;
  width: 32px
}

.dp__inc_dec_button:hover {
  background: var(--dp-hover-color);
  color: var(--dp-primary-color)
}

.dp__inc_dec_button_disabled:hover, .dp__inc_dec_button_disabled {
  background: var(--dp-disabled-color);
  color: var(--dp-disabled-color-text);
  cursor: not-allowed
}

.dp__pm_am_button {
  background: var(--dp-primary-color);
  color: var(--dp-primary-text-color);
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer
}

.dp__action_row {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  color: var(--dp-text-color);
  background: var(--dp-background-color)
}

.dp__action_row svg {
  height: 20px;
  width: auto
}

.dp__selection_preview {
  width: 50%;
  color: var(--dp-text-color);
  font-size: .8rem
}

.dp__action_buttons {
  width: 50%;
  text-align: right
}

.dp__action {
  font-weight: bold;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center
}

.dp__select {
  color: var(--dp-success-color)
}

.dp__action_disabled {
  color: var(--dp-success-color-disabled);
  cursor: not-allowed
}

.dp__cancel {
  color: var(--dp-secondary-color)
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #4f46e5;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #d1d5db;
  --dp-menu-border-color: #d1d5db;
  --dp-border-color-hover: #d1d5db;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%)
}

.dp__main {
  font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  user-select: none;
  box-sizing: border-box
}

.dp__pointer {
  cursor: pointer
}

.dp__icon {
  stroke: currentcolor;
  fill: currentcolor
}

.dp__button {
  width: 100%;
  text-align: center;
  color: var(--dp-icon-color);
  background: var(--dp-background-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  height: 35px
}

.dp__button:hover {
  background: var(--dp-hover-color);
  color: var(--dp-hover-icon-color)
}

.dp__button svg {
  height: 20px;
  width: auto
}

.dp__button_bottom {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px
}

.dp__flex_display {
  display: flex
}

.dp__flex_display_with_input {
  flex-direction: column;
  align-items: start
}

.dp__relative {
  position: relative
}

.calendar-next-enter-active, .calendar-next-leave-active, .calendar-prev-enter-active, .calendar-prev-leave-active {
  transition: all .1s ease-out
}

.calendar-next-enter-from {
  opacity: 0;
  transform: translateX(22px)
}

.calendar-next-leave-to {
  opacity: 0;
  transform: translateX(-22px)
}

.calendar-prev-enter-from {
  opacity: 0;
  transform: translateX(-22px)
}

.calendar-prev-leave-to {
  opacity: 0;
  transform: translateX(22px)
}

.dp-menu-appear-enter-active, .dp-menu-appear-leave-active, .dp-slide-up-enter-active, .dp-slide-up-leave-active, .dp-slide-down-enter-active, .dp-slide-down-leave-active {
  transition: all .1s ease-out
}

.dp-slide-down-leave-to, .dp-slide-up-enter-from {
  opacity: 0;
  transform: translateY(22px)
}

.dp-slide-down-enter-from, .dp-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-22px)
}

.dp-menu-appear-enter-from {
  opacity: 0
}

.dp-menu-appear-enter-active, .dp-menu-appear-leave-active {
  transition: opacity .1s ease
}

.dp-menu-appear-leave-to {
  opacity: 1
}

</style>
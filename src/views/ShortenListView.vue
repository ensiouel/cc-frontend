<template>
  <div class="mx-auto w-full max-w-7xl flex-grow md:flex xl:px-8">

    <div class="min-w-0 flex-1 md:w-2/5 bg-white flex">

      <div class="bg-white h-screen flex flex-col lg:min-w-0 flex-1 xl:border-x xl:border-gray-200 border-0">

        <Disclosure as="nav" class="flex-shrink-0 bg-indigo-600" v-slot="{ open }">
          <div class="mx-auto max-w-7xl px-4 sm:pl-6 lg:pl-8 xl:pl-6">
            <div class="flex flex-1 h-16 items-center justify-between lg:justify-start">
              <div class="flex lg:hidden">

                <DisclosureButton
                    class="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  <span class="sr-only">Open main menu</span>
                  <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
                </DisclosureButton>
              </div>

              <!-- Action buttons -->
              <div class="flex lg:hidden flex-col sm:flex-row xl:flex-col">
                <button
                    @click="$router.push({name: 'shorten.create'})"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent px-2 py-2 text-indigo-400 hover:text-white xl:w-full">
                  <PlusIcon class="block h-6 w-6" aria-hidden="true"/>
                </button>
              </div>

              <!-- Links section -->
              <div class="hidden lg:block">
                <div class="flex items-center justify-end">
                  <!-- Profile dropdown -->
                  <Menu as="div" class="relative">
                    <div>
                      <MenuButton
                          class="items-center mr-2 py-2 text-indigo-200 hover:text-white flex text-sm">
                        <EllipsisVerticalIcon class="ml-1 hidden h-5 w-5 flex-shrink-0 lg:block"
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
                          class="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                          <span @click="item.action"
                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer']">{{
                              item.name
                            }}</span>
                        </MenuItem>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel class="lg:hidden">
            <div class="border-t border-indigo-800 pt-4 pb-3">
              <div class="space-y-1 px-2">
                <DisclosureButton @click="item.action" v-for="item in userNavigation" :key="item.name" as="a"
                                  class="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:text-indigo-100">
                  {{ item.name }}
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <div
            class="border-b border-gray-200 pr-6 pl-4 sm:pl-6 lg:pl-8 xl:pl-6 xl:border-t-0 py-4">
          <div class="flex items-center">
            <h1 class="flex-1 flex items-center text-lg font-medium">
              <svg v-if="shortensLoading" class="animate-spin text-black mr-2 h-5 w-5"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Shortens
            </h1>
            <!-- Action buttons -->
            <div class="hidden lg:block ml-2 flex-col sm:flex-row xl:flex-col">
              <button
                  @click="$router.push({name: 'shorten.create'})"
                  type="button"
                  class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                New Shorten
              </button>
            </div>
          </div>
        </div>
        <div
            class="border-b border-gray-200 xl:border-t-0 py-2 sm:pl-2 lg:pl-4 xl:pl-2 pl-0">
          <div class="flex items-center justify-start">
            <div class="divide-x divide-gray-200">
              <Menu as="div" class="relative inline-block px-4 text-left">
                <div>
                  <MenuButton
                      class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort by
                    <ChevronDownIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                      class="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem class="cursor-pointer hover:bg-gray-50" v-for="order in orders" :key="order.type"
                                v-slot="{ active }">
                        <a @click="currentOrder = order.type"
                           :class="[order.type === currentOrder ? 'font-medium text-gray-900' : 'text-gray-500', 'block px-4 py-2 text-sm hover:text-gray-900']">{{
                            order.label
                          }}</a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>

              <Menu as="div" class="relative inline-block text-left">
                <div class="relative inline-block px-4 text-left">
                  <MenuButton
                      class="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>Tags</span>
                    <span
                        class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold text-gray-700">{{
                        selectedTags.length
                      }}</span>
                    <ChevronDownIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                     aria-hidden="true"/>
                  </MenuButton>

                  <transition enter-active-class="transition ease-out duration-100"
                              enter-from-class="transform opacity-0 scale-95"
                              enter-to-class="transform opacity-100 scale-100"
                              leave-active-class="transition ease-in duration-75"
                              leave-from-class="transform opacity-100 scale-100"
                              leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute overflow-y-auto max-h-48 left-0 z-10 mt-2 py-2 pr-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div @change="selectTag" v-for="option in orderedTags" :key="option"
                           class="flex items-center hover:bg-gray-50 text-sm cursor-pointer pl-4">
                        <input :id="option" v-model="selectedTags" :value="option" type="checkbox"
                               class="h-4 w-4 rounded border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-500"/>
                        <label :for="option"
                               class="pl-2.5 whitespace-nowrap py-1 pr-6 text-sm cursor-pointer text-gray-700 hover:text-gray-900">{{
                            option
                          }}</label>
                      </div>
                    </MenuItems>
                  </transition>
                </div>
              </Menu>

            </div>
          </div>
        </div>

        <div class="overflow-y-auto">
          <ul class="divide-y divide-gray-200">
            <li @click="shortenDetails(shorten.id)"
                v-for="shorten in orderedShortens" :key="shorten.id"
                class="relative cursor-pointer py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">

              <div class="sm:block flex items-center justify-between">
                <div class="space-y-3">
                  <div>
                    <div class="flex items-center space-x-2">
                      <img height="16" width="16" :src="`https://www.google.com/s2/favicons?domain=${shorten.long_url}`"
                           alt=""/>
                      <h2 class="truncate text-sm font-medium">
                        {{ shorten.title }}
                      </h2>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div class="flex items-center space-x-1">
                      <LinkIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                      <span class="truncate text-sm font-medium text-gray-500">{{
                          shorten.id
                        }}</span>
                    </div>

                    <div class="hidden flex-shrink-0 flex-col space-y-3 sm:flex">
                      <p class="text-sm text-gray-500">
                        <span>{{ unix(shorten.created_at).format('D MMMM YYYY') }}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="sm:hidden">
                  <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </div>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <router-view v-if="!shortensLoading" class="h-screen" :key="$route.fullPath"/>

  </div>
</template>

<script>
import moment from "moment"

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems, Popover, PopoverButton, PopoverGroup, PopoverPanel, TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import {
  BarsArrowUpIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon,
  StarIcon,
  PlusIcon,
  PlusSmallIcon,
  LinkIcon,
  EllipsisVerticalIcon,
} from '@heroicons/vue/20/solid'

import {Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline'

import {useShortenStore} from "@/stores/shorten"
import AuthApi from "@/api/auth.api"
import UserApi from "@/api/user.api";

export default {
  name: "ShortenListView",
  components: {
    PopoverGroup,
    Popover,
    PopoverButton,
    PopoverPanel,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BarsArrowUpIcon,
    CheckBadgeIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    RectangleStackIcon,
    StarIcon,
    Bars3Icon,
    XMarkIcon,
    PlusIcon,
    PlusSmallIcon,
    LinkIcon,
    EllipsisVerticalIcon
  },
  data() {
    return {
      shortenStore: useShortenStore(),
      shortensLoading: false,
      userNavigation: [
        {name: 'Sign out', action: this.signOut}
      ],
      activityItems: [
        {project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h'},
      ],
      sidebarOpen: true,
      orders: [
        {type: 'title', 'label': 'Title'},
        {type: 'created_at', 'label': 'Created At'},
        {type: 'updated_at', 'label': 'Updated At'},
      ],
      currentOrder: 'created_at',
      tags: [],
      selectedTags: [],
    }
  },
  async mounted() {
    document.title = 'Shortens'

    try {
      this.tags = await new UserApi().tags({userId: AuthApi.session.user_id})
    } catch (error) {
      console.log(error)
    }

    await this.fetchShortens()
  },
  methods: {
    signOut() {
      localStorage.removeItem('session')

      this.$router.push({name: 'signin'})
    },
    async selectTag() {
      await this.fetchShortens()
    },
    unix(timestamp) {
      return moment.unix(timestamp).locale('ru');
    },
    shortenDetails(id) {
      this.$router.push({name: 'shorten.info', params: {id: id}})
    },
    async fetchShortens() {
      this.shortensLoading = true
      try {
        await this.shortenStore.fetchUserShortens({userId: AuthApi.session.user_id, tags: this.selectedTags})

        if (this.orderedShortens.length > 0) {
          if (this.$route.name === 'shorten.info') {
            const shorten = this.shortenStore.getShortenById(this.$route.params.id)
            if (shorten) {
              this.$router.push({name: 'shorten.info', params: {id: shorten.id}})
            } else {
              this.$router.push({name: 'shorten.info', params: {id: this.orderedShortens[0].id}})
            }
          }

        } else {
          this.$router.push({name: 'shortens'})
        }

      } catch (error) {
        this.$toast.error(error)
      }
      this.shortensLoading = false
    }
  },
  computed: {
    orderedShortens() {
      switch (this.currentOrder) {
        case 'title':
          return this.shortenStore.getShortens.sort((a, b) => a.title > b.title ? 1 : -1)
        case 'created_at':
          return this.shortenStore.getShortens.sort((a, b) => a.created_at - b.created_at)
        case 'updated_at':
          return this.shortenStore.getShortens.sort((a, b) => a.updated_at - b.updated_at)
      }

      return []
    },
    orderedTags() {
      return this.tags.sort((a, b) => a > b ? 1 : -1)
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div
      class="min-w-0 md:w-3/5 w-full top-0 absolute xl:border-r xl:border-b xl:border-gray-200 bg-white border-0 md:relative">

    <div class="px-8 h-16 flex items-center w-full justify-between">
      <h1 class="text-lg font-medium text-gray-900">Create shorten</h1>
      <XMarkIcon @click="$router.push({name: 'shortens'})"
                 class="relative md:hidden cursor-pointer block h-6 w-6 text-gray-400 hover:text-gray-600"
                 aria-hidden="true"/>
    </div>

    <div class="block" aria-hidden="true">
      <div class="border-t border-gray-200"/>
    </div>

    <div class="flex px-8 py-4">
      <form @submit.prevent="submit" class="w-full space-y-4">
        <div>
          <label for="url" class="text-sm font-medium text-gray-500">URL</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input required v-model="url" type="text" name="url" id="url"
                   class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                   placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          </div>
        </div>
        <div>
          <label for="title" class="text-sm font-medium text-gray-500">Title</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input v-model="title" type="text" name="title" id="title"
                   class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                   placeholder="XcQ">
          </div>
        </div>

        <div>
          <div class="flex mt-4 items-start">
            <div class="flex h-5 items-center">
              <input v-model="randomKey" id="comments" name="comments" type="checkbox"
                     class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            </div>
            <div class="ml-3 text-sm">
              <label for="comments" class="text-sm font-medium text-gray-500">Random key</label>
            </div>
          </div>
        </div>

        <div>
          <label for="key" class="text-sm font-medium text-gray-500">Custom key</label>
          <div class="mt-1 flex rounded-md shadow-sm">
          <span
              class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">cc.ensiouel.ru/</span>
            <input :required="!randomKey" :disabled="randomKey" v-model="key" type="text" name="key" id="key"
                   class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                   placeholder="XcQ">
          </div>
        </div>

        <div class="py-3 text-right">
          <button type="submit"
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Create
          </button>
          <div v-if="error !== null">
            <div class="bg-white px-4">
              <div class="sm:flex sm:items-start">
                <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <!-- Heroicon name: outline/exclamation-triangle -->
                  <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"/>
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">{{ error.status }}</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">{{ error.message }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {useShortenStore} from "@/stores/shorten";
import ShortenApi from "@/api/shorten.api";
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: "CreateShortenView",
  components: {XMarkIcon},
  data() {
    return {
      key: null,
      url: null,
      title: null,
      randomKey: true,
      shortenStore: useShortenStore(),
      shortenApi: new ShortenApi(),
      error: null
    }
  },
  mounted() {
    document.title = 'Create Shorten'
  },
  methods: {
    async submit() {
      try {
        let shorten = await this.shortenApi.create({
          key: this.key,
          url: this.url,
          title: this.title
        })

        this.shortenStore.addShorten(shorten)
        this.$router.push({name: 'shorten.info', params: {id: shorten.id}})
      } catch (error) {
        if (error.response?.data?.error.code) {
          this.error = error.response?.data?.error
        } else {
          this.$toast.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
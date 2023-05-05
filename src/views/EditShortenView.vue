<template>
  <div
      class="min-w-0 md:w-3/5 w-full top-0 absolute xl:border-r xl:border-b xl:border-gray-200 bg-white border-0 md:relative">

    <div class="px-8 h-16 flex items-center w-full justify-between">
      <h1 class="text-lg font-medium text-gray-900">Edit shorten</h1>
      <XMarkIcon @click="$router.push({name: 'shortens'})"
                 class="relative md:hidden cursor-pointer block h-6 w-6 text-gray-400 hover:text-gray-600"
                 aria-hidden="true"/>
    </div>

    <div class="block" aria-hidden="true">
      <div class="border-t border-gray-200"/>
    </div>

    <div v-if="loaded" class="px-8 py-4 space-y-4">
      <div>
        <label for="title" class="text-sm font-medium text-gray-500">Title</label>
        <input v-model="title" type="text" name="title" id="title"
               autocomplete="given-name"
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      </div>
      <div>
        <label for="url" class="text-sm font-medium text-gray-500">URL</label>
        <input v-model="url" type="text" name="url" id="url"
               autocomplete="given-name"
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      </div>
      <div>
        <label for="tags" class="text-sm font-medium text-gray-500">Tags</label>
        <Multiselect
            :classes="{
          container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-base leading-snug outline-none',
  tags: 'flex-grow flex-shrink flex space-x-2 flex-wrap items-center p-2',
  tag: 'flex text-sm font-medium text-gray-900 items-center rounded-full border border-gray-300 px-3 py-0.5',
}"
            v-model="tags"
            mode="tags"
            placeholder="Tags"
            :options="userTags"
            :searchable="true"
            :canClear="false"
            :create-option="true"
        />
      </div>
      <div v-if="error !== null">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

              <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"/>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">{{ error }}</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button @click="edit"
              class="mt-4 mr-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Save
      </button>
      <button @click="$router.push({ name: 'shorten.info',  params: { id: shorten.id }})"
              class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-offset-2">
        Back
      </button>
    </div>
  </div>

</template>

<script>
import ShortenApi from "@/api/shorten.api";
import {useShortenStore} from "@/stores/shorten";
import Multiselect from '@vueform/multiselect';
import AuthApi from "@/api/auth.api";
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import UserApi from "@/api/user.api";

export default {
  name: "EditShortenView",
  components: {Multiselect, XMarkIcon},
  data() {
    return {
      loaded: false,
      title: '',
      url: '',
      tags: [],
      userTags: [],
      error: null,
      shortensApi: new ShortenApi(),
      userApi: new UserApi(),
      shortenStore: useShortenStore(),
    }
  },
  async mounted() {
    document.title = 'Edit Shorten'

    const {user_id} = JSON.parse(localStorage.getItem('session'))

    this.userTags = await this.userApi.tags({
      userId: user_id
    })

    this.title = this.shorten?.title
    this.url = this.shorten?.long_url
    this.tags = this.shorten?.tags

    this.loaded = true
  },
  methods: {
    async edit() {
      this.error = null

      try {
        const shorten = await this.shortensApi.update({
          key: this.shorten.id,
          title: this.title,
          url: this.url,
          tags: this.tags
        })
        this.shortenStore.updateShorten(shorten)

        this.$router.push({name: 'shorten.info', params: {id: shorten.id}})
      } catch (error) {
        if (error.response?.data?.error.code) {
          this.error = error.response?.data?.error
        } else {
          this.$toast.error(error)
        }
      }
    }
  },
  computed: {
    shorten() {
      return this.shortenStore.getShortenById(this.$route.params.id)
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
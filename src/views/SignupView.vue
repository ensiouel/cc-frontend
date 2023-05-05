<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <form @submit.prevent="submit" class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          или
          <span @click="$router.push({name: 'signin'})"
                class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">Sign In</span>
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true">
        <div class="-space-y-px rounded-md grid gap-2 shadow-sm">
          <div>
            <label for="company-website" class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="name" id="username" name="username" type="text" required
                   class="mt-1 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                   placeholder="Name">
          </div>
          <div>
            <label for="company-website" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="password1" id="password1" name="password1" type="password"
                   required
                   class="mt-1 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                   placeholder="Password">
          </div>
          <div>
            <label for="company-website" class="block text-sm font-medium text-gray-700">Password again</label>
            <input v-model="password2" id="password2" name="password2" type="password"
                   required
                   class="mt-1 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                   placeholder="Password again">
          </div>
        </div>

        <div v-if="error !== null">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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

        <div>
          <button
              class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"/>
            </svg>
          </span>
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AuthApi from "@/api/auth.api";

export default {
  name: "SignupView",
  data() {
    return {
      name: '',
      password1: '',
      password2: '',
      error: null,
      authApi: new AuthApi()
    }
  },
  mounted() {
    document.title = 'Sign Up'
  },
  methods: {
    async submit() {
      this.error = null
      try {
        if (this.password1 !== this.password2) {
          this.$toast.warning('Passwords don\'t match')
          return
        }

        await this.authApi.signup({name: this.name, password: this.password1})

        this.$router.push({name: 'shortens'})
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
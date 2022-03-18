<script setup>
  import { ref } from 'vue'
  import Icons from './Icons.vue';

  const emit = defineEmits({
    filterCharacters: null
  })

  // show the menu or not
  const showFiltersMobileMenu = ref(false)

  const submit = () => {
    showFiltersMobileMenu.value = false
    emit('filterCharacters', {type: 'all', variables: {
      page: 1,
      filter: {
        ...form.value
        }
      }
    })
  }

  const form = ref({
    status: null,
    gender: null
  })

  const possibleGenders = ['Female', 'Male', 'Genderless', 'unknown']

  const reset = () => {
    form.value = {
      status: null,
      gender: null
    }
  }
</script>


<template>
  <aside class="py-0.5 sm:py-2 px-4 rounded border border-gray-300 bg-white sticky top-[6.90rem] sm:top-0 md:static">

    <div class="block md:hidden" @click="showFiltersMobileMenu = !showFiltersMobileMenu">
      <div class="flex justify-center items-center">
        <Icons :name="showFiltersMobileMenu ? 'up' : 'down'"/>
        <h2 class="mx-4">Filters</h2>
        <Icons :name="showFiltersMobileMenu ? 'up' : 'down'"/>
      </div>
    </div>

    <div class="hidden md:block md:sticky top-6">
    <form @submit.prevent="submit">
      <h2 class="text-xl font-bold mb-8">Filters</h2>

      <div class="flex flex-col mb-4">
    
        <h4 class="mb-1 font-bold">Are they dead ? 🤔</h4>

        <label for="dead" class="cursor-pointer">
          <input type="radio" id="dead" value="dead" v-model="form.status">
          Yup
        </label>
        <label for="alive" class="cursor-pointer">
          <input type="radio" id="alive" value="alive" v-model="form.status">
          Nop
        </label>
        <label for="unknown" class="cursor-pointer">
          <input type="radio" id="unknow" value="unknown" v-model="form.status">
          We don't know that !
        </label>
      </div>

      <div class="flex flex-col mb-10">
        <label for="gender" class="font-bold">Gender : </label>
        <select id="gender" v-model="form.gender" class="text-black focus-visible:outline-none rounded border border-gray-300">
          <option v-for="gender in possibleGenders" :key="gender"
            :value="gender">
            {{ gender }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-y-4">
        <button type="submit" class="bg-rm-green rounded p-2">Show me !🔎</button>
        <button type="button" @click="reset" class="rounded p-2 border border-red-500 hover:bg-red-400 hover:text-white">Reset</button>
      </div>
    </form>
    </div>

    <Transition name="filters">
    <div v-show="showFiltersMobileMenu">
      <form @submit.prevent="submit">
        <div class="flex gap-10 justify-center mt-4">
          <div class="flex flex-col mb-4">
            <h4 class="mb- font-bold">Are they dead ? 🤔</h4>

            <label for="dead" class="cursor-pointer">
              <input type="radio" id="dead" value="dead" v-model="form.status">
              Yup
            </label>
            <label for="alive" class="cursor-pointer">
              <input type="radio" id="alive" value="alive" v-model="form.status">
              Nop
            </label>
            <label for="unknown" class="cursor-pointer">
              <input type="radio" id="unknow" value="unknown" v-model="form.status">
              We don't know that !
            </label>
          </div>

          <div class="flex flex-col mb-10">
            <label for="gender" class="font-bold">Gender : </label>
            <select id="gender" v-model="form.gender" class="text-black focus-visible:outline-none rounded border border-gray-300">
              <option v-for="gender in possibleGenders" :key="gender"
                :value="gender">
                {{ gender }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-y-4 items-center">
          <button type="submit" class="bg-rm-green rounded p-2 w-40">Show me !🔎</button>
          <button type="button" @click="reset" class="rounded p-2 border border-red-500 hover:bg-red-400 hover:text-white w-40">Reset</button>
        </div>
      </form>
    </div>
    </Transition>

  </aside>
</template>

<style>
.filters-enter-active,
.filters-leave-active {
  transition: all 0.5s ease;
}

.filters-enter-from,
.filters-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
<script setup>
  import { ref } from 'vue'
  import Icons from './Icons.vue';

  const emit = defineEmits({
    filterCharacters: null
  })

  // show the menu or not
  const show = ref(true)

  const submit = () => {
    console.log(form.value)
    emit('filterCharacters', {type: 'charAll', variables: {
      page: 1,
      filter: {
        ...form.value
        }
      }
    })
    show.value = false
  }

  const form = ref({
    status: null,
    gender: null
  })

  const possibleGenders = ['Female', 'Male', 'Genderless', 'unknown']
</script>


<template>
  <aside>
    <button class="flex gap-1 items-center border rounded p-2" 
      @click="() => show = !show "
    >
      <span>Filters</span>
      <Icons :name="show ? 'prev' : 'next'"/>
    </button>

  </aside>

  <Transition name="filters">

  <aside class="py-2 px-4 rounded bg-gray-100" v-show="show">


  <form @submit.prevent="submit">

    <div class="flex">
      <div class="flex flex-col">
        <h4 class="mb-2">Are they dead ? 🤔</h4>

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

      <div>
        <label for="">Gender: </label>
        <select name="" id="" v-model="form.gender" class="text-black">
          <option v-for="gender in possibleGenders" :key="gender"
            :value="gender">
            {{ gender }}
          </option>
        </select>
      </div>
    </div>

    <button type="submit" class="bg-rm-green rounded p-2">Show me !🔎</button>

  </form>

  </aside>
  </Transition>

</template>

<style>
.filters-enter-active,
.filters-leave-active {
  transition: all 0.5s ease;
}

.filters-enter-from,
.filters-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
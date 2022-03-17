<script setup>
import { computed } from 'vue'
import Icons from './Icons.vue';

  const props = defineProps({
    prev: Number,
    next: Number,
    totalPages:Number
  })

  const currentPage = computed(() => {
    if (props.next) return props.next - 1
    if (props.prev) return props.prev + 1
  })

  const ellipsis = computed(() => {
    if (props.totalPages > 10) return 10
    return props.totalPages
  })

</script>


<template>
  <div class="flex justify-center">

    <ul class="flex border border-rm-green/50 rounded w-fit">
      <li v-if="prev" class="py-1 px-2 flex items-center cursor-pointer hover:bg-rm-green hover:text-white border-r"
        @click="$emit('changePage', -1)"
      >
        <Icons name="prev" />
      </li>

        <li v-for="page in ellipsis" 
          class="py-1 px-2 cursor-pointer hover:bg-rm-green hover:text-white border-r"
          :class="{'text-white bg-rm-green' : page === currentPage}"
          @click="$emit('changePage', page, 'page')"
        >
          {{page}}
        </li>

      <li v-if="next" class="py-1 px-2 flex items-center cursor-pointer hover:bg-rm-green hover:text-white"
        @click="$emit('changePage', 1)"
      >
        <Icons name="next" />
      </li>
    </ul>



  </div>
</template>
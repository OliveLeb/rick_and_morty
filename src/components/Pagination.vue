<script setup>
import { computed } from 'vue'
import Icons from './Icons.vue';

  const props = defineProps({
    prev: Number,
    next: Number,
    totalPages:Number
  })
  
  const ellipsis = computed(() => {
    if (totalPage > 6) return true
    return false
  })

  const currentPage = computed(() => {
    if (props.data.info.next) return props.data.info.next - 1
    if (props.data.info.prev) return props.data.info.next + 1
  })

</script>


<template>
  <div class="flex justify-center">

    <ul class="flex border border-rm-green/50 rounded w-fit">
      <li v-if="prev" class="py-1 px-2 flex items-center cursor-pointer hover:bg-rm-green hover:text-white"
        @click="$emit('changePage', -1)"
      >
        <Icons name="prev" />
      </li>

      <!-- <template v-if="ellipsis">
        <li>{{}}</li>
        <li></li>
        <li>...</li>
        <li></li>
        <li></li>
      </template> -->

      <!-- <template> -->
        <li v-for="(page, i) in totalPages" 
          class="py-1 px-2 cursor-pointer hover:bg-rm-green hover:text-white border-r"
          @click="$emit('changePage', page, 'page')"
        >
          {{page}}
        </li>
      <!-- </template> -->

      <li v-if="next" class="py-1 px-2 flex items-center cursor-pointer hover:bg-rm-green hover:text-white"
        @click="$emit('changePage', 1)"
      >
        <Icons name="next" />
      </li>
    </ul>



  </div>
</template>
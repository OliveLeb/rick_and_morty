<template>
  <div class="burger-menu" :class="{open: open}" >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup>
  defineProps({
    open: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped>
div {
  width: 20px;
  height: 15px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}
div span {
  border-radius: 20%;
}
div span {
  display: block;
  position: absolute;
  height: 3px;
  width: 50%;
  /* background: #d3531a; */
  background-color: #3D3D3D;
  opacity: 1;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}
.dark div span{
  background-color: #ECDBBA;
}

div span:nth-child(even) {
  left: 50%;
  border-radius: 0 9px 9px 0;
}

div span:nth-child(odd) {
  left:0px;
  border-radius: 9px 0 0 9px;
}

div span:nth-child(1), div span:nth-child(2) {
  top: 0px;
}

div span:nth-child(3), div span:nth-child(4) {
  top: 6px;
}

div span:nth-child(5), div span:nth-child(6) {
  top: 12px;
}

div.open span:nth-child(1),div.open span:nth-child(6) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

div.open span:nth-child(2),div.open span:nth-child(5) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

div.open span:nth-child(1) {
  left: 2px;
  top: 4px;
}

div.open span:nth-child(2) {
  left: calc(50% - 2px);
  top: 4px;
}

div.open span:nth-child(3) {
  left: -50%;
  opacity: 0;
}

div.open span:nth-child(4) {
  left: 100%;
  opacity: 0;
}

div.open span:nth-child(5) {
  left: 2px;
  top: 11px;
}

div.open span:nth-child(6) {
  left: calc(50% - 2px);
  top: 11px;
}
</style>
<template>
  <div id="app">
    <transition :name="transitionName" :duration="{ enter: 500, leave: 500 }">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
    }
  }
</script>


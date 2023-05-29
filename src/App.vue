<!--
有app的div
router-view：路由视图的根路径，指的是helloworld的那个,具体要看路由的配置，即index.js
router-link：路由的跳转，指的是userhome.vue ,具体要看路由的配置，即index.js
-->
<template>
  <div id="app">
    <router-view/>
     <router-link to="/user">UserHome</router-link> |
  </div>
</template>
<!--默认使用的是app的组件-->
<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

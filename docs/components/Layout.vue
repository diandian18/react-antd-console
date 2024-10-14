
<script setup>
import { useData } from 'vitepress'
const { isDark } = useData()
</script>

<template>
  <div :class="{ isDark, 'page': true, 'xxx': true }">
    <div class="left">{{ `<SideMenu />` }}</div>
    <div class="right">
      <div class="header">{{ `<Header />` }}</div>
      <div class="body"><a target="_blank" href="https://reactrouter.com/en/main/components/outlet">{{ `<Outlet />` }}</a></div>
      <div class="footer">{{ `<Footer />` }}</div>
    </div>
  </div>
</template>

<style>
.page {
  width: 100%;
  height: 300px;
  display: flex;
  text-align: center;
}
.left, .header, .footer {
  background-color: #dedcdc;
}
.body {
  background-color: rgb(232, 220, 149);
}
.isDark {
  color: #eff;
  .left, .header, .footer {
    background-color: #313131;
  }
  .body {
    background-color: rgb(113, 107, 72);
  }
}
.left {
  width: 140px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 6px;
}
.right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header, .footer {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  border-radius: 10px;
  margin-bottom: 6px;
}
.footer {
  border-radius: 10px;
  margin-top: 6px;
}
.body {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
</style>
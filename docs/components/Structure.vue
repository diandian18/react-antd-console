
<script setup>
import { useData } from 'vitepress';
const { isDark } = useData();
</script>

<template>
  <div :class="{ isDark, 'stru-page': true, 'xxx': true }">
    <div class="stru-left">{{ `<Layout />` }}</div>
    <div class="stru-right">
      <div class="stru-header"></div>
      <div class="stru-body"><a target="_blank" href="https://reactrouter.com/en/main/components/outlet">{{ `<Outlet />` }}</a></div>
      <div class="stru-footer"></div>
    </div>
  </div>
</template>

<style>
.stru-page {
  width: 100%;
  height: 300px;
  display: flex;
  text-align: center;
}
.stru-left, .stru-header, .stru-footer {
  background-color: #dedcdc;
}
.stru-body {
  background-color: rgb(232, 220, 149);
}
.isDark {
  color: #eff;
  .stru-left, .stru-header, .stru-footer {
    background-color: #313131;
  }
  .stru-body {
    background-color: rgb(113, 107, 72);
  }
}
.stru-left {
  width: 140px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.stru-right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.stru-header, .stru-footer {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stru-header {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.stru-footer {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.stru-body {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 6px 0 6px 6px;
}
</style>
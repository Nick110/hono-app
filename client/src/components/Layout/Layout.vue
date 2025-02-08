<template>
  <el-container class="out-layout">
    <Sider />
    <el-container class="main-layout">
      <Header />
      <el-main>
        <RouterView />
      </el-main>
      <el-footer
        :style="{
          textAlign: 'center',
          height: '40px',
          lineHeight: '40px',
          color: '#999'
        }"
      >
        Created by Younger 2024
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Header from './Header.vue'
</script>

<style lang="scss">
.out-layout {
  min-height: 100vh;
}
.main-layout {
  background-color: #f1f3f5;
}
</style>

<template>
  <el-aside :width="globalStore.collapsed ? '64px' : '200px'">
    <div class="collapse-btn cursor-pointer absolute">
      <el-icon @click="toggleCollapsed">
        <DArrowRight v-if="globalStore.collapsed" />
        <DArrowLeft v-else />
      </el-icon>
    </div>
    <div
      class="logo-wrapper cursor-pointer"
      @click="routerPush('/')"
    >
      <Icon
        v-if="globalStore.collapsed"
        icon="logos:netbeans"
        style="font-size: 24px"
      />
      <Icon
        v-else
        icon="logos:codium"
        style="font-size: 24px"
      />
    </div>
    <el-scrollbar>
      <el-menu
        class="sider"
        :default-active="route.path"
        :default-openeds="openKeys"
        :collapse="globalStore.collapsed"
        active-text-color="#000"
        background-color="linear-gradient(to right,#96c93d,#00b09b)"
        text-color="#fff"
      >
        <!-- 目前支持2级菜单 -->
        <template
          v-for="item in siderMenuConfig"
          :key="item.path"
        >
          <el-sub-menu
            v-if="item.children"
            :index="item.path"
          >
            <template #title>
              <Icon
                class="mr-2"
                :icon="item.meta.icon"
                v-if="item.meta.icon"
                width="20"
                height="20"
              />
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.path"
              :index="item.path + '/' + subItem.path"
              @click="routerPush(item.path + '/' + subItem.path)"
            >
              <Icon
                class="mr-2"
                :icon="subItem.meta.icon"
                v-if="subItem.meta.icon"
                width="20"
                height="20"
              />
              <template #title>
                {{ subItem.meta.title }}
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item
            v-else
            :index="item.path"
            @click="routerPush(item.path)"
          >
            <Icon
              class="mr-2"
              :icon="item.meta.icon"
              v-if="item.meta.icon"
              width="20"
              height="20"
            />
            <template #title>
              {{ item.meta.title }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { routes } from '@/router'
import { useGlobalStore } from '@/store/global'
import { Icon } from '@iconify/vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const globalStore = useGlobalStore()

const toggleCollapsed = () => {
  return globalStore.toggleCollapsed()
}

const siderMenuConfig = ref(routes[0].children)
// console.log('siderMenuConfig', siderMenuConfig.value)

const route = useRoute()
const router = useRouter()

const routerPush = (path) => {
  router.push({
    path
  })
}

const openKeys = computed(() => {
  return [`/${route.path.split('/')[1]}`]
})

onMounted(() => {
  console.log(route.path, openKeys.value)
})
</script>

<style lang="scss" scoped>
.logo-wrapper {
  border-bottom: 1px solid #cfcfcf;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sider {
  border: none;
}
.el-aside {
  transition: width 0.3s ease;
  // background-color: #313131;
  background: linear-gradient(to right, #96c93d, #00b09b);

  position: relative;
  overflow-x: visible;
  .collapse-btn {
    right: 0px;
    top: 45%;
    color: #fff;
    z-index: 20;
    // background-color: #fff;
    // border: 1px solid rgb(5 5 5 / 6%);
    // border-radius: 50%;
    // width: 24px;
    // height: 24px;
    // justify-content: center;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  :deep(.el-sub-menu__title:hover),
  .el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .el-menu-item.is-active {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>

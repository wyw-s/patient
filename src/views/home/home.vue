<template>
  <div>
    <!-- 布局容器 -->
    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px" class="l_h">
        <div class="logo">后台管理系统</div>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo nav_p"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" class="">患者管理</el-menu-item>
          <el-menu-item index="2" class="">病历管理</el-menu-item>
          <el-menu-item index="3" class="">数据大盘</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧容器 -->
      <el-container>
        <el-header style="height: 40px">
          <div class="UserOut">
            <span>患者管理</span>
            <el-button type="info" size="mini">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 二级路由容器 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="less" scoped>
.l_h {
  height: 100vh;
  background-color: #545c64;
  .logo {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    background-color: #1e2a36;
  }
  .nav_p {
    .el-menu-item {
      padding-left: 40px;
    }
  }
}
.UserOut {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}
</style>

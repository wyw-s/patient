<template>
  <div>
    <!-- 布局容器 -->
    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px" class="l_h">
        <div class="logo">后台管理系统</div>
        <el-menu
          class="el-menu-demo nav_p"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">患者管理</el-menu-item>
          <el-menu-item index="/caseHistory">病历管理</el-menu-item>
          <el-menu-item index="/statistics">数据大盘</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧容器 -->
      <el-container>
        <el-header style="height: 40px">
          <div class="UserOut">
            <span>百草堂</span>
            <el-button @click="OnUserOut" type="info" size="mini">退出登录</el-button>
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
import { remTOken } from '../../utils/Token.js'
export default {
  name: 'nav_',
  data () {
    return {
    }
  },
  methods: {
    OnUserOut () {
      this.$confirm('此操作将退出登录状态, 是否继续?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        remTOken()
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
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

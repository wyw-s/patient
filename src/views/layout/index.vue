<template>
  <!-- 布局容器 -->
  <el-container>
    <!-- 左侧导航 -->
    <el-aside width="150px" class="l_h">
      <div class="logo"><img :src="logoUrl" alt=""></div>
      <el-menu
        @select="onSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#fff"
        :default-active="active"
      >
        <el-menu-item
          v-for="item in menuArr"
          :key="item.id"
          :index="item.id">
          <el-icon :class="'w-icon-' + item.icon"></el-icon>
           {{ item.menuName }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container class="My_right_container">
      <el-header>
        <div class="UserOut">
          <strong>百草堂颈椎腰腿疼医疗康复中心</strong>
          <el-button @click="OnUserOut" type="info" size="mini">退出登录</el-button>
        </div>
      </el-header>
      <el-main style="padding-top: 0">
        <!-- 二级路由容器 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'layout_',
  data () {
    return {
      logoUrl: require('@/assets/logo.png'),
      active: this.$getLocal('activeItem') || '1',
      menuArr: [
        {
          id: '1',
          menuName: '数据大盘',
          url: '/statistics',
          icon: 'shuju',
          children: null
        },
        {
          id: '2',
          menuName: '患者管理',
          url: '/caseManage',
          icon: 'huanzheguanli',
          children: null
        },
        {
          id: '3',
          menuName: '病历管理',
          url: '/caseHistory',
          icon: 'bingli',
          children: null
        },
        {
          id: '4',
          menuName: '字典管理',
          url: '/dictionaries',
          icon: 'zidian',
          children: null
        }
      ]
    }
  },
  methods: {
    onSelect (index) {
      let URL = ''
      this.menuArr.forEach(item => {
        if (item.id === index) {
          URL = item.url
          this.active = item.id
          return
        }
        if (item.children) {
          for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].id === index) {
              URL = item.children[i].url
              this.active = item.id
              return
            }
          }
        }
      })
      this.$router.push(URL)
      this.$setLocal('activeItem', this.active)
    },
    OnUserOut () {
      this.$confirm('此操作将退出登录状态, 是否继续?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        window.sessionStorage.removeItem('Token')
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
    background-color: #ccc;
    img {
      width: 100%;
      height: 100%;
      padding: 5px;
    }
  }
  .el-menu-item.is-active {
    background-color: #437ca2  !important;
  }
  .el-menu-item {
    padding-left: 40px;
  }
  .el-menu-item i {
    color: #ffffff;
  }
  .el-menu-item:hover {
    background-color: #437ca2 !important;
  }
}

.My_right_container {
  height: 100vh;
  .el-header {
    position: relative;
    height: 48px !important;
    z-index: 999;
    border-bottom: 1px solid #ebeef5;
    box-shadow: 0 0 15px 2px #ccc;
    .UserOut {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      line-height: 28px;
      strong {
        font-size: 18px;
      }
    }
  }
}
</style>

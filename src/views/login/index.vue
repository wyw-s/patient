<template>
  <div class="picture">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户登录</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model.number="ruleForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(ruleForm)"
            class="register"
            :loading="fullscreenLoading"
          >{{ fullscreenLoading ? '登录中...' : '立即登录' }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单内数据
      ruleForm: {
        username: '',
        password: ''
      },
      // loading;
      fullscreenLoading: false,
      // 效验规则
      rules: {
        username: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 提交表单
    submitForm () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.fullscreenLoading = true
          this.$store.dispatch('userLogin', this.ruleForm).then(res => {
            if (res.success) {
              // 存储token;
              window.sessionStorage.setItem('Token', res.data)
              // 编程式导航；
              this.$tooltip('登录成功')
              this.$router.push('/')
              this.$setLocal('activeItem', '1')
            } else {
              this.$tooltip('用户名或密码错误，请重新输入', 'error')
            }
            this.fullscreenLoading = false
          }).catch(() => {
            this.$tooltip('登录失败，请重试', 'error')
          })
        } else {
          // 效验失败
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.picture {
  background-image: url("../../assets/login.jpg");
  background-size: cover;
  height: 97vh;
  .box-card {
    width: 300px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    /deep/ .el-card__header {
      text-align: center;
    }
    .register {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>

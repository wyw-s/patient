<template>
  <div class="picture">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户登录</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model.number="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="pass" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)" class="register">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import http from '../../utils/http.js'
import { setToken } from '../../utils/Token.js'
export default {
  data () {
    return {
      // 表单内数据
      ruleForm: {
        username: 'qwer1234',
        password: '123456'
      },
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
    submitForm (ruleForm) {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          // 请求响应
          const { data } = await http.post('/customer/user/login', this.ruleForm)
          if (data.success) {
            // 存储token;
            // console.log(data)
            setToken(data.data)
            // 编程式导航；
            this.$router.push('/')
          } else {
            // 错误提示
            this.$message.error('用户名或密码错误，请重新输入')
          }
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
    width: 400px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
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

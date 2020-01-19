<template>
  <div>
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix head">
        <div>
          <el-button @click="openDialog('ADD')">新增患者</el-button>
          <!-- dialog 组件 -->
           <el-dialog
              :title="TitleDialog"
              :visible.sync="centerDialog"
              :close-on-click-modal="false"
              width="35%"
              center
              modal
            >
            <!-- 表单 -->
              <el-form
                :model="addCaseInfo"
                :rules="rules"
                ref="addForm"
                label-width="80px"
                class="demo-ruleForm"
              >
                <el-form-item label="姓名" prop="readlname" class="addCase">
                  <el-input v-model="addCaseInfo.readlname"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age" class="addCase">
                  <el-input v-model="addCaseInfo.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender" class="addCase">
                  <el-input v-model="addCaseInfo.gender"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" class="addCase">
                  <el-input v-model="addCaseInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address" class="addCase">
                  <el-input v-model="addCaseInfo.address"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="OnAddInfo(false)">取 消</el-button>
                <el-button type="primary" @click="OnAddInfo(true)">确 定</el-button>
              </span>
            </el-dialog>
          <el-button @click="OnAddCase">新增病例</el-button>
        </div>
        <!-- 查询 -->
        <div>
          <el-form :inline="true" :model="formValue" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="formValue.mobile"
                placeholder="根据手机号查询患者"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary" @click="onQuery('mobile')">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formValue.name"
                placeholder="根据姓名模糊查询患者"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onQuery('name')"
              >查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="margin-bottom: 20px">患者列表</div>
      <!-- 表格组件 -->
      <el-table
        :data="DataList"
        border=""
        style="width: 100%"
      >
        <el-table-column
          prop="readlname"
          label="姓名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="time"
          label="日期"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        ></el-table-column>
         <el-table-column
          prop="historyCase"
          label="当前患者以往病例"
          width="150"
        >
        <el-button
          size="small"
          @click="onLook"
        >查看</el-button>
        </el-table-column>
         <el-table-column
          prop="operation "
          label="操作"
          width="160"
        >
        <el-button
          size="small"
          type="success"
          @click="onEdit"
        >编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="onDelete"
        >删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { queryPatient, addPatient } from '@/utils/api.js'
export default {
  data () {
    return {
      // 列表查询
      formValue: {
        phone: '',
        readlname: '',
        pageIndex: 1,
        pageSize: 10
      },
      // 新增患者信息
      addCaseInfo: {
        readlname: '',
        age: '',
        gender: '',
        phone: '',
        address: ''
      },
      // 列表数据
      DataList: [{
        readlname: '',
        phone: '',
        time: '',
        address: '',
        operation: ''
      }],
      // 对话框
      centerDialog: false,
      // 对话框标题
      TitleDialog: '',
      // 对话框效验规则
      rules: {
        readlname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  created () {
    // 加载列表数据
    this.loadList(this.formValue)
  },
  methods: {
    // 加载列表信息
    async loadList (data) {
      const res = await queryPatient(data)
      console.log(res)
    },

    // 查询
    onQuery (val) {
      if (val === 'mobile') {

      } else {

      }
    },

    // 打开Dialog
    openDialog (val) {
      this.centerDialog = true
      if (val === 'ADD') {
        this.TitleDialog = '新增患者'
      } else {
        this.TitleDialog = '编辑患者信息'
      }
    },

    // 新增患者信息；
    async OnAddInfo (type) {
      if (!type) {
        // 关闭对话框
        this.centerDialog = false
        // 重置效验并清空文本
        this.$refs['addForm'].resetFields()
      } else {
        let value = {}
        // 非空判断
        for (const key in this.addCaseInfo) {
          // 去除空格
          value[key] = this.addCaseInfo[key].trim()
          if (!value[key]) {
            this.$message({
              message: '请填写完整',
              type: 'warning'
            })
            return
          }
        }
        // 关闭对话框
        this.centerDialog = false
        // 重置效验
        this.$refs['addForm'].resetFields()
        // 请求响应
        const res = await addPatient(value)
        console.log(res)
        // 刷新列表信息
        this.loadList(this.formValue)
      }
    },

    // 新增病例；
    OnAddCase () {},

    // 查看；
    onLook () {},

    // 编辑；
    onEdit () {
      this.openDialog()
    },

    // 删除；
    onDelete () {}
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  .head {
    display: flex;
    justify-content: space-between;
    >div:first-child {
      .el-button--default {
        margin-right: 10px;
      }
    }
    >div:last-child {
      .el-form-item {
        margin: 0 10px;
      }
    }
  }
}
</style>

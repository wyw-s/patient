<template>
  <!-- 卡片组件 -->
  <el-card class="caseControl">
    <div slot="header">患者列表</div>
    <div class="addOrSearch">
      <div>
        <el-button size="small" type="primary" plain icon="el-icon-plus" @click="openDialog()">新增患者</el-button>
      </div>
      <div class="search">
        <el-date-picker
          v-model="formValue.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-input
          clearable
          size="small"
          prefix-icon="el-icon-search"
          @keyup.enter.native="loadList"
          @clear="loadList"
          v-model.trim="formValue[selectValue]"
          placeholder="请输入"
          class="input-with-select"
        >
          <el-select v-model="selectValue" slot="prepend" placeholder="请选择">
            <el-option label="手机号" value="phone"></el-option>
            <el-option label="姓名" value="readlname"></el-option>
          </el-select>
        </el-input>
        <el-button size="small" type="primary" @click="onQuery">搜索</el-button>
      </div>
    </div>
    <!-- 表格组件 -->
    <el-table
      v-loading="loading"
      :data="DataList"
      border
      style="width: 100%"
      element-loading-text="拼命加载中..."
      highlight-current-row
    >
      <el-table-column
        align="center"
        prop="readlname"
        label="姓名"
        width="100"
      >
        <template slot-scope="scope">
          <el-link type="primary" @click="OnReview(scope.row)">{{scope.row.readlname}}</el-link>
        </template>
      </el-table-column>
      <template
        v-for="(item, index) in tabelData"
      >
        <el-table-column
          :key="index"
          :align="item.align"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </template>
      <el-table-column align="center" prop="operation" label="操作" width="140">
        <template slot-scope="scope">
          <el-button plain size="mini" type="success" icon="el-icon-view" circle @click="onView(scope.row)"></el-button>
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="onEdit(scope.row)"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle @click="onDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="laypage">
      <el-pagination
        :current-page="formValue.pageIndex"
        @current-change="onPageChange"
        @size-change="onHandleSizeChange"
        :disabled="page_loading"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count">
      </el-pagination>
    </div>
    <!--新增患者对话框-->
    <el-dialog
      :before-close="closeDialogPatient"
      :title="TitleDialog"
      :visible.sync="centerDialog"
      :close-on-click-modal="false"
      width="35%"
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
        <el-form-item label="姓名" prop="readlname">
          <el-input :disabled="viewCaseInfo" v-model.trim="addCaseInfo.readlname"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            :maxlength="3"
            :disabled="viewCaseInfo"
            v-model.trim="addCaseInfo.age"
            @input="addCaseInfo.age = $numFormat('int', addCaseInfo.age)"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select
            v-model="addCaseInfo.gender"
            placeholder="请选择"
            style="width: 100%"
            :disabled="viewCaseInfo"
          >
            <el-option
              label="男"
              :value="1"
            ></el-option>
            <el-option
              label="女"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            :disabled="viewCaseInfo"
            v-model.trim="addCaseInfo.phone"
            :maxlength="11"
            @input="addCaseInfo.phone = $numFormat('int', addCaseInfo.phone)"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input :disabled="viewCaseInfo" v-model.trim="addCaseInfo.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="TitleDialog !== '查看患者信息'" size="small" @click="onCancelInfo">取 消</el-button>
          <el-button v-if="TitleDialog !== '查看患者信息'" size="small" type="primary" @click="onSaveInfo">确 定</el-button>
          <el-button v-if="TitleDialog === '查看患者信息'" size="small" type="primary" @click="onClose">关 闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'case_control',
  data () {
    return {
      // 标题
      tabelData: [
        {
          label: '性别',
          prop: 'gender',
          width: '50',
          align: 'center'
        },
        {
          label: '年龄',
          prop: 'age',
          width: '50',
          align: 'center'
        },
        {
          label: '手机号',
          prop: 'phone',
          width: '120',
          align: 'center'
        },
        {
          label: '住址',
          prop: 'address',
          width: '',
          align: 'center'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: '180',
          align: 'center'
        }
      ],
      // 列表查询
      formValue: {
        time: '',
        phone: null,
        readlname: null,
        // 当前页数；
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
      DataList: [],
      // 对话框
      centerDialog: false,
      AddCaseDialog: false,
      // 对话框标题
      TitleDialog: '',
      // loadding;
      loading: true,
      // 总条数；
      total_count: 0,
      // 是否禁用；
      page_loading: true,
      // 对话框效验规则
      rules: {
        readlname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      },
      viewCaseInfo: false,
      selectValue: 'readlname',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },

  created () {
    // 加载列表数据
    this.loadList()
  },
  methods: {
    // 加载列表信息
    loadList () {
      this.loading = true
      this.page_loading = true
      this.$store.dispatch('queryPatient', this.formValue).then(res => {
        this.loading = false
        this.page_loading = false
        this.DataList = res.data.data
        this.total_count = res.data.total
      })
    },

    // 查询
    onQuery () {
      if (this.selectValue === 'phone') {
        this.formValue.readlname = null
      } else {
        this.formValue.phone = null
      }
      this.loading = true
      this.page_loading = true
      this.formValue.pageIndex = 1
      this.$store.dispatch('queryPatient', this.formValue).then(res => {
        if (!res.success) {
          this.$tooltip('查询失败', 'error')
          return
        }
        this.loading = false
        this.page_loading = false
        this.DataList = res.data.data
        this.total_count = res.data.total
      }).catch(() => {
        this.$tooltip('查询失败', 'error')
      })
    },

    // 打开Dialog
    openDialog () {
      this.centerDialog = true
      this.TitleDialog = '新增患者'
    },

    closeDialogPatient () {
      // 关闭对话框
      this.centerDialog = false
      // 清空表单
      this.addCaseInfo = {}
      // 重置效验
      this.$refs['addForm'].clearValidate()
    },

    // 取消保存或编辑；
    onCancelInfo () {
      // 关闭对话框
      this.centerDialog = false
      // 清空表单
      this.addCaseInfo = {}
      // 重置效验
      this.$refs['addForm'].clearValidate()
    },

    // 保存患者信息；
    onSaveInfo () {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          this.$tooltip('* 号为必填项，请重新输入', 'warning')
          return
        }
        // 关闭对话框
        this.centerDialog = false
        const { gender } = this.addCaseInfo
        this.addCaseInfo.gender = gender === 2 ? '女' : '男'
        if (this.TitleDialog === '新增患者') {
          this.$store.dispatch('addPatient', this.addCaseInfo).then(res => {
            if (res.success) {
              this.$tooltip('恭喜你，新增成功')
              this.loadList()
            } else {
              this.$tooltip('新增失败', 'error')
            }
          }).catch(() => {
            this.$tooltip('新增失败', 'error')
          })
        } else if (this.TitleDialog === '编辑患者信息') {
          this.$store.dispatch('updateMessage', this.addCaseInfo).then(res => {
            if (res.success) {
              this.$tooltip('恭喜你，修改成功')
              this.loadList()
            } else {
              this.$message('修改失败', 'error')
            }
          }).catch(() => {
            this.$message('修改失败', 'error')
          })
        }
        // 清空表单
        this.addCaseInfo = {}
        // 重置效验
        this.$refs['addForm'].clearValidate()
      })
    },

    onClose () {
      this.viewCaseInfo = false
      this.centerDialog = false
    },

    // 复查；
    OnReview (data) {
      this.$router.push({
        name: 'userCase',
        query: {
          id: data.id,
          caseName: data.readlname
        }
      })
    },

    onView (data) {
      this.viewCaseInfo = true
      this.centerDialog = true
      this.TitleDialog = '查看患者信息'
      this.addCaseInfo = data
    },

    // 编辑；
    onEdit (data) {
      this.centerDialog = true
      this.TitleDialog = '编辑患者信息'
      // 用对象的展开解决对象的拷贝问题
      this.addCaseInfo = { ...data }
    },

    // 删除：
    onDelete (row) {
      this.$confirm(`
      此操作不可恢复！会同时删除<b style="color: red">${row.readlname}</b>的历史病例和订单, 真的要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deletePatient', row.id).then(res => {
          if (res.success) {
            this.$tooltip('删除成功!')
            this.loadList()
          } else {
            this.$tooltip('删除失败', 'error')
          }
        })
      }).catch(() => {})
    },

    // 查看当前页；
    onPageChange (page) {
      this.formValue.pageIndex = page
      this.loadList()
    },
    onHandleSizeChange (size) {
      this.formValue.pageIndex = 1
      this.formValue.pageSize = size
      this.loadList()
    }
  }
}

</script>

<style lang="less" scoped>
.caseControl {
  .addOrSearch {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    /deep/.search {
      display: flex;

      > div {
        margin-right: 8px;
      }
      .el-date-editor {
        height: 30px;
        //line-height: 22px;
        .el-input__icon,.el-range-separator {
          height: inherit;
        }
      }
      .el-select .el-input {
        width: 80px;
        .el-input__inner {
          padding-left: 8px;
        }
      }
      .input-with-select {
        width: 300px;
        background-color: #ffffff;
      }
    }
  }
  .laypage {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>

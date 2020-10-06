<template>
  <div class="historyCase">
    <el-table
      v-loading="loading"
      :data="caseHistory"
      border=""
      style="width: 100%"
      element-loading-text="拼命加载中..."
    >
      <el-table-column
        prop="readlname"
        label="姓名"
        width="80"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="symptom"
        label="症状"
        width="250"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="program"
        label="治疗方案"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <template
        v-for="(item, index) in tabelData"
      >
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
        >
        </el-table-column>
      </template>
      <el-table-column
        prop="remark"
        label="订单备注"
        align="center"
        width="160"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button plain size="mini" type="success" icon="el-icon-view" circle @click="onView(scope.row)"></el-button>
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="onEdit(scope.row)"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle @click="onDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="laypage">
      <el-pagination
        :current-page="pageIndex"
        @current-change="onPageChange"
        @size-change="onHandleSizeChange"
        :disabled ="page_loading"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
      >
      </el-pagination>
    </div>
    <!-- 新增病例对话框 -->
    <el-dialog
      :before-close="closeDialogCase"
      :visible.sync="AddCaseDialog"
      :close-on-click-modal="false"
      :title="title"
      width="40%"
      modal
    >
      <el-form
        :model="rowEditCase"
        :rules="addCaseRules"
        ref="addCaseForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="症状" prop="symptom">
          <el-input type="textarea" :disabled="disabled" v-model="rowEditCase.symptom"></el-input>
        </el-form-item>
        <el-form-item label="治疗方案" prop="program">
          <el-input type="textarea" :disabled="disabled" v-model="rowEditCase.program"></el-input>
        </el-form-item>
        <el-form-item label="医生" prop="doctor">
          <el-input :disabled="disabled" v-model="rowEditCase.doctor"></el-input>
        </el-form-item>
        <el-form-item label="就诊日期" prop="caseTime">
          <el-date-picker
            v-model="rowEditCase.caseTime"
            :disabled="disabled"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="消费金额(元)" prop="account">
          <el-input :disabled="disabled" v-model="rowEditCase.account"></el-input>
        </el-form-item>
        <el-form-item label="订单备注" prop="remark">
          <el-input :disabled="disabled" v-model="rowEditCase.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialogCase()">取 消</el-button>
        <el-button size="small" type="primary" v-if="title === '修改病例'" @click="onNewAddCase('edit')">修 改</el-button>
        <el-button size="small" type="primary" v-if="title === '新增病例'" @click="onNewAddCase('add')">新 增</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'historyCase',
  data () {
    return {
      title: '修改病例',
      userId: this.$route.query.id,
      pageIndex: 1,
      pageSize: 10,
      disabled: false,
      caseHistory: [],
      // 总条数；
      total_count: 0,
      // 是否禁用；
      page_loading: false,
      // loadding;
      loading: false,
      tabelData: [
        {
          label: '医生',
          prop: 'doctor',
          width: '80',
          align: 'center'
        },
        {
          label: '就诊日期',
          prop: 'caseTime',
          width: '120',
          align: 'center'
        },
        {
          label: '金额(元)',
          prop: 'money',
          width: '80',
          align: 'center'
        }
      ],
      AddCaseDialog: false,
      // 新增病例；
      rowEditCase: {
        symptom: '',
        program: '',
        doctor: '王建设',
        caseTime: '',
        account: '',
        remark: ''
      },
      addCaseRules: {
        symptom: [{ required: true, message: '请输入症状', trigger: 'blur' }],
        program: [{ required: true, message: '请输入治疗方案', trigger: 'blur' }],
        readlname: [{ required: true, message: '请输入症状', trigger: 'blur' }],
        doctor: [{ required: true, message: '请输入诊治医师', trigger: 'blur' }],
        caseTime: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        money: [{ required: true, message: '请输入金额', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    // 病例列表
    loadList () {
      this.loading = true
      this.page_loading = true
      this.$store.dispatch('getCaseHistory', {
        userId: this.userId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        if (res.success) {
          this.caseHistory = res.data.data
          this.total_count = res.data.total
        }
        this.page_loading = false
        this.loading = false
      })
    },

    // 新增病例；
    onNewAddSase () {
      this.title = '新增病例'
      this.rowEditCase.caseTime = `${moment(new Date()).format('YYYY-MM-DD')}`
      this.AddCaseDialog = true
    },

    // 关闭Dialog
    closeDialogCase () {
      this.AddCaseDialog = false
      // 清空表单
      this.rowEditCase = { doctor: '王建设' }
      // 重置效验
      this.$refs['addCaseForm'].clearValidate()
    },

    // 新增病例
    onNewAddCase () {
      this.$refs['addCaseForm'].validate((valid) => {
        if (!valid) {
          this.$message({
            message: '* 号为必填项，请重新输入',
            type: 'warning'
          })
          return
        }
        // 效验成功关闭对话框；
        this.AddCaseDialog = false
        if (this.title === '新增病例') {
          this.$store.dispatch('postaddCase', { ...this.rowEditCase, userId: this.userId }).then(res => {
            if (res.success) {
              this.$tooltip('恭喜你，新增成功')
              this.loadList()
            } else {
              this.$tooltip('新增失败', 'error')
            }
          }).catch(() => {
            this.$tooltip('新增失败', 'error')
          })
        } else {
          this.$store.dispatch('postEditCase', { ...this.rowEditCase, userId: this.userId }).then(res => {
            if (res.success) {
              this.$tooltip('恭喜你，修改成功')
              this.loadList()
            } else {
              this.$tooltip('修改失败', 'error')
            }
          })
        }
        // 清空表单
        this.rowEditCase = { doctor: '王建设' }
        // 重置效验
        this.$refs['addCaseForm'].clearValidate()
      })
    },

    onPageChange (page) {
      this.pageIndex = page
      this.loadList()
    },
    onHandleSizeChange (size) {
      this.pageIndex = 1
      this.pageSize = size
      this.loadList()
    },

    // 编辑；
    onEdit (data) {
      this.disabled = false
      this.title = '修改病例'
      this.rowEditCase = { ...data, account: data.money }
      delete this.rowEditCase.money
      this.AddCaseDialog = true
    },

    // 查看
    onView (data) {
      this.disabled = true
      this.title = '查看病例'
      this.rowEditCase = { ...data, account: data.money }
      delete this.rowEditCase.money
      this.AddCaseDialog = true
    },

    // 删除：
    onDelete (row) {
      this.$confirm(`
      此操作不可恢复！会同时删除<b style="color: red">${row.readlname}</b>的当前病例和账单, 真的要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('postDeleteCase', row.id).then(res => {
          if (res.success) {
            this.$tooltip('删除成功!')
            this.loadList()
          } else {
            this.$tooltip('删除失败!', 'error')
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.historyCase {
  .laypage {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>

<template>
 <div>
  <el-card>
    <div style="margin-bottom: 20px">病历管理</div>
     <el-table
        v-loading="loading"
        :data="CaseHistory"
        border=""
        style="width: 100%"
        element-loading-text="拼命加载中..."
      >
       <el-table-column
         prop="readlname"
         label="姓名"
         width="100"
         align="center"
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
           width="160"
         >
           <template slot-scope="scope">
             <el-button
               size="mini"
               type="success"
               @click="onEdit(scope.row)"
             >修改
             </el-button>
             <el-button
               size="mini"
               type="danger"
               @click="onDelete(scope.row)"
             >删除
             </el-button>
           </template>
         </el-table-column>
      </el-table>
      <div class="laypage">
        <el-pagination
          :current-page="CaseInfo.pageIndex"
          @current-change="onPageChange"
          :disabled ="page_loading"
          background
          layout="prev, pager, next, total"
          :total="total_count"
        >
        </el-pagination>
      </div>
  </el-card>
   <!-- 对话框 -->
   <el-dialog
     :before-close="closeDialogCase"
     title="修改病例"
     :visible.sync="AddCaseDialog"
     :close-on-click-modal="false"
     width="40%"
     center
     modal
   >
     <!-- 表单 -->
     <el-form
       :model="rowEditCase"
       :rules="addCaseRules"
       ref="addCaseForm"
       label-width="120px"
       class="demo-ruleForm"
     >
       <el-form-item label="姓名">
         <el-input v-model="rowEditCase.readlname" disabled></el-input>
       </el-form-item>
       <el-form-item label="症状" prop="symptom">
         <el-input type="textarea" v-model="rowEditCase.symptom"></el-input>
       </el-form-item>
       <el-form-item label="治疗方案" prop="program">
         <el-input type="textarea" v-model="rowEditCase.program"></el-input>
       </el-form-item>
       <el-form-item label="医生" prop="doctor">
         <el-input v-model="rowEditCase.doctor" disabled></el-input>
       </el-form-item>
       <el-form-item label="就诊日期" prop="caseTime">
         <el-input v-model="rowEditCase.caseTime" disabled></el-input>
       </el-form-item>
       <el-form-item label="消费金额(元)" prop="money">
         <el-input v-model="rowEditCase.money" disabled></el-input>
       </el-form-item>
       <el-form-item label="订单备注" prop="remark">
         <el-input v-model="rowEditCase.remark"></el-input>
       </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
        <el-button @click="OnSaveAddCase(false)">取 消</el-button>
        <el-button type="primary" @click="OnSaveAddCase(true)">修 改</el-button>
      </span>
   </el-dialog>
 </div>
</template>

<script>
import {
  getCaseHistory,
  postDeleteCase,
  postEditCase
} from '@/api/PatientManage.js'
export default {
  name: 'Case_History',
  data () {
    return {
      CaseInfo: {
        pageIndex: 1,
        pageSize: 10,
        userId: null
      },
      CaseHistory: [],
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
          width: '100',
          align: 'center'
        },
        {
          label: '就诊日期',
          prop: 'caseTime',
          width: '140',
          align: 'center'
        },
        {
          label: '就诊金额(元)',
          prop: 'money',
          width: '110',
          align: 'center'
        }
      ],
      AddCaseDialog: false,
      // 新增病例；
      addCaseHistory: {
        userId: '',
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
      },
      rowEditCase: ''
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    // 病例列表
    async loadList () {
      this.loading = true
      this.page_loading = true
      if (this.$route.params.CaseInfo) {
        const { id } = this.$route.params.CaseInfo
        this.CaseInfo.userId = id
      }
      const { data } = await getCaseHistory(this.CaseInfo)
      if (data.success) {
        this.CaseHistory = data.data.data
        this.total_count = data.data.total
        this.page_loading = false
        this.loading = false
      }
    },

    // 查看当前页；
    onPageChange (page) {
      this.CaseInfo.pageIndex = page
      // 加载列表数据
      this.loadList(this.CaseInfo)
    },

    // 编辑；
    onEdit (data) {
      this.rowEditCase = { ...data }
      this.AddCaseDialog = true
    },

    // 删除：
    onDelete (row) {
      this.$confirm(`
      此操作不可恢复！会同时删除${row.readlname}的当前病例和账单, 真的要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await postDeleteCase(row.id)
        if (data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        }
      }).catch(() => {})
    },

    // 关闭Dialog
    closeDialogCase () {
      this.AddCaseDialog = false
      // 清空表单
      this.addCaseHistory = { doctor: '王建设' }
      // 重置效验
      this.$refs['addCaseForm'].clearValidate()
    },

    // 修改病例
    OnSaveAddCase (type) {
      if (type) {
        this.$refs['addCaseForm'].validate(async (valid) => {
          if (!valid) {
            this.$message({
              message: '* 号为必填项，请重新输入',
              type: 'warning'
            })
            return
          }
          // 效验成功关闭对话框；
          this.AddCaseDialog = false
          try {
            const { id, symptom, program, remark } = this.rowEditCase
            const params = {
              id,
              symptom,
              program,
              remark
            }
            const { data } = await postEditCase(params)
            if (data.success) {
              this.$message({
                message: '恭喜你，修改成功',
                type: 'success'
              })
              this.loadList()
            } else {
              this.$message.error('修改失败')
            }
          } catch (error) {
            this.$message.error('修改失败')
          }
          // 清空表单
          this.addCaseHistory = { doctor: '王建设' }
          // 重置效验
          this.$refs['addCaseForm'].clearValidate()
        })
      } else {
        // 效验成功关闭对话框；
        this.AddCaseDialog = false
        // 清空表单
        this.addCaseHistory = { doctor: '王建设' }
        // 重置效验
        this.$refs['addCaseForm'].clearValidate()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.laypage {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>

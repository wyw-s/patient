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
        <el-table-column
          prop="doctor"
          label="医生"
          width="100"
          align="center"
        ></el-table-column>
         <el-table-column
          prop="caseTime"
          label="就诊日期"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="money"
          label="就诊金额"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="订单备注"
          width="160"
          align="center"
        >
        </el-table-column>
      </el-table>
      <div class="laypage">
        <el-pagination
            :current-page="CaseInfo.pageIndex"
            @current-change="onPageChange"
            :disabled ="page_loading"
            background
            layout="prev, pager, next, total"
            :total="total_count">
        </el-pagination>
      </div>
  </el-card>
 </div>
</template>

<script>
import { getCaseHistory } from '@/utils/api.js'
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
      loading: false
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
      } else {
        this.$notify({
          title: '提示',
          message: data.errorMessage.message,
          duration: 0,
          type: 'warning'
        })
        this.page_loading = false
        this.loading = false
      }
    },

    // 查看当前页；
    onPageChange (page) {
      this.CaseInfo.pageIndex = page
      // 加载列表数据
      this.loadList(this.CaseInfo)
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

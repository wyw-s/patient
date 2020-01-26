<template>
 <div>
  <el-card>
    <div style="margin-bottom: 20px">病历管理</div>
     <el-table
        :data="CaseHistory"
        border=""
        style="width: 100%"
      >
        <el-table-column
          prop="readlname"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="symptom"
          label="症状"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="program"
          label="治疗方案"
        ></el-table-column>
        <el-table-column
          prop="doctor"
          label="医生"
          width="150"
        ></el-table-column>
         <el-table-column
          prop="caseTime"
          label="就诊日期"
          width="150"
        >
        </el-table-column>
         <el-table-column
          prop="operation "
          label="操作"
          width="160"
        >
        <el-button
          disabled
          size="small"
          type="success"
        >编辑</el-button>
         <!-- <el-button
          size="small"
          type="danger"
          @click="onDelete"
        >删除</el-button>-->
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
      page_loading: false
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    // 病例列表
    async loadList () {
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

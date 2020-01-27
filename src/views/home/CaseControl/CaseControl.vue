<template>
  <div>
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix head">
        <div>
          <el-button @click="openDialog('ADD')">新增患者</el-button>
          <!-- dialog 组件 -->
          <el-dialog
            :before-close="closeDialogPatient"
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
              <el-form-item label="姓名" prop="readlname">
                <el-input v-model="addCaseInfo.readlname"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="addCaseInfo.age"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-select
                  v-model="addCaseInfo.gender"
                  placeholder="请选择"
                  style="width: 100%"
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
                <el-input v-model="addCaseInfo.phone"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="addCaseInfo.address"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="OnCancelInfo">取 消</el-button>
                <el-button type="primary" @click="OnSaveInfo">保 存</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 查询 -->
        <div>
          <el-form :inline="true" :model="formValue" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formValue.phone" placeholder="根据手机号查询患者"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formValue.readlname" placeholder="根据姓名模糊查询患者"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="margin-bottom: 20px">患者列表</div>
      <!-- 表格组件 -->
      <el-table
        v-loading="loading"
        :data="DataList"
        border=""
        style="width: 100%"
        element-loading-text="拼命加载中..."
        highlight-current-row
      >
        <el-table-column align="center" prop="readlname" label="姓名" width="180"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号" width="180"></el-table-column>
        <el-table-column align="center" prop="createTime" label="日期" width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" prop="historyCase" label="病例操作" width="250">
          <template slot-scope="scope">
            <el-button @click="OnnewAddSase(scope.row)" size="small">新增病例</el-button>
            <el-button @click="OnReview(scope.row)" size="small">查看以往病例</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="operation " label="操作" width="130">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="onEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="laypage">
        <el-pagination
            :current-page="formValue.pageIndex"
            @current-change="onPageChange"
            :disabled ="page_loading"
            background
            layout="prev, pager, next, total"
            :total="total_count">
        </el-pagination>
      </div>
      <!-- 对话框 -->
      <el-dialog
        :before-close="closeDialogCase"
        title="新增病例"
        :visible.sync="AddCaseDialog"
        :close-on-click-modal="false"
         width="40%"
        center
        modal
      >
        <!-- 表单 -->
        <el-form
          :model="addCaseHistory"
          :rules="addCaseRules"
          ref="addCaseForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="症状" prop="symptom">
            <el-input type="textarea" v-model="addCaseHistory.symptom"></el-input>
          </el-form-item>
          <el-form-item label="治疗方案" prop="program">
            <el-input type="textarea" v-model="addCaseHistory.program"></el-input>
          </el-form-item>
          <el-form-item label="医生" prop="doctor">
            <el-input v-model="addCaseHistory.doctor"></el-input>
          </el-form-item>
          <el-form-item label="就诊日期" prop="caseTime">
            <el-input v-model="addCaseHistory.caseTime"></el-input>
          </el-form-item>
          <el-form-item label="消费金额(元)" prop="account">
            <el-input v-model="addCaseHistory.account"></el-input>
          </el-form-item>
          <el-form-item label="订单备注" prop="remark">
            <el-input v-model="addCaseHistory.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="OnSaveAddCase(false)">取 消</el-button>
          <el-button type="primary" @click="OnSaveAddCase(true)">保 存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script src="./CaseControl.js"></script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  .head {
    display: flex;
    justify-content: space-between;
    > div:first-child {
      .el-button--default {
        margin-right: 10px;
      }
    }
    > div:last-child {
      .el-form-item {
        margin: 0 10px;
      }
    }
  }
  .laypage {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

import {
  queryPatient,
  addPatient,
  updateMessage,
  postaddCase
} from '@/utils/api.js'
import moment from 'moment'
export default {
  name: 'case_control',
  data () {
    return {
      // 列表查询
      formValue: {
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
        // gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        // phone: [
        //   {
        //     required: true,
        //     message: '请输入手机号',
        //     trigger: 'blur'
        //   },
        //   {
        //     pattern: /^1[3456789]\d{9}$/,
        //     message: '请正确输入手机号',
        //     trigger: 'blur'
        //   }
        // ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      },
      addCaseRules: {
        symptom: [{ required: true, message: '请输入症状', trigger: 'blur' }],
        program: [{ required: true, message: '请输入治疗方案', trigger: 'blur' }],
        readlname: [{ required: true, message: '请输入症状', trigger: 'blur' }],
        doctor: [{ required: true, message: '请输入诊治医师', trigger: 'blur' }],
        caseTime: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        account: [{ required: true, message: '请输入金额', trigger: 'blur' }]
      }
    }
  },
  components: {},
  watch: {
    formValue: {
      handler (type) {
        if ((type.phone === '' ||
        type.phone === null) &&
        (type.readlname === '' ||
        type.readlname === null)) {
          // 加载列表数据
          const newformValue = this.formValue
          newformValue.phone = null
          newformValue.readlname = null
          this.loadList(newformValue)
        }
      },
      deep: true
    }
  },

  created () {
    // 加载列表数据
    this.loadList(this.formValue)
  },
  methods: {
    // 加载列表信息
    async loadList (formValue) {
      this.loading = true
      this.page_loading = true
      const { data } = await queryPatient(formValue)
      if (data.success) {
        this.loading = false
        this.page_loading = false
        this.DataList = data.data.data
        this.total_count = data.data.total
      } else {
        this.$notify({
          title: '提示',
          message: data.errorMessage.message,
          duration: 0,
          type: 'warning'
        })
        this.loading = false
        this.page_loading = false
      }
    },

    // 查询
    async onQuery () {
      this.loading = true
      this.page_loading = true
      this.formValue.pageIndex = 1
      const { data } = await queryPatient(this.formValue)
      if (!data.success) return
      this.loading = false
      this.page_loading = false
      this.DataList = data.data.data
      this.total_count = data.data.total
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

    // 关闭Dialog
    closeDialogCase () {
      this.AddCaseDialog = false
      // 清空表单
      this.addCaseHistory = { doctor: '王建设' }
      // 重置效验
      this.$refs['addCaseForm'].clearValidate()
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
    OnCancelInfo () {
      // 关闭对话框
      this.centerDialog = false
      // 清空表单
      this.addCaseInfo = {}
      // 重置效验
      this.$refs['addForm'].clearValidate()
    },

    // 保存患者信息；
    OnSaveInfo () {
      this.$refs['addForm'].validate(async (valid) => {
        if (!valid) return
        // 关闭对话框
        this.centerDialog = false
        const { readlname, age, gender, phone, address } = this.addCaseInfo
        const newAddCaseInfo = this.addCaseInfo
        // 非空判断；
        if (!(readlname.trim() && age.toString().trim() && phone.trim() && address.trim())) {
          this.$message({
            message: '请填写完整',
            type: 'warning'
          })
        }
        // 数据处理
        if (gender === 2) {
          newAddCaseInfo.gender = '女'
        } else if (gender === 1) {
          newAddCaseInfo.gender = '男'
        }
        if (this.TitleDialog === '新增患者') {
          // 请求响应
          const { data } = await addPatient(newAddCaseInfo)
          if (data.success) {
            this.$message({
              message: '恭喜你，保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('保存失败')
          }
        } else {
          // 请求响应；
          const { data } = await updateMessage(this.addCaseInfo)
          if (data.success) {
            this.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改失败')
          }
        }
        // 清空表单
        this.addCaseInfo = {}
        // 重置效验
        this.$refs['addForm'].clearValidate()
        // 刷新列表信息
        this.loadList(this.formValue)
      })
    },

    // 新增病例；
    OnnewAddSase (id) {
      this.addCaseHistory.caseTime = `${moment(new Date()).format('YYYY-MM-DD')}`
      this.AddCaseDialog = true
      this.addCaseHistory.userId = id.id
    },

    // 保存新增病例
    OnSaveAddCase (type) {
      if (type) {
        this.$refs['addCaseForm'].validate(async (valid) => {
          if (!valid) return
          // 效验成功关闭对话框；
          this.AddCaseDialog = false
          const { data } = await postaddCase(this.addCaseHistory)
          if (data.success) {
            this.$message({
              message: '恭喜你，保存成功',
              type: 'success'
            })
            this.$router.push({
              name: 'CaseHistory',
              params: {
                CaseInfo: this.addCaseHistory
              }
            })
            // EventBus.$emit('NewAddCase', )
          } else {
            this.$message.error('保存失败')
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
    },

    // 复查；
    OnReview (data) {
      this.$router.push({
        name: 'CaseHistory',
        params: {
          CaseInfo: data
        }
      })
    },

    // 编辑；
    onEdit (data) {
      // 用对象的展开解决对象的拷贝问题
      this.addCaseInfo = { ...data }
      this.openDialog()
    },

    // 查看当前页；
    onPageChange (page) {
      this.formValue.pageIndex = page
      // 加载列表数据
      this.loadList(this.formValue)
    }
  }
}

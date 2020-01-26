<template>
 <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix head">
      视图分析
    </div>
    <div id="MyEchartsMonth"></div>
    <div id="MyEchartsMoney"></div>
    </el-card>
 </div>
</template>

<script>
import echarts from 'echarts'
import { getMonthNumber, getmonthMoney } from '@/utils/api.js'
export default {
  name: 'statistics',
  data () {
    return {
      // 就诊人数
      personData: [],
      monthPerson: [],

      // 当月金额
      everyMonth: [],
      monthMoneyData: []
    }
  },
  created () {
    this.monthNumber()
    this.monthMoney()
  },
  methods: {
    // 当月人数
    async monthNumber () {
      const { data } = await getMonthNumber()
      if (!data.success) return
      data.data.forEach((item) => {
        this.personData.push(item.t2)
        this.monthPerson.push(item.t1)
      })
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById('MyEchartsMonth'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['当月的就诊人数']
          },
          xAxis: [
            {
              type: 'category',
              data: this.monthPerson,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '人数',
              min: 0,
              max: 150,
              interval: 25,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '当月的就诊人数',
              type: 'bar',
              data: this.personData
            }
          ]
        }
        myChart.setOption(option)
      })
    },

    // 当月金额；
    async monthMoney () {
      const { data } = await getmonthMoney()
      if (!data.success) return
      data.data.forEach((item) => {
        this.everyMonth.push(item.t1)
        this.monthMoneyData.push(item.t2)
      })
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById('MyEchartsMoney'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['当月的账单总额']
          },
          xAxis: [
            {
              type: 'category',
              data: this.everyMonth,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              min: 0,
              max: 10000,
              interval: 2000,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '当月的账单总额',
              type: 'bar',
              data: this.monthMoneyData
            }
          ]
        }
        myChart.setOption(option)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #MyEchartsMonth {
    height: 500px;
    border-bottom: 2px solid #ccc
  }
  #MyEchartsMoney {
    height: 500px;
    margin-top: 20px
  }
</style>

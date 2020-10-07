<template>
  <el-card shadow="never" header="视图分析">
    <div class="cakeView m-b">
      <el-card shadow="hover" class="m-r">
        <div id="cakeViewOne"></div>
      </el-card>
      <el-card shadow="hover" class="m-r">
        <div id="cakeViewTwo"></div>
      </el-card>
      <el-card shadow="hover">
        <div id="cakeViewThree"></div>
      </el-card>
    </div>
    <div class="cakeView m-b">
      <el-card shadow="hover" class="m-r">
        <div id="MyEchartsMonth"></div>
      </el-card>
      <el-card shadow="hover" style="flex: 40%" header="统计">
        <el-table
          :data="tableDataPerson"
          border
          show-summary
          style="width: 100%">
          <el-table-column
            align="center"
            prop="month"
            label="月份"
            width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="num"
            label="人数">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="cakeView m-b">
      <el-card shadow="hover" class="m-r">
        <div id="MyEchartsMoney"></div>
      </el-card>
      <el-card shadow="hover" style="flex: 40%" header="统计">
        <el-table
          :data="tableDataMoney"
          border
          show-summary
          style="width: 100%">
          <el-table-column
            align="center"
            prop="month"
            label="月份"
            width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="money"
            label="金额(元)">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-card shadow="hover" class="m-b">
      <div id="MoneyOrPerson"></div>
    </el-card>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'statistics',
  data () {
    return {
      // 就诊人数
      personData: [],
      monthPerson: [],
      // 当月金额
      everyMonth: [],
      monthMoneyData: [],
      tableDataPerson: [],
      tableDataMoney: [],
      bigNum: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
      ageGroup: ['20~29', '30~39', '40~49', '50~59', '60~69', '70~79', '80以上']
    }
  },
  created () {
    this.monthNumber()
    this.monthMoney()
    this.genderView()
    this.ageViewMan()
    this.ageViewWoman()
  },
  methods: {
    // 性别分析
    genderView () {
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('cakeViewOne'))
        let option = {
          title: {
            text: '性别分析',
            subtext: '仅作参考',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['男', '女']
          },
          series: [
            {
              name: '来源',
              type: 'pie',
              radius: '45%',
              center: ['50%', '65%'],
              data: [
                { value: 335, name: '男' },
                { value: 310, name: '女' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myChart.setOption(option)
      })
    },
    // 年龄分析
    ageViewMan () {
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('cakeViewTwo'))
        let option = {
          title: {
            text: '年龄分析(男)',
            subtext: '仅作参考',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.ageGroup,
            itemWidth: 20,
            itemHeight: 10,
            itemGap: 3
          },
          series: [
            {
              name: '来源',
              type: 'pie',
              radius: '45%',
              center: ['50%', '65%'],
              data: [
                { value: 335, name: '20~29' },
                { value: 310, name: '30~39' },
                { value: 310, name: '40~49' },
                { value: 310, name: '50~59' },
                { value: 310, name: '60~69' },
                { value: 310, name: '70~79' },
                { value: 310, name: '80以上' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myChart.setOption(option)
      })
    },
    ageViewWoman () {
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('cakeViewThree'))
        let option = {
          title: {
            text: '年龄分析(女)',
            subtext: '仅作参考',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.ageGroup,
            itemWidth: 20,
            itemHeight: 10,
            itemGap: 3
          },
          series: [
            {
              name: '来源',
              type: 'pie',
              radius: '45%',
              center: ['50%', '65%'],
              data: [
                { value: 335, name: '20~29' },
                { value: 310, name: '30~39' },
                { value: 310, name: '40~49' },
                { value: 310, name: '50~59' },
                { value: 310, name: '60~69' },
                { value: 310, name: '70~79' },
                { value: 310, name: '80以上' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myChart.setOption(option)
      })
    },
    // 当月人数
    monthNumber () {
      this.$store.dispatch('getMonthNumber').then(res => {
        if (!res.success) return
        res.data.forEach((item, index) => {
          this.personData.push(item.t2)
          this.monthPerson.push(item.t1)
          this.tableDataPerson.push({
            month: this.bigNum[index],
            num: item.t2
          })
        })
        this.moneyOrPerson()
        this.$nextTick(() => {
          const myChart = echarts.init(document.getElementById('MyEchartsMonth'))
          let option = {
            title: {
              text: '图1：当年每个月的就诊人数',
              x: 'center',
              y: 'bottom'
            },
            color: ['#61a0a8'],
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
                minInterval: 1,
                boundaryGap: [ 0, 0.2 ],
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
      })
    },

    // 当月金额；
    monthMoney () {
      this.$store.dispatch('getmonthMoney').then(res => {
        if (!res.success) return
        res.data.forEach((item, index) => {
          this.everyMonth.push(item.t1)
          this.monthMoneyData.push(item.t2)
          this.tableDataMoney.push({
            month: this.bigNum[index],
            money: item.t2
          })
        })
        this.moneyOrPerson()
        this.$nextTick(() => {
          const myChart = echarts.init(document.getElementById('MyEchartsMoney'))
          let option = {
            title: {
              text: '图标2：当年每个月的账单总额',
              x: 'center',
              y: 'bottom'
            },
            color: ['#37a2da'],
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
                minInterval: 1,
                boundaryGap: [ 0, 0.1 ],
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
      })
    },

    // 金额和人数
    moneyOrPerson () {
      this.$nextTick(() => {
        const myChart = echarts.init(document.getElementById('MoneyOrPerson'))
        const colors = ['#5793f3', '#d14a61', '#675bba']
        let option = {
          title: {
            text: '图3：当年每个月的就诊人数和金额',
            x: 'center',
            y: 'bottom'
          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['就诊人数', '就诊金额', '人均金额']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: this.everyMonth
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '就诊人数',
              minInterval: 1,
              boundaryGap: [0, 0.1],
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '就诊金额',
              minInterval: 1,
              boundaryGap: [0, 0.1],
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value} 元'
              }
            },
            {
              type: 'value',
              name: '人均金额',
              minInterval: 1,
              boundaryGap: [0, 0.1],
              position: 'right',
              offset: 80,
              axisLine: {
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value} 元/人'
              },
              minorTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '就诊人数',
              type: 'bar',
              data: this.personData
            },
            {
              name: '就诊金额',
              type: 'bar',
              yAxisIndex: 1,
              data: this.monthMoneyData
            },
            {
              name: '人均金额',
              type: 'line',
              yAxisIndex: 2,
              data: this.monthMoneyData.map((item, index) => {
                return item / this.personData[index] && (item / this.personData[index]).toFixed(2)
              })
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
  }
  #MyEchartsMoney {
    height: 500px;
  }
  #MoneyOrPerson {
    height: 500px;
  }
  .m-b {
    margin-bottom: 20px;
  }
  .m-r {
    margin-right: 20px;
  }
  .cakeView {
    display: flex;
  }
  #cakeViewOne,
  #cakeViewTwo,
  #cakeViewThree {
    height: 300px;
    width: 300px;
  }
  /deep/ .el-table .el-table__body-wrapper td {
    padding: 4px 0;
  }
</style>

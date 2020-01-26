<template>
<!-- 一级路由容器 -->
    <router-view/>
</template>

<style lang="less">
 /* 解决element-ui的table表格控件表头与内容列不对齐问题 */
  .el-table th.gutter{
    display: table-cell!important;
  }
</style>

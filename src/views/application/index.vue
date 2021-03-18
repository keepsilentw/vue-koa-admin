<template>
  <div class="application-page">
    <el-form :inline="true" class="search-form" :model="searchForm">
      <el-form-item label="应用名">
        <el-input v-model="searchForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form>
    <el-table border stripe v-loading="listLoading" :data="list" element-loading-text="Loading">
      <el-table-column label="应用名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="应用说明" align="center">
        <template slot-scope="scope">
          {{ scope.row.description || '--' }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status ? '生效中' : '已失效' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.update_time | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination background layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :total="totalCount"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getApplicationList } from '@/service'

export default {
  name: 'application',
  data() {
    return {
      pageIndex: 1,
      pageSize: 8,
      totalCount: 0,
      list: null,
      listLoading: true,
      searchForm: {
        name: ''
      }
    }
  },
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'gray'
    }
  },
  created() {
    this.initList()
  },
  methods: {
    initList() {
      this.listLoading = true
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        ...this.searchForm
      }
      getApplicationList(params).then(res => {
        this.list = res.data.data
        this.totalCount = res.data.totalCount
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.initList()
    },
    search() {
      this.initList()
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

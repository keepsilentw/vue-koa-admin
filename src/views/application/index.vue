<template>
  <div class="application-page">
    <el-form :inline="true" class="search-form" :model="searchForm">
      <el-form-item label="应用名">
        <el-input v-model="searchForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="add">新增</el-button>
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
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog title="编辑应用" :visible.sync="editDialogVisible">
      <el-form :model="editAppForm" ref="editAppForm" label-width="120px">
        <el-form-item label="应用名" prop="name"
          :rules = "[
            { required: true, message: '请输入应用名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="editAppForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer align-center">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAppSave('editAppForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增应用" :visible.sync="addDialogVisible">
      <el-form :model="addAppForm" ref="addAppForm" label-width="120px">
        <el-form-item label="应用名" prop="name"
          :rules = "[
            { required: true, message: '请输入应用名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="addAppForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer align-center">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAppSave('addAppForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAppList, addApp, updateApp, deleteApp } from '@/service/application'

export default {
  name: 'application-list',
  data() {
    return {
      pageIndex: 1,
      pageSize: 8,
      totalCount: 0,
      list: null,
      listLoading: true,
      searchForm: {
        name: ''
      },
      editDialogVisible: false,
      editAppForm: {
        name: ''
      },
      addDialogVisible: false,
      addAppForm: {
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
      getAppList(params).then(res => {
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
      this.editAppForm = { ...row }
      this.editDialogVisible = true
    },
    editAppSave(editAppForm) {
      this.$refs[editAppForm].validate((valid) => {
        if (valid) {
          updateApp(this.editAppForm).then(res => {
            if (res.data === true) {
              this.$message.success('修改成功！')
              this.editDialogVisible = false
              this.initList()
            } else {
              this.$message.error(res.message || '修改失败！')
            }
          })
        } else {
          this.$message.warning('请检查输入！')
          return false
        }
      })
    },
    add() {
      this.addDialogVisible = true
    },
    addAppSave(addAppForm) {
      this.$refs[addAppForm].validate((valid) => {
        if (valid) {
          addApp(this.addAppForm).then(res => {
            if (res.data === true) {
              this.$message.success('新增成功！')
              this.addDialogVisible = false
              this.initList()
            } else {
              this.$message.error(res.message || '新增失败！')
            }
          })
        } else {
          this.$message.warning('请检查输入！')
          return false
        }
      })
    },
    handleDelete(row) {
      this.$confirm(`确认删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApp({ id: row.id }).then(res => {
          if (res.data === true) {
            this.$message.success('删除成功!')
            this.initList()
          } else {
            this.$message.error(res.message || '删除失败！')
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
</style>

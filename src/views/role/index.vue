<template>
  <div class="role-page">
    <el-form :inline="true" class="search-form" :model="searchForm">
      <el-form-item label="角色名">
        <el-input v-model="searchForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="add">新增</el-button>
    </el-form>
    <el-table border stripe v-loading="listLoading" :data="list" element-loading-text="Loading" highlight-current-row>
      <el-table-column label="角色名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
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
    <el-dialog title="编辑角色" :visible.sync="editDialogVisible">
      <el-form :model="editRoleForm" ref="editRoleForm" label-width="120px">
        <el-form-item label="角色名" prop="name"
          :rules = "[
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="editRoleForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer align-center">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleSave('editRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增角色" :visible.sync="addDialogVisible">
      <el-form :model="addRoleForm" ref="addRoleForm" label-width="120px">
        <el-form-item label="角色名" prop="name"
          :rules = "[
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="addRoleForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer align-center">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSave('addRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, updateRole, deleteRole } from '@/service/role'

export default {
  name: 'role-list',
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
      editRoleForm: {
        name: ''
      },
      addDialogVisible: false,
      addRoleForm: {
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
      getRoleList(params).then(res => {
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
      this.editRoleForm = { ...row }
      this.editDialogVisible = true
    },
    editRoleSave(editRoleForm) {
      this.$refs[editRoleForm].validate((valid) => {
        if (valid) {
          updateRole(this.editRoleForm).then(res => {
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
    addRoleSave(addRoleForm) {
      this.$refs[addRoleForm].validate((valid) => {
        if (valid) {
          addRole(this.addRoleForm).then(res => {
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
        deleteRole({ id: row.id }).then(res => {
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

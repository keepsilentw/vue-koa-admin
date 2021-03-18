<template>
  <div class="user-list-page">
    <el-form :inline="true" class="search-form" :model="searchForm">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="add">新增</el-button>
    </el-form>
    <el-table border stripe v-loading="listLoading" :data="list" element-loading-text="Loading">
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          {{ scope.row.department }}
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
    <el-dialog title="编辑人员" :visible.sync="editDialogVisible">
      <el-form :model="editUserForm" ref="editUserForm" label-width="120px">
        <el-form-item label="姓名" prop="name"
          :rules = "[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="editUserForm.department" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer align-center">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSave('editUserForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增人员" :visible.sync="addDialogVisible">
      <el-form :model="addUserForm" ref="addUserForm" label-width="120px">
        <el-form-item label="姓名" prop="name"
          :rules = "[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="addUserForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department"
          :rules = "[
            { required: true, message: '请输入部门', trigger: 'blur' }
          ]"
        >
          <el-input v-model="addUserForm.department" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer align-center">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSave('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, updateUser, deleteUser } from '@/service/user'

export default {
  name: 'user-list',
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
      editUserForm: {
        name: '',
        email: '',
        department: ''
      },
      addDialogVisible: false,
      addUserForm: {
        name: '',
        email: '',
        department: ''
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
      getUserList(params).then(res => {
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
      this.editUserForm = { ...row }
      this.editDialogVisible = true
    },
    editUserSave(editUserForm) {
      this.$refs[editUserForm].validate((valid) => {
        if (valid) {
          updateUser(this.editUserForm).then(res => {
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
    addUserSave(addUserForm) {
      this.$refs[addUserForm].validate((valid) => {
        if (valid) {
          addUser(this.addUserForm).then(res => {
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
        deleteUser({ id: row.id }).then(res => {
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

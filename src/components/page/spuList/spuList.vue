<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-qrcode"></i> 商品SPU
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-lx-add" @click="handleAdd">新增</el-button>

        <el-button
          type="danger"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>

        <el-input v-model="query.q" clearable placeholder="请输入ID或商品名称查询" class="handle-input mr10" @keyup.enter.native="handleSearch"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="category1" label="一级分类" align="center"></el-table-column>
        <el-table-column prop="category2" label="二级分类" align="center"></el-table-column>
        <el-table-column prop="category3" label="三级分类" align="center"></el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            {{timeFormat(scope.row.update_time)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-lx-add"
              @click="handleSkuAdd(scope.$index, scope.row)"
            >新增SKU</el-button>
            <el-button
              type="text"
              icon="el-icon-lx-add"
              @click="handleSpeAdd(scope.$index, scope.row)"
            >新增规格</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page"
          :page-size="query.page_size"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import { SpuList,SpudelDetails,skuSearchspuList} from '../../../api/index';
  export default {
    name: 'spu',
    data() {
      return {
        query: {
          page: 1,
          page_size: 10,
          q:''
        },
        tableData: [],
        multipleSelection: [],
        delList: [],
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1
      };
    },
    created() {
      this.getData();
    },
    activated(){
      this.getData();
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        SpuList(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results;
          this.pageTotal = res.data.count;
        }).catch(error=>{
          console.log(error)
          if (error.response !== undefined) {
            switch (error.response.status) {
              case 500:
                this.$message.error('服务器错误')
                break
              case 401:
                this.$message.error('登录过期，请重新登录')
                localStorage.removeItem('ms_userInfo')
                break
              case 403:
                this.$message.error('您没有执行该操作的权限')
                break
              default:
                this.$message.error('其他错误')
                break
            }
          }
        });
      },

      // 时间转换
      timeFormat(timestamp){
        //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        return year+'-'+month+'-'+date+' '+hours+':'+minutes;
      },

      getSearchData(){
        skuSearchspuList(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results;
          this.pageTotal = res.data.count;
        }).catch(error=>{
          if (error.response !== undefined) {
            switch (error.response.status) {
              case 500:
                this.$message.error('服务器错误')
                break
              case 401:
                this.$message.error('登录过期，请重新登录')
                localStorage.removeItem('ms_userInfo')
                break
              case 403:
                this.$message.error('您没有执行该操作的权限')
                break
              default:
                this.$message.error('其他错误')
                break
            }
          }
        });
      },

      // 触发搜索按钮
      handleSearch() {
        console.log(this.query.q)
        if(this.query.q === ''){
          this.getData()
        }else{
          this.getSearchData()
        }

      },
      // 删除操作
      handleDelete(index, row) {
        console.log(index, row)
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            SpudelDetails(row.id).then(res => {
              console.log(res)
              this.$message.success('删除成功');
              this.tableData.splice(index, 1);
              this.getData()
            });
          })
          .catch(() => {});
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delAllSelection() {
        this.delList = this.delList.concat(this.multipleSelection);
        this.delList.forEach(ele=>{
          SpudelDetails(ele.id).then(res => {
            console.log(res)
            this.getData()
          });
        })
        this.$message.success('删除成功');
      },

      handleSkuAdd(index,row){
        this.$router.push({name:'skuDetails',query:{skuId:JSON.stringify(row.id)}})
      },
      handleSpeAdd(index,row){
        this.$router.push({name:'specificationList',query:{spuId:JSON.stringify(row.id)}})
      },
      handleAdd(){
        this.$router.push({name:'spuDetails',query:{data:JSON.stringify('')}})
      },
      // 编辑操作
      handleEdit(index, row) {
        this.$router.push({name:'spuDetails',query:{data:JSON.stringify(row)}})
      },
      // 保存编辑
      saveEdit() {
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.tableData, this.idx, this.form);
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'page', val);
        if(this.query.q === ''){
          this.getData()
        }else{
          this.getSearchData()
        }
      }
    }
  };
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>

<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-text"></i> 商品SKU
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="danger"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-input v-model="query.q" clearable placeholder="请输入ID或商品名称查询" class="handle-input mr10"  @keyup.enter.native="handleSearch"></el-input>
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
        <el-table-column prop="price" label="商城售价" align="center"></el-table-column>
        <el-table-column prop="cost_price" label="天津供货价" align="center"></el-table-column>
        <el-table-column prop="market_price" label="市场价" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-lx-add"
              @click="handleAdd(scope.$index, scope.row)"
            >新增绑定规格</el-button>
            <el-button
              type="text"
              icon="el-icon-lx-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-lx-delete"
              class="red"
              @click="handleDel(scope.$index, scope.row)"
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
  import { SkuList,SkudelDetails,skuSearchskuList} from '../../../api/index';
  export default {
    data() {
      return {
        query: {
          page: 1,
          page_size: 10,
          ordering:'-create_time',
          q:''
        },
        delList: [],
        multipleSelection:[],
        addFrom:{},
        tableData: [],
        pageTotal: 0,
      };
    },
    created() {
      console.log(JSON.parse(localStorage.getItem("ms_userInfo")).data.token)
      this.getData();
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        SkuList(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results;
          if(this.tableData.length === 0){
            this.$message.success('数据为空')
          }
          this.pageTotal = res.data.count
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

      getSearchData(){
        skuSearchskuList(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results;
          if(this.tableData.length === 0){
            this.$message.success('数据为空')
          }
          this.pageTotal = res.data.count
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

      // 绑定规格选项
      handleAdd(index, row){
        this.$router.push({name:'bindSpecificationValueList',query:{skuId:JSON.stringify(row.id),spuId:JSON.stringify(row.goods)}})
      },

      // 编辑操作
      handleEdit(index, row){
        console.log(row)
        this.$router.push('/skuDetails?id='+row.id)
      },

      handleSearch(){
        if(this.query.q === ''){
          this.getData()
        }else{
          this.getSearchData()

        }

      },

      // 删除操作
      handleDel(index, row){
        console.log(index, row)
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            SkudelDetails(row.id).then(res=>{
              this.tableData.splice(index, 1);
              this.$message.success('删除成功');
              this.getData()
            })
          })
          .catch(() => {
            this.$message.error('服务器错误');
          });
      },

      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delAllSelection() {
        this.delList = this.delList.concat(this.multipleSelection);
        console.log(this.delList)
        this.delList.forEach(ele=>{
          SkudelDetails(ele.id).then(res => {
            console.log(res)
            this.getData()
          });
        })
        this.$message.success('删除成功');
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    line-height: 100px;
    display: block;
  }

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

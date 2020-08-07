<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/spuList"><i class="el-icon-lx-text"></i> 商品SPU</el-breadcrumb-item>
        <el-breadcrumb-item>规格</el-breadcrumb-item>
        <el-breadcrumb-item>规格选项</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-lx-add" @click="handleAdd">新增选项</el-button>
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
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="value" label="规格名称" align="center"></el-table-column>
        <!--<el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>-->
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
  import { spuSpecification,spuSpecificationList} from '../../../api/index';
  export default {
    name: 'spu',
    data() {
      return {
        query: {
          page: 1,
          page_size: 10
        },
        tableData: [],
        spuId:null,
        multipleSelection: [],
        delList: [],
        pageTotal: 0,
        form: {},
        idx: -1,
        id:null,
      };
    },
    created() {
      this.id = +this.$route.query.id
      this.getData();
    },
    activated(){
      this.id = +this.$route.query.id
      this.getData();
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        spuSpecificationList(this.id).then(res => {
          console.log(res);
          this.tableData = res.data;
          this.pageTotal = res.data.length;
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

      // 触发搜索按钮
      handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
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

      handleAdd(){
        this.$router.push({name:'specificationValueDetails',query:{id:JSON.stringify(this.id)}})
      },
      // 编辑操作
      handleEdit(index, row) {
        this.$router.push({name:'specificationDetails',query:{data:JSON.stringify(row)}})
      },
      // 保存编辑
      saveEdit() {
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.tableData, this.idx, this.form);
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'page', val);
        this.getData();
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

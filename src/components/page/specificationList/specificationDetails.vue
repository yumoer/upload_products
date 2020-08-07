<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/spuList"><i class="el-icon-lx-text"></i> 商品SPU</el-breadcrumb-item>
        <el-breadcrumb-item>新增规格</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="100px">
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="addFrom.name" style="width:350px" placeholder="请输入商品名称"></el-input>
        </el-form-item>
      </el-form>
      <el-form style="position: fixed;right:100px;bottom: 20px;z-index: 1">
        <el-form-item >
          <el-button class="editor-btn" type="primary" @click="submitForm()">{{data === ''?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {spuaddSpecification,SpuList,SkuaddDetails,SkueditDetails} from '../../../api/index'
  import axios from 'axios'
  export default {
    name: 'editor',
    data: function(){
      return {
        query: {
          page:1,
          page_size:99999,
        },
        addFrom:{},
        data:undefined,
        spuId:null,
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
        }
      }
    },
    created(){
      this.data = this.$route.query.data
      this.addFrom.spuId = this.$route.query.spuId
      console.log(this.data,this.spuId)
      this.getData()
    },
    activated(){
      this.data = this.$route.query.data
      this.addFrom.spuId = this.$route.query.spuId
      console.log(this.data,this.spuId)
      this.getData()
    },
    methods: {
      getData(){
        /*SkuDetails(this.data).then(res => {
          console.log(res);
          this.addFrom = res.data;
          this.fileList = [{url:this.addFrom.images[0].image1},{url:this.addFrom.images[0].image2},{url:this.addFrom.images[0].image3},{url:this.addFrom.images[0].image4},{url:this.addFrom.images[0].image5}]
          console.log(this.fileList)
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
        });*/
      },
      getAdd(){
        spuaddSpecification(this.addFrom).then(res => {
          console.log(res)
          if(res.status === 201){
            this.$message.success('保存成功')
            this.$router.go(-1)
          }
        });
      },
      submitForm(){
        console.log(this.addFrom.name)
        if(this.addFrom.name === '' || this.addFrom.name === undefined){
          this.$message.error('规格名称不能为空')
          return
        }
        if(this.data === ''){
          this.getEdit()
        }else{
          this.getAdd()
        }
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  .el-upload--picture-card{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100px;
    height: 100px;
  }

  .el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
  }
</style>
<style scoped>
  page{
    position: relative;
  }
  .editor-btn{
    margin-top: 20px;
  }
</style>

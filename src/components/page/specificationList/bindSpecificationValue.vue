<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/skuList"><i class="el-icon-lx-text"></i> 商品SKU</el-breadcrumb-item>
        <el-breadcrumb-item>规格选项</el-breadcrumb-item>
        <el-breadcrumb-item>{{data !== ''?'编辑':'新增'}}规格选项</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" label-width="100px">
        <el-form-item label="规格选项" prop="name">
          <el-select
            v-model="valueId"
            filterable
            allow-create
            default-first-option
            placeholder="请选择规格选项"
            @change="lookValue">
            <el-option-group
              v-for="group in options"
              :key="group.id"
              :label="group.name">
              <el-option
                v-for="item in group.specificationoption_set"
                :key="item.id"
                :label="item.value"
                :value="item.id"
                >
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form style="text-align: right;margin-right: 30px">
        <el-form-item >
          <el-button class="editor-btn" type="primary" @click="submitForm()">{{data !== ''?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {spuSpecification,skuSpecification,skuEditSpecification} from '../../../api/index'
  import axios from 'axios'
  export default {
    name: 'editor',
    data: function(){
      return {
        addFrom:{},
        tableData:[],
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
        },
        options: [],
        data:{},
        valueId:662,
      }
    },
    created(){
      this.spuId = this.$route.query.spuId
      this.addFrom.sku = +this.$route.query.skuId
      if(this.data !== {}){
        this.data = JSON.parse(this.$route.query.data)
        this.valueId = this.data.option_id
      }

      this.getData()
    },
    activated(){
      this.spuId = this.$route.query.spuId
      this.addFrom.sku = +this.$route.query.skuId
      if(this.data !== {}){
        this.data = JSON.parse(this.$route.query.data)
        this.valueId = this.data.option_id
        this.addFrom.id = this.data.id
      }
      this.getData()
    },
    methods: {
      getData(){
        spuSpecification(this.spuId).then(res => {
          console.log(res);
          this.options = res.data;
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

      lookValue(event){
        console.log(event)
        this.addFrom.option = event
      },
      submitForm(){
        this.addFrom.option = this.valueId
        if(this.valueId === null){
          this.$message.error('规格选项不能为空')
          return
        }
        if(this.data !== ''){
          skuEditSpecification(this.addFrom).then(res => {
            console.log(res);
            if(res.status === 200){
              this.$message.success('修改成功')
              this.$router.go(-1)
            }
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
        }else{
          skuSpecification(this.addFrom).then(res => {
            console.log(res);
            if(res.status === 201){
              this.$message.success('保存成功')
              this.$router.go(-1)
            }
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
        }


      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  .el-input{
    width: 300px;
  }
</style>

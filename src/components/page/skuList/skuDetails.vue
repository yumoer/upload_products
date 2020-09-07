<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/skuList"><i class="el-icon-lx-text"></i> 商品SKU</el-breadcrumb-item>
        <el-breadcrumb-item>{{id !== undefined ? '编辑' : '新增'}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addFrom.name" style="width:350px" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="addFrom.caption" style="width:350px" placeholder="请输入副标题"></el-input>
        </el-form-item>

        <el-form-item label="图片" prop="images" v-if="id">
          <span>图片上传最多5张，删除图片需要从后往前删,第一张不能删除</span>
          <div>
            <el-upload
              action="#"
              :limit="5"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              accept=".jpg, .jpeg, .png"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="handleChange"
              :before-upload="submitForm">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" v-if="fileList.length > 0">
              <img width="100%" v-if="addFrom.images[0].image1 !== ''" :src="addFrom.images[0].image1" alt="">
              <img width="100%" v-if="addFrom.images[0].image2 !== ''" :src="addFrom.images[0].image2" alt="">
              <img width="100%" v-if="addFrom.images[0].image3 !== ''" :src="addFrom.images[0].image3" alt="">
              <img width="100%" v-if="addFrom.images[0].image4 !== ''" :src="addFrom.images[0].image4" alt="">
              <img width="100%" v-if="addFrom.images[0].image5 !== ''" :src="addFrom.images[0].image5" alt="">
            </el-dialog>
          </div>
        </el-form-item>

        <el-form-item label="商城售价" prop="price">
          <el-input v-model="addFrom.price" style="width:350px" placeholder="请输入商城售价"></el-input>
        </el-form-item>
        <el-form-item label="天津供价" prop="cost_price">
          <el-input v-model="addFrom.cost_price" style="width:350px" placeholder="请输入天津供价"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="market_price">
          <el-input v-model="addFrom.market_price" style="width:350px" placeholder="请输入市场价"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="addFrom.stock" style="width:350px" placeholder="请输入库存"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model="addFrom.sales" style="width:350px" placeholder="请输入销量"></el-input>
        </el-form-item>
        <el-form-item label="评价数" prop="comments">
          <el-input v-model="addFrom.comments" style="width:350px" placeholder="请输入评价数"></el-input>
        </el-form-item>

        <el-form-item label="是否上架销售" prop="is_launched">
          <el-radio-group v-model="addFrom.is_launched">
            <el-radio :label="true" :value="true">是</el-radio>
            <el-radio :label="false" :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--<el-form-item label="默认图片" v-if="id !== undefined">
          <el-input disabled v-model="addFrom.default_image_url" style="width:350px" placeholder="请输入默认图片地址"></el-input>
        </el-form-item>-->
        <el-form-item label="延保服务">
          <el-input v-model="addFrom.yanbao" style="width:350px" placeholder="请输入延保服务"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="goods_model">
          <el-input v-model="addFrom.goods_model" style="width:350px" placeholder="请输入型号"></el-input>
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="addFrom.weight" style="width:350px" placeholder="请输入重量"></el-input>
        </el-form-item>
        <el-form-item label="产地">
          <el-input v-model="addFrom.product_area" style="width:350px" placeholder="请输入产地"></el-input>
        </el-form-item>
        <el-form-item label="条形码">
          <el-input v-model="addFrom.upc" style="width:350px" placeholder="请输入条形码"></el-input>
        </el-form-item>
        <el-form-item label="销售单位" prop="unit">
          <el-input v-model="addFrom.unit" style="width:350px" placeholder="请输入销售单位"></el-input>
        </el-form-item>

        <el-form-item label="是否促销产品" prop="sale_actives">
          <el-radio-group v-model="addFrom.sale_actives">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品类型" prop="genre">
          <el-select v-model="addFrom.genre" placeholder="请选择商品类型">
            <el-option label="配件" :value="0"></el-option>
            <el-option label="服务" :value="1"></el-option>
            <el-option label="商品" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格选项" prop="skuspecification_set" v-if="id">
          <el-checkbox-group v-model="checkedItems" disabled>
            <el-checkbox v-for="(item,index) in addFrom.skuspecification_set" :label="item.option" :key="index">{{item.option}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>


        <el-form-item label="规格详细参数" :prop="addFrom.spec_params" placeholder="请输入规格详细参数">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入规格详细参数"
            v-model="addFrom.spec_params">
          </el-input>
        </el-form-item>
        <el-form-item label="限制购买数量">
          <el-input v-model="addFrom.purchase_restriction" style="width:350px" placeholder="请输入限制购买数量"></el-input>
        </el-form-item>
        <el-form-item label="是否节能" prop="energy">
          <el-radio-group v-model="addFrom.energy">
            <el-radio :label="1" :value="1">是</el-radio>
            <el-radio :label="0" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否环保" prop="protection">
          <el-radio-group v-model="addFrom.protection">
            <el-radio :label="1" :value="1">是</el-radio>
            <el-radio :label="0" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否进口" prop="imported">
          <el-radio-group v-model="addFrom.imported">
            <el-radio :label="1" :value="1">是</el-radio>
            <el-radio :label="0" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="对接单位" prop="supply_unit">
          <el-select v-model="addFrom.supply_unit" placeholder="请选择商品类型">
            <el-option label="电商" :value="0"></el-option>
            <el-option label="天津" :value="1"></el-option>
            <el-option label="央采" :value="2"></el-option>
          </el-select>
        </el-form-item>


        <!--<el-form-item label="所属单位" prop="source">
          <el-input v-model="addFrom.source" style="width:350px" placeholder="请输入所属单位"></el-input>
        </el-form-item>-->
      </el-form>
      <el-form style="text-align: right;margin-right: 30px">
        <el-form-item >
          <el-button class="editor-btn" type="primary" @click="submitForm()">{{id !== undefined?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {SkuDetails,SpuList,SkuaddDetails,SkueditDetails,skuDelImage} from '../../../api/index'
  import axios from 'axios'
  export default {
    name: 'editor',
    data: function(){
      return {
        query: {
          page:1,
          page_size:99999,
          ordering:'-create_time',
        },
        Headers: {
          Authorization: 'JWT ' + JSON.parse(localStorage.getItem('ms_userInfo')).data.token,
        },
        checkedItems:[],
        value:'',
        dialogVisible: false,
        fileList: [],
        api:'',
        url:'',
        tableData:[],
        addFrom:{},
        id:null,
        skuId:null,
        image1:'',
        image2:'',
        image3:'',
        image4:'',
        image5:'',
        addImage:{},
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          images: [
            { required: true, message: '请至少上传一张图片', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入商城售价', trigger: 'blur' }
          ],
          market_price: [
            { required: true, message: '请输入市场价', trigger: 'blur' }
          ],
          cost_price: [
            { required: true, message: '请输入天津供货价', trigger: 'blur' }
          ],
          stock: [
            { required: true, message: '请输入库存', trigger: 'blur' }
          ],
          sale_actives: [
            { required: true, message: '请选择是否促销产品', trigger: 'blur' }
          ],
          energy: [
            { required: true, message: '请选择是否节能', trigger: 'blur' }
          ],
          protection: [
            { required: true, message: '请选择是否环保', trigger: 'blur' }
          ],
          goods_model: [
            { required: true, message: '请输入型号', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '请选择销量单位', trigger: 'blur' }
          ],
          imported:[
            { required: true, message: '请选择是否进口', trigger: 'blur' }
          ],
          supply_unit:[
            { required: true, message: '请选择对接单位', trigger: 'blur' }
          ],
        }
      }
    },
    created(){
      this.id = this.$route.query.id
      this.getShop()
      console.log(this.fileList)
      if(this.id !== undefined){
        this.getData()
      }else{
        this.addFrom = {
          genre:0,
          protection:0,
          energy:0,
          imported:0,
          supply_unit:0,
          sale_actives:false,
          is_launched:true,
        }
      }

    },
    activated(){
      this.id = this.$route.query.id
      this.skuId = this.$route.query.skuId
      this.getShop()
      if(this.id !== undefined){
        this.getData()
      }else{
        this.addFrom = {
          genre:0,
          protection:0,
          energy:0,
          imported:0,
          supply_unit:0,
          sale_actives:false,
          is_launched:true,
        }
      }
    },
    methods: {
      getData(){
        SkuDetails(this.id).then(res => {
          console.log(res);
          this.addFrom = res.data;
          console.log(this.addFrom.images.length)
          if(this.addFrom.images.length > 0){
            if(this.addFrom.images[0].image1 !== null){
              this.fileList = [
                {url:this.addFrom.images[0].image1 !== null? this.addFrom.images[0].image1 : ''}]
            }
            if(this.addFrom.images[0].image2 !== null){
              this.fileList = [
                {url:this.addFrom.images[0].image1 !== null? this.addFrom.images[0].image1 : ''},{url:this.addFrom.images[0].image2 !== null? this.addFrom.images[0].image2 : ''}]
            }
            if(this.addFrom.images[0].image3 !== null){
              this.fileList = [
                {url:this.addFrom.images[0].image1 !== null? this.addFrom.images[0].image1 : ''},{url:this.addFrom.images[0].image2 !== null? this.addFrom.images[0].image2 : ''},
                {url:this.addFrom.images[0].image3 !== null? this.addFrom.images[0].image3 : ''}]
            }
            if(this.addFrom.images[0].image4 !== null){
              this.fileList = [
                {url:this.addFrom.images[0].image1 !== null? this.addFrom.images[0].image1 : ''},{url:this.addFrom.images[0].image2 !== null? this.addFrom.images[0].image2 : ''},
                 {url:this.addFrom.images[0].image3 !== null? this.addFrom.images[0].image3 : ''}
                ,{url:this.addFrom.images[0].image4 !== null? this.addFrom.images[0].image4 : ''}]
            }
            if(this.addFrom.images[0].image5 !== null){
              this.fileList = [
                {url:this.addFrom.images[0].image1 !== null? this.addFrom.images[0].image1 : ''},{url:this.addFrom.images[0].image2 !== null? this.addFrom.images[0].image2 : ''},
                {url:this.addFrom.images[0].image3 !== null? this.addFrom.images[0].image3 : ''}
                ,{url:this.addFrom.images[0].image4 !== null? this.addFrom.images[0].image4 : ''},
                {url:this.addFrom.images[0].image5 !== null? this.addFrom.images[0].image5 : ''}]
            }
          }
          console.log(this.fileList)
          if(this.addFrom.skuspecification_set.length > 0){
            let checkedItems = []
            this.addFrom.skuspecification_set.forEach(ele=>{
              checkedItems.push(ele.option)
            })
            this.checkedItems = checkedItems
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
      },

      getShop(){
        SpuList(this.query).then(res => {
          console.log(res);
          this.tableData = res.data.results;
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

      getAdd(){
        this.addFrom.goods_id = +this.skuId
        SkuaddDetails(this.addFrom).then(res=>{
          console.log(res)
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
        })

      },

      getEdit(){
        SkueditDetails(this.addFrom).then(res=>{
          console.log(res,res.status)
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
        })

      },

      lookValue(event){
        console.log(event)
      },

      handleChange(file,fileList){
        console.log(file,fileList)
        if(fileList.length === 1){
          this.image1 = fileList[0].raw;
        }
        if(fileList.length === 2){
          this.image1 = fileList[0].raw;
          this.image2 = fileList[1].raw;
        }
        if(fileList.length === 3){
          this.image1 = fileList[0].raw;
          this.image2 = fileList[1].raw;
          this.image3 = fileList[2].raw;
        }
        if(fileList.length === 4){
          this.image1 = fileList[0].raw;
          this.image2 = fileList[1].raw;
          this.image3 = fileList[2].raw;
          this.image4 = fileList[3].raw;
        }
        if(fileList.length === 5){
          this.image1 = fileList[0].raw;
          this.image2 = fileList[1].raw;
          this.image3 = fileList[2].raw;
          this.image4 = fileList[3].raw;
          this.image5 = fileList[4].raw;
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList.length);
        let index = ''
        if(file.url === this.addFrom.images[0].image1){
          index = 'image1'
        }else if(file.url === this.addFrom.images[0].image2){
          index = 'image2'
        }else if(file.url === this.addFrom.images[0].image3){
          index = 'image3'
        }else if(file.url === this.addFrom.images[0].image4){
          index = 'image4'
        }else if(file.url === this.addFrom.images[0].image5){
          index = 'image5'
        }
        if('image'+this.fileList.length === index){
          skuDelImage(this.addFrom.images[0],index).then(res=>{
            console.log(res,res.status)
            if(res.status === 204){
              this.$message.success('删除成功')
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
          })
        }else{
          this.$message.error('不能从中间删除')
          setTimeout(function () {
            window.location.reload()
          },500)
        }
      },

      handlePictureCardPreview(file) {
        console.log(file)
        console.log(this.addFrom.images[0].image1)
        this.addFrom.images[0].image1 = file.url;
        this.dialogVisible = true;
      },

      submitForm(){
        console.log(this.addFrom)
        if(this.addFrom.name === '' || this.addFrom.name === undefined){
          this.$message.error('商品名称不能为空')
          return
        }

        if(this.addFrom.price === '' || this.addFrom.price === undefined){
          this.$message.error('商城售价不能为空')
          return
        }
        if(this.addFrom.cost_price === '' || this.addFrom.cost_price === undefined){
          this.$message.error('天津供货价不能为空')
          return
        }
        if(this.addFrom.market_price === '' || this.addFrom.market_price === undefined){
          this.$message.error('市场价不能为空')
          return
        }
        if(this.addFrom.goods_model === '' || this.addFrom.goods_model === undefined){
          this.$message.error('型号不能为空')
          return
        }
        if(this.addFrom.unit === '' || this.addFrom.unit === undefined){
          this.$message.error('销量单位不能为空')
          return
        }
        if(this.id !== undefined){
          if(this.addFrom.images.length === 0){
            //  表单提交方式
            this.api='http://47.94.106.106:8000/sku/image/'
            let FormDatas = new FormData()
            console.log(this.image1,this.addFrom.images[0])
            FormDatas.append('sku',this.addFrom.id)
            console.log(this.image2)
            FormDatas.append('image1',this.image1 === '' ? '' : this.image1)
            FormDatas.append('image2',this.image2 === '' ? '' : this.image2)
            FormDatas.append('image3',this.image3 === '' ? '' : this.image3)
            FormDatas.append('image4',this.image4 === '' ? '' : this.image4)
            FormDatas.append('image5',this.image5 === '' ? '' : this.image5)
            console.log(FormDatas)
            let that = this
            axios({
              method:'post',
              url:that.api,   //  二次接口
              data:FormDatas,
              headers:{
                'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
              }
            }).then(res=>{
              console.log(res,res.status)
              if(res.status === 201){
                this.getEdit()
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
            })
          }else{
            //  表单提交方式
            this.api='http://47.94.106.106:8000/sku/image/'+this.addFrom.images[0].id+'/'
            let FormDatas = new FormData()
            console.log(this.image1,this.addFrom.images[0],this.image5)
            FormDatas.append('sku',this.addFrom.images[0].sku)
            FormDatas.append('image1',this.image1 === undefined ? '' : this.image1)
            FormDatas.append('image2',this.image2 === undefined ? '' : this.image2)
            FormDatas.append('image3',this.image3 === undefined ? '' : this.image3)
            FormDatas.append('image4',this.image4 === undefined ? '' : this.image4)
            FormDatas.append('image5',this.image5 === undefined ? '' : this.image5)
            console.log(FormDatas)
            let that = this
            axios({
              method:'put',
              url:that.api,   //  二次接口
              data:FormDatas,
              headers:{
                'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
              }
            }).then(res=>{
              console.log(res,res.status)
              if(res.status === 200){
                this.getEdit()
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
            })
          }
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

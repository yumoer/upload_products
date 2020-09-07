<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/spuList"><i class="el-icon-lx-copy"></i> 商品SPU</el-breadcrumb-item>
        <el-breadcrumb-item>{{id === '' ? '新增' : '编辑'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addFrom.name" style="width: 215px" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand_id">
          <el-select v-model="addFrom.brand_id" filterable placeholder="请搜索品牌">
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级类别" prop="category1">
          <el-select v-model="addFrom.category1" filterable  placeholder="请搜索一级类别" @change="getCategories1">
            <el-option
              v-for="item in tableData1"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级类别" prop="category2">
          <el-select v-model="addFrom.category2" filterable  placeholder="请搜索二级类别" @change="getCategories2">
            <el-option
              v-for="item in tableData2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级类别" prop="category3">
          <el-select v-model="addFrom.category3" filterable  placeholder="请搜索三级类别" @change="getCategories3">
            <el-option
              v-for="item in tableData3"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model="addFrom.sales" style="width: 215px" placeholder="请输入销量"></el-input>
        </el-form-item>
        <el-form-item label="评价数" prop="comments">
          <el-input v-model="addFrom.comments" style="width: 215px" placeholder="请输入评价数"></el-input>
        </el-form-item>
        <el-form-item label="详细介绍" prop="desc_detail">
          <div>
            <div id="editorElem" ref="editor" style="text-align:left;"></div>
          </div>
        </el-form-item>
        <el-form-item label="包装信息" prop="desc_pack">
          <div>
            <div id="editorElem1" ref="editor1" style="text-align:left;z-index: -1"></div>
          </div>
        </el-form-item>
        <el-form-item label="售后服务" prop="desc_service">
          <el-input
            type="textarea"
            placeholder="请输入售后服务"
            :autosize="{ minRows: 4, maxRows: 4}"
            v-model="addFrom.desc_service">
          </el-input>
        </el-form-item>
        <el-form-item label="常见问题" prop="desc_problem">
          <div>
            <div id="editorElem2" ref="editor2" style="text-align:left;z-index: -1"></div>
          </div>
        </el-form-item>
        <el-form-item label="包装清单" placeholder="请输入包装清单" prop="desc_ware">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            placeholder="请输入包装清单"
            v-model="addFrom.desc_ware">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form style="text-align: right;margin-right: 30px">
        <el-form-item >
          <el-button class="editor-btn" type="primary" @click="submitForm()">{{id !== '' ?'修改':'保存'}}</el-button>
          <el-button class="editor-btn" @click="goBack()">返回上一页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {SpuDetails,SpuCategory1,SpuCategory2,SpuaddDetails,SpuBrand,SpueditDetails} from '../../../api/index'
  import E from 'wangeditor'
  export default {
    name: 'editor',
    data: function(){
      return {
        tableData:[],
        tableData1:[],
        tableData2:[],
        tableData3:[],
        query: {
          page:1,
          page_size:1000,
          ordering:'-create_time'
        },
        addFrom:{},
        id:'',
        // 渲染列表，限制在20个以内
        list: [],
        editor: '',
        editor1: '',
        editor2: '',
        editorContent: '',
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          brand_id: [
            { required: true, message: '请选择品牌', trigger: 'blur' }
          ],
          category1: [
            { required: true, message: '请选择一级分类', trigger: 'blur' }
          ],
          category2: [
            { required: true, message: '请选择二级分类', trigger: 'blur' }
          ],
          category3: [
            { required: true, message: '请选择三级分类', trigger: 'blur' }
          ],
          sales: [
            { required: true, message: '请输入销量', trigger: 'blur' }
          ],
          comments:[
            { required: true, message: '请输入评论数', trigger: 'blur' }
          ],
          desc_detail: [
            { required: true, message: '请填写详细介绍', trigger: 'blur' }
          ],
          desc_pack: [
            { required: true, message: '请填写包装信息', trigger: 'blur' }
          ],
          desc_service: [
            { required: true, message: '请填写售后服务', trigger: 'blur' }
          ],
          desc_problem: [
            { required: true, message: '请填写常见问题', trigger: 'blur' }
          ],
          desc_ware: [
            { required: true, message: '请填写包装清单', trigger: 'blur' }
          ],
        }
      }
    },

    created(){
      this.getBrand()
      this.getCategories1()
      this.id = JSON.parse(this.$route.query.id)
      console.log(this.id)
      if(this.id !== ''){
        this.getData()
      }else{
        this.addFrom = {}
      }
    },
    activated(){
      this.getBrand()
      this.getCategories1()
      this.id = JSON.parse(this.$route.query.id)
      if(this.id !== ''){
        this.getData()
      }else{
        this.addFrom = {}
      }
    },

    mounted() {
      /*详细介绍*/
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
      this.editor.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        // 'quote',  // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      //聚焦时候函数
      this.editor.customConfig.onfocus = function() {
        // console.log("onfocus")
      };
      //失焦时候函数
      this.editor.customConfig.onblur = function() {
        // console.log("onblur")
      };
      //change事件，当富文本编辑器内容发生变化时便会触发此函数
      this.editor.customConfig.onchange = (html)=> {
        console.log(html)
        this.addFrom.desc_detail = html
        console.log()
      };
      this.editor.create(); //以上配置完成之后调用其create()方法进行创建
      this.editor.txt.html(); //创建完成之后的默认内容

      /*包装清单*/
      // var editor = new E('#editorElem')
      this.editor1 = new E(this.$refs.editor1)
      this.editor1.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
      this.editor1.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
      this.editor1.customConfig.uploadImgHeaders = {}; // 自定义 header
      this.editor1.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor1.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
      this.editor1.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor1.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
      this.editor1.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        // 'quote',  // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      //聚焦时候函数
      this.editor1.customConfig.onfocus = function() {
        //console.log("onfocus")
      };
      //失焦时候函数
      this.editor1.customConfig.onblur = function() {
        //console.log("onblur")
      };
      //change事件，当富文本编辑器内容发生变化时便会触发此函数
      this.editor1.customConfig.onchange = (html)=> {

        this.addFrom.desc_pack = html
      };
      this.editor1.create(); //以上配置完成之后调用其create()方法进行创建
      this.editor1.txt.html(); //创建完成之后的默认内容

      /*常见问题*/
      this.editor2 = new E(this.$refs.editor2)
      this.editor2.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
      this.editor2.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
      this.editor2.customConfig.uploadImgHeaders = {}; // 自定义 header
      this.editor2.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor2.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
      this.editor2.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor2.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
      this.editor2.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        // 'quote',  // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      //聚焦时候函数
      this.editor2.customConfig.onfocus = function() {
        //console.log("onfocus")
      };
      //失焦时候函数
      this.editor2.customConfig.onblur = function() {
        //console.log("onblur")
      };
      //change事件，当富文本编辑器内容发生变化时便会触发此函数
      this.editor2.customConfig.onchange = (html)=> {
        this.addFrom.desc_detail = html
      };
      this.editor2.create(); //以上配置完成之后调用其create()方法进行创建
      this.editor2.txt.html(); //创建完成之后的默认内容
    },


    methods: {
      getData(){
        SpuDetails(this.id).then(res => {
          console.log(res);
          this.addFrom = res.data
          this.editorElem()
        });
      },
      // 品牌
      getBrand(){
        SpuBrand(this.query).then(res => {
          console.log(res);
          this.tableData = res.data
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



        SpuCategory1().then(res => {
          console.log(res);
          this.tableData1 = res.data
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

      editorElem(){
        /*详细介绍*/
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
        this.editor.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
        this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
        this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
        this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
        this.editor.customConfig.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote',  // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        //聚焦时候函数
        this.editor.customConfig.onfocus = function() {
          console.log("onfocus")
        };
        //失焦时候函数
        this.editor.customConfig.onblur = function() {
          console.log("onblur")
        };
        //change事件，当富文本编辑器内容发生变化时便会触发此函数
        this.editor.customConfig.onchange = (html)=> {
          console.log(html)
          this.addFrom.desc_detail = html
          console.log(this.addFrom.desc_detail)
        };

        this.editor.create(); //以上配置完成之后调用其create()方法进行创建
        this.editor.txt.html(this.addFrom.desc_detail); //创建完成之后的默认内容

        /*包装清单*/
        // var editor = new E('#editorElem')
        this.editor1 = new E(this.$refs.editor1)
        this.editor1.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
        this.editor1.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
        this.editor1.customConfig.uploadImgHeaders = {}; // 自定义 header
        this.editor1.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
        this.editor1.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
        this.editor1.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
        this.editor1.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
        this.editor1.customConfig.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote',  // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        //聚焦时候函数
        this.editor1.customConfig.onfocus = function() {
          //console.log("onfocus")
        };
        //失焦时候函数
        this.editor1.customConfig.onblur = function() {
          //console.log("onblur")
        };
        //change事件，当富文本编辑器内容发生变化时便会触发此函数
        this.editor1.customConfig.onchange = (html)=> {

          this.addFrom.desc_pack = html
        };
        this.editor1.create(); //以上配置完成之后调用其create()方法进行创建
        this.editor1.txt.html(this.addFrom.desc_pack); //创建完成之后的默认内容

        /*常见问题*/
        this.editor2 = new E(this.$refs.editor2)
        this.editor2.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
        this.editor2.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
        this.editor2.customConfig.uploadImgHeaders = {}; // 自定义 header
        this.editor2.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
        this.editor2.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
        this.editor2.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
        this.editor2.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
        this.editor2.customConfig.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote',  // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        //聚焦时候函数
        this.editor2.customConfig.onfocus = function() {
          //console.log("onfocus")
        };
        //失焦时候函数
        this.editor2.customConfig.onblur = function() {
          //console.log("onblur")
        };
        //change事件，当富文本编辑器内容发生变化时便会触发此函数
        this.editor2.customConfig.onchange = (html)=> {
          this.addFrom.desc_detail = html
        };
        this.editor2.create(); //以上配置完成之后调用其create()方法进行创建
        this.editor2.txt.html(this.addFrom.desc_problem); //创建完成之后的默认内容
      },

      editorElem1(){
        /*详细介绍*/
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
        this.editor.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
        this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
        this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
        this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
        this.editor.customConfig.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote',  // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        //聚焦时候函数
        this.editor.customConfig.onfocus = function() {
          console.log("onfocus")
        };
        //失焦时候函数
        this.editor.customConfig.onblur = function() {
          console.log("onblur")
        };
        //change事件，当富文本编辑器内容发生变化时便会触发此函数
        this.editor.customConfig.onchange = (html)=> {
          console.log(html)
          this.addFrom.desc_detail = html
          console.log(this.addFrom.desc_detail)
        };

        this.editor.create(); //以上配置完成之后调用其create()方法进行创建
        this.editor.txt.html(); //创建完成之后的默认内容

        /*包装清单*/
        // var editor = new E('#editorElem')
        this.editor1 = new E(this.$refs.editor1)
        this.editor1.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
        this.editor1.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
        this.editor1.customConfig.uploadImgHeaders = {}; // 自定义 header
        this.editor1.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
        this.editor1.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
        this.editor1.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
        this.editor1.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
        this.editor1.customConfig.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote',  // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        //聚焦时候函数
        this.editor1.customConfig.onfocus = function() {
          //console.log("onfocus")
        };
        //失焦时候函数
        this.editor1.customConfig.onblur = function() {
          //console.log("onblur")
        };
        //change事件，当富文本编辑器内容发生变化时便会触发此函数
        this.editor1.customConfig.onchange = (html)=> {

          this.addFrom.desc_pack = html
        };
        this.editor1.create(); //以上配置完成之后调用其create()方法进行创建
        this.editor1.txt.html(); //创建完成之后的默认内容

        /*常见问题*/
        this.editor2 = new E(this.$refs.editor2)
        this.editor2.customConfig.uploadImgShowBase64 = false //图片以base64形式保存
        this.editor2.customConfig.uploadImgServer = 'http://47.94.106.106:8000/rich/text/image/'; // 配置服务器端地址
        this.editor2.customConfig.uploadImgHeaders = {}; // 自定义 header
        this.editor2.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
        this.editor2.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
        this.editor2.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
        this.editor2.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
        this.editor2.customConfig.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote',  // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
        //聚焦时候函数
        this.editor2.customConfig.onfocus = function() {
          //console.log("onfocus")
        };
        //失焦时候函数
        this.editor2.customConfig.onblur = function() {
          //console.log("onblur")
        };
        //change事件，当富文本编辑器内容发生变化时便会触发此函数
        this.editor2.customConfig.onchange = (html)=> {
          this.addFrom.desc_detail = html
        };
        this.editor2.create(); //以上配置完成之后调用其create()方法进行创建
        this.editor2.txt.html(); //创建完成之后的默认内容
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },

      // 一级分类
      getCategories1(event){
        console.log(event)
        this.addFrom.category1_id = event
        SpuCategory2(event).then(res => {
          console.log(res);
          this.tableData2 = res.data
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
      // 二级分类
      getCategories2(event){
        console.log(event)
        this.addFrom.category2_id = event
        SpuCategory2(event).then(res => {
          console.log(res);
          this.tableData3 = res.data
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
      // 三级分类
      getCategories3(event){
        console.log(event)
        this.addFrom.category3_id = event
      },

      getAdd(){
        console.log(this.addFrom.desc_detail)
        SpuaddDetails(this.addFrom).then(res=>{
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
        console.log(this.addFrom)
        SpueditDetails(this.addFrom).then(res=>{
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

      submitForm(){
        if(this.addFrom.name === '' || this.addFrom.name === undefined){
          this.$message.error('商品名称不能为空')
          return
        }
        if(this.addFrom.brand_id === '' || this.addFrom.brand_id === undefined){
          this.$message.error('品牌不能为空')
          return
        }
        if(this.addFrom.category1 === '' || this.addFrom.category1 === undefined){
          this.$message.error('一级分类不能为空')
          return
        }
        if(this.addFrom.category2 === '' || this.addFrom.category2 === undefined){
          this.$message.error('二级分类不能为空')
          return
        }
        if(this.addFrom.category3 === '' || this.addFrom.category3 === undefined){
          this.$message.error('三级分类不能为空')
          return
        }
        if(this.addFrom.sales === '' || this.addFrom.sales === undefined){
          this.$message.error('销量不能为空')
          return
        }
        if(this.addFrom.comments === '' || this.addFrom.comments === undefined){
          this.$message.error('评论数不能为空')
          return
        }
        if(this.addFrom.desc_detail === '' || this.addFrom.desc_detail === undefined){
          this.$message.error('详细介绍不能为空')
          return
        }
        if(this.addFrom.desc_pack === '' || this.addFrom.desc_pack === undefined){
          this.$message.error('包装信息不能为空')
          return
        }
        if(this.addFrom.desc_service === '' || this.addFrom.desc_service === undefined){
          this.$message.error('售后服务不能为空')
          return
        }
        if(this.addFrom.desc_problem === '' || this.addFrom.desc_problem === undefined){
          this.$message.error('常见问题不能为空')
          return
        }
        if(this.addFrom.desc_ware === '' || this.addFrom.desc_ware === undefined){
          this.$message.error('包装清单不能为空')
          return
        }
        if(this.id !== ''){
          console.log('111')
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
<style scoped>
  page{
    position: relative;
  }
  #editorElem /deep/ .w-e-text-container{
    height:400px !important;
  }
  #editorElem1 /deep/ .w-e-text-container{
    height:200px !important;
  }
  #editorElem2 /deep/ .w-e-text-container{
    height:200px !important;
  }
  .editor-btn{
    margin-top: 20px;
  }
</style>

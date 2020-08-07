import request from '../utils/request';

/*登录接口*/
export const Login = query => {
  return request({
    url: '/auth2/',
    method: 'post',
    data: query, // json
  });
};

// spu列表
export const SpuList = query => {
    return request({
        url: '/goods/',
        method: 'get',
        params: query,
        headers:{
          'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
        }
    });
};

// spu详情
export const SpuDetails = query => {
  return request({
    url: '/goods/'+query,
    method: 'get',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }

  });
};

// spu删除
export const SpudelDetails = query => {
  return request({
    url: '/goods/'+query,
    method: 'delete',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// spu新增
export const SpuaddDetails = query => {
  return request({
    url: '/goods/',
    method: 'post',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// spu修改
export const SpueditDetails = query => {
  return request({
    url: '/goods/'+query.id+'/',
    method: 'put',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// 品牌
export const SpuBrand = query => {
  return request({
    url: 'search/brand/',
    method: 'get',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
    // params: query, // json
  });
};

// spu一级分类
export const SpuCategory1 = query => {
  return request({
    url: 'categories/get/goods_category/',
    method: 'get',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// spu二/三级分类
export const SpuCategory2 = query => {
  return request({
    url: 'categories/get/goods_category/'+query+'/',
    method: 'get',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// sku列表
export const SkuList = query => {
  return request({
    url: '/sku/',
    method: 'get',
    params: query,
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// sku删除
export const SkudelDetails = query => {
  return request({
    url: '/sku/'+query,
    method: 'delete',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// spu详情
export const SkuDetails = query => {
  return request({
    url: '/sku/'+query,
    method: 'get',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// spu新增
export const SkuaddDetails = query => {
  return request({
    url: '/save/sku/',
    method: 'post',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// spu修改
export const SkueditDetails = query => {
  return request({
    url: '/save/sku/'+query.id+'/',
    method: 'put',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

// sku图片新增
export const SkuaddImages = query => {
  return request({
    url: '/sku/image/',
    method: 'post',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

//  获取SPU对应规格
export const spuSpecification = query => {
  return request({
    url: '/goods/specification/'+query+'/',
    method: 'get',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

//  新建SPU规格名称
export const spuaddSpecification = query => {
  return request({
    url: '/goods/specification/'+query.spuId+'/',
    method: 'post',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};


//  规格选项选项列表
export const spuSpecificationList = query => {
  return request({
    url: '/specification/option/'+query+'/',
    method: 'get',
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

//  新建选项选项
export const spuSpecificationOption = query => {
  return request({
    url: '/specification/option/',
    method: 'post',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

//  SKU新增绑定规格
export const skuSpecification = query => {
  return request({
    url: '/sku/specification/',
    method: 'post',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};

//  SKU修改绑定规格
export const skuEditSpecification = query => {
  return request({
    url: '/sku/specification/'+query.id+'/',
    method: 'put',
    data: query, // json
    headers:{
      'Authorization': 'JWT ' +JSON.parse(localStorage.getItem("ms_userInfo")).data.token
    }
  });
};





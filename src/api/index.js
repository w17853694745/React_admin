import ajax from "./ajax"
import jsonp from "jsonp"
import { message } from "antd";

//登陆
export const reqLogin = (username, password) => ajax({
  method: "POST",
  url: "/login",
  data: {
    username,
    password
  }
})

//获取天气
export const getWeather = (home) => {
  return new Promise((resolve,reject)=>{
    const path = `http://api.map.baidu.com/telematics/v3/weather?location=${home}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(path,{},(error, data) => {
        if (!error && data.status === "success") {
          const{dayPictureUrl,weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl,weather})
        } else {
          message.error("请求天气失败")
        }
      }
    )
  })
}
//获取分支列表
export const reqCategory = ()=>ajax({
  url: "/manage/category/list",

})
//添加分类
export const reqAddCategory = (categoryName) => ajax({
  url: "/manage/category/add",
  method:"POST",
  data:{
    categoryName
  }
})
//修改分类
export const reqUpdataCategory = ({categoryId,categoryName})=>ajax({
  url: "/manage/category/update",
  method:"POST",
  data:{
    categoryId,
    categoryName
  }
})
//获取商品分页列表
export const reqProducts = (pageNum) => ajax({
  url: "manage/product/list",
  params:{
    pageNum,
    pageSize:2
  }
})
//根据Name/desc搜索产品分页列表
export const reqSeachProducts = ({pageNum,pageSize,searchType, searchName}) => ajax.get(
  "/manage/product/search",
  {
    params:{
      pageNum,
      pageSize,
      [searchType]: searchName
      
    }
  }
)
//对商品进行上架/下架处理
export const requpdataProduct = (productId, status) => ajax({
  url: "/manage/product/updateStatus",
  method:"POST",
  data:{
    productId, 
    status
  }
})
//根据商品ID获取商品
export const reqProduct = (productId) => ajax({
  url: "/manage/product/info",
  params:{
    productId
  }
})
//根据分类ID获取分类
export const reqCategoryOne = (categoryId) => ajax({
  url: "/manage/category/info",
  params:{
    categoryId
  }
})
//删除图片
export const reqDeleteImg = (name)=>ajax({
  url: "/manage/img/delete",
  method:'POST',
  data:{
    name
  }
})
//添加商品
export const reqAddUpdataProduct = (product)=>ajax({
  url: "/manage/product/" + (product._id ? "update":"add"),
  method:"POST",
  data:product
})
//获取角色列表
export const reqGetRoles = ()=>ajax({
  url: "/manage/role/list"
})
//获取用户列表
export const reqGetusers = ()=>ajax({
  url: "/manage/user/list"

})
//创建角色
export const reqAddRoles = (roleName) => ajax({
  url: "/manage/role/add",
  method:"POST",
  data:{
    roleName
  }
})
//更新角色(给角色设置权限)
export const reqUpdataRole = (role)=>ajax({
  url: "/manage/role/update",
  method:"POST",
  data:role
})

//添加/更新用户
export const updataoradduser=(user) =>ajax({
  url: "/manage/user/"+(user._id?"update":"add"),
  method:"POST",
  data:user
})

//删除用户
export const deleteuser = (userId) => ajax({
  url: "/manage/user/delete",
  method:"POST",
  data: {
    userId
  }
})
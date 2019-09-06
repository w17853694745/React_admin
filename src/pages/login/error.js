// (function (params) {
//   render() {
//   const { getFieldDecorator } = this.props.form;
//   //这里没用memoryUtils
//   const user = storageUtils.getUser();
//   if (user._id) {
//     debugger
//     return <Redirect to="/"></Redirect>
//   }else{

//   }
//   return (
//     <div className="login">
//       <div className="login-header">
//         <img src={logo} alt="logo" />
//         <h1>后台管理系统-登陆</h1>
//       </div>
//       <div className="login-content">
//         <h1>用户登陆</h1>
//         <Form onSubmit={this.handleSubmit} className="login-form">
//           <Form.Item>
//             {getFieldDecorator("username", {
//               rules: [
//                 { required: true, message: "请输入用户名" },
//                 { min: 4, message: "用户名不能小于4位" },
//                 { max: 12, message: "用户名不能大于12位" },
//                 {
//                   pattern: /^[a-zA-Z0-9_]+$/,
//                   message: "用户名只能包含字母数字下划线"
//                 }
//               ]
//             })(
//               <Input
//                 prefix={
//                   <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
//                 }
//                 placeholder="用户名"
//               />
//             )}
//           </Form.Item>
//           <Form.Item>
//             {getFieldDecorator("password", {
//               rules: [{ validator: this.validator }]
//             })(
//               <Input
//                 prefix={
//                   <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
//                 }
//                 type="password"
//                 placeholder="密码"
//               />
//             )}
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="login-form-button"
//               style={{ width: "100%" }}
//             >
//               登陆系统
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }
// })()
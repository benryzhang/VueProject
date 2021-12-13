<template>
  <div class="login-container" id="particles-js">
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"  
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="100"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="repulse"
      >
      </vue-particles>
    <el-form
      :model="ruleForm2"
      :rules="LoginFormRules"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">动力灾害监控数据分析平台</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm2.username"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          show-password
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%;"
          @click="submitForm('ruleForm')"
          :loading="logining"
          >登录</el-button
        >
        <!-- <i class="el-icon-d-arrow-right register">立即注册</i> -->
        
       
      </el-form-item>
    </el-form>
    <div class="copyright">@copy智性科技南通有限公司 2021</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "admin",
        password: "123",
      },
      LoginFormRules: {
        username: [
          {
            required: true,message: "请输入用户名",trigger: "blur",
          },
          { min: 3, max: 20, message: '请输入长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: '请输入长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      },
      checked: false,
    };
  },
  methods: {
    submitForm(event) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true;
          let params={
            loginusername:this.ruleForm2.username,
            loginpassword:this.ruleForm2.password
          }
                var data = this.$axios.get(this.api.login,{params}).then(response => {
                  let resData = JSON.parse(response);
                    if (resData.mess == "用户已存在") {
                      this.$alert("用户已存在", "提示", {
                        confirmButtonText: "确定",
                      });
                    this.logining = false;
                    sessionStorage.setItem("user", this.ruleForm2.username);
                  } else if (resData.mess == "用户名或密码不正确"){
                    this.logining = false;
                    this.$alert("请输入正确的用户名和密码", "提示", {
                        confirmButtonText: "确定",
                      });
                      return false;
                  }
                  else {
                    localStorage.setItem("JWT_TOKEN", resData);
                    this.$router.push('/dataview');
                  }
                }, response => {
                    console.log("error");
                });

        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};

</script>

<style scoped>
h3{text-align: center;}
.login-container {
  /* background: #000 url("../assets/img/bg0_2.jpg") no-repeat center top; */
  background-image:linear-gradient(to top, #409EFF 0%, #2b1216 100%);
  overflow: hidden;
  background-position: 50% 50%;
  width: 100%;
  height: 100%;
}
.copyright {position: absolute;height:60px; line-height: 60px; background: rgb(236, 236, 236);color: #333; width: 100%;bottom: 0; text-align: center; font-size: 14px; opacity: 0.6;}
.register{ cursor: pointer; float:right; padding-top:15px; color:#999;}
.el-main {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(251, 252, 252, 1);
  padding: 0;
}

.login-page {
    position: absolute;
    left:calc((100% - 0px) / 2);
    top:calc((100% - 0px) / 2);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  transform: translate(-50%,-50%);
  width: 400px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}

</style>


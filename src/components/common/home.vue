<template>
  <el-container class="home-container">
<!--    导航-->
    <el-header>
      <div>
        <span class="sysname">
          <img src="../../assets/img/logo.png" class="logo"  /> 结构健康全寿命监测系统
        </span>
      </div>
      <el-dropdown>
        <div class="block">
          <el-avatar  :size="30" :src="this.userInfo.avatar" style="cursor: pointer;" icon="el-icon-user-solid"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown" trigger="click">
           <el-dropdown-item>
             <span type="danger"  @click="toWelcome"><span class="el-icon-house"></span> &nbsp;系统首页</span>
          </el-dropdown-item>


          <el-dropdown-item>

            <span type="danger" @click="getContact"><span class="el-icon-ship"></span> &nbsp;用户信息</span>

          </el-dropdown-item>

          <el-dropdown-item>

            <span type="danger" @click="logout"><span class="el-icon-switch-button"></span> &nbsp;退出登入</span>

          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!--主体-->
    <el-container style="height: 500px;">
      <!--菜单-->
      <el-aside :width="isCollapse==true?'44px':'200px'" style="transition:0.3s">
        <div class="toggle-btn" @click="toggleCollapse" >|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :router="true"
          :default-active="activePath"
          :collapse-transition="false"
          text-color="rgba(255,255,255,0.7)"
          unique-opened
        >
          <MenuTree  :menuList="this.menuList"></MenuTree>
        </el-menu>
<!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">工程概况</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>

    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
  </el-menu-item>
</el-menu> -->
</el-aside>
      <!--右边主体-->
      <el-main v-loading="loading">

        <router-view v-if="isRouterAlive"></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuTree from "./MenuTree.vue"; //引进菜单模板

export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      loading: true,
      activePath: "", //激活的路径
      menuList: {},
      userInfo: {},
      isCollapse: false,
      isRouterAlive:true

    };
  },
  components: {
    MenuTree
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    async logout() {
      var res = await this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出登入"
        });
      });
      if (res == "confirm") {
        window.localStorage.clear();
        this.$router.push("/login");
      }
    },
    /**
     * 去系统首页
     */
    toWelcome(){
      this.$router.push("/home");
    },
    /**
      加载菜单数据
     */
    async getMenuList() {
      const { data: res } = await this.$http.get("json/menu.json");
      this.menuList = res.data;
      if (res.code !== 200)
        return this.$message.error("获取菜单失败:" + res.msg);
       this.menuList = res.data;
    },
    /**
      获取用户信息
     */
    async getUserInfo() {
      const { data: res } = await this.$http.get("user/info");
      if (res.code !== 200) {
        return this.$message.error("获取用户信息失败:" + res.msg);
      } else {
        this.userInfo = res.data;
        //保存用户
        this.$store.commit("setUserInfo", res.data);
      }
    },
    /**
     * 菜单伸缩
     */
    toggleCollapse () {
      this.isCollapse = !this.isCollapse;
    },

    /**
     * 点击交流
     */
    getContact(){
      const w = window.open('about:blank');
      w.location.href = '';
    }

  },
  mounted() {
    //this.getUserInfo();
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    // if(window.sessionStorage.getItem("activePath")==null){
    //   this.activePath='/welcome';
    // }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
};
</script>

<style>
.el-menu{ background-color:#303133; border: none;}
.el-menu-item-group__title,.el-menu-item,.el-submenu__title{ color:#fff}
.el-submenu__title {padding-left: 10px!important;}
.el-menu-item, .el-submenu__title,.el-submenu .el-menu-item,.el-menu--collapse { height: 42px; line-height: 42px;}
.el-menu--vertical{ left: 42px!important;}
.el-menu{width:44px;}
.el-menu-item:hover,.el-submenu__title:hover{background-color: #C0C4CC;}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: auto;
  }
/* 为对应的路由跳转时设置动画效果 */
.sysname { line-height: 60px; font-size: 20px; height: 60px; display: block;}
.logo{ float: left; display: block; margin-left: 10px;}
.el-header {
  background-color: #303133;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 19px;

  padding-left: 0px;
}
.el-submenu__title{ padding-left: 10px!important;}
.el-aside {
   background-color:#303133 
}
.home-container {
  width: 100%;
  height: 100% !important;
}
.toggle-btn {
  background-color: #409EFF;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>

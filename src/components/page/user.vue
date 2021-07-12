<template>
  <div id="sensorinfo">

    <!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
      <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
        <el-form-item>
          <el-button  icon="el-icon-refresh" @click="getAllInfoData('refresh')" type="primary">刷新</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button  
            icon="el-icon-plus"
            type="primary" 
            @click="addPannel">添加</el-button>
        </el-form-item>
        <el-form-item>
          <download-excel
              class = "export-excel-wrapper"
              :data = "itemList"
              :fields = "json_fields"
              name = "用户信息.xls">
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button icon="el-icon-download" type="primary">下载</el-button>
        </download-excel>
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-printer" @click="search" type="primary">打印</el-button>
        </el-form-item>
        <el-form-item label="按角色查询">
        <el-select clearable
            @change="search"
            @clear="search"
            v-model="queryMap.para"
            placeholder="请选择用户角色">
          <el-option
            v-for="item in searchlist"
              :label="item.text"
              :key="item.id"
              :value="item.id"
              >
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <!-- 表格区域 -->
      <template >
        <el-table 
        id="typecode"
          border
          stripe
          align="center"
          size="mini"
          :data="itemList"
          style="width: 100%;"
          :height="Height"
          max-height="872"
          >
          <el-table-column :index="indexMethod" type="index" fixed label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="username" label="用户名" fixed sortable width="200" align="center"  ></el-table-column>
          <el-table-column prop="password" label="密码" width="" align="center"></el-table-column>
          <el-table-column prop="ipaddress" label="IP地址" width="140" align="center"></el-table-column>
          <el-table-column prop="email" label="邮件" width="" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="" align="center"></el-table-column> 
          <!-- :formatter="damagetypeFormat"  :formatter="((row,column)=>{return scaleFormat(row, column, cellValue, index)})" -->
          <el-table-column prop="department" label="部门" width="" align="center"></el-table-column>
          <el-table-column prop="telephone" label="电话" width="" align="center"></el-table-column>
          <el-table-column prop="token" label="移动令牌" width="" align="center"></el-table-column>
          <el-table-column prop="enabled" label="用户状态" width="" align="center"></el-table-column>
          <el-table-column prop="permisson" label="用户权限" width="" align="center"></el-table-column>
          <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="120">
      <template v-slot="prm" >
        <el-button  @click="editPannel(prm.$index, prm.row)" type="text" size="small" >编辑</el-button>
        <el-button type="text" size="small"  @click="del(prm.row.username, prm.row.password)">删除</el-button>
      </template>
    </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:10px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNumber"
        :page-sizes="[ 10, 20, 50, 100]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
      <!--弹框组件开始-----------------------start-->
      <el-dialog  :title="dialogTitle" :visible.sync="dialogFormVisible" append-to-body width="60%" class="abow_dialog" v-if="dialogFormVisible" @close="closeDialog('infoform')">
        <userPanel-page
          v-if="dialogFormVisible"
          ref="userPanel"
          :dialog-title="dialogTitle"
          :item-info="tableItem"
          @closeDialog="closeDialog"
        ></userPanel-page>
      <!-- 确定按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="onSubmit('infoform')" >保 存</el-button>
        </span>
    </el-dialog>
    
  </div>
  
</template>

<script>
import axios from "axios";
import userPanel from './userPanel'


export default {
  data() {
    return {
      addOperate: undefined,
      type:'',
      itemList: [],
      Height:0,
      total:0,
      searchlist:[],
      infoform: [],
      queryMap:{para:'',pageNumber:1,pageSize:20,structure:this.GLOBAL.structure },//查询对象
      components: {
        userPanel,
      },
      dialogFormVisible: false,
      dialogTitle: "添加检测信息",
      tableItem: {
        username:'',
        password:'',
        ipaddress:'',
        email: '',
        name:'',
        department:'',
        telephone:'',
        token:'',
        enabled:'',
        permisson:''
      },
      json_fields: {
		          "用户名": "username",
		          "密码": "password",
		          "IP地址": "ipaddress", 
		          "邮箱": "email", 
		          "姓名": "name",
		          "工作部门": "department",
		          "电话": "telephone", 
              "移动令牌": "token",
              "是否可用": "enabled",
              "用户角色": "permisson"
            },
            json_meta: [
		          [
		            {
		              " key ": " charset ",
		              " value ": " utf- 8 "
		            }
		          ]
            ],
    };
  },
  mounted() {
          this.getAllInfoData();
          this.getAllRoleInfo();
          this.$nextTick(() => {
            this.Height = window.innerHeight - 240;
            //后面100一般是根据你上下导航栏的高度来减掉即可。
          })
             
         },
  inject:['reload'],
  methods: {
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    //加载传感器信息列表
    async getAllInfoData(re) {
      //this.handleCurrentChange('1');
      await this.$axios.get(this.api.getAllInfoData,
        {
          params: this.queryMap
         },
      ).then(response => {
        if( re === 'refresh'){
            this.reload();
        }
        this.total = JSON.parse(response).total;
        this.itemList = JSON.parse(response).rows;
      });

    },
    async getAllRoleInfo() {
      await this.$axios.get(this.api.getAllRoleInfo,{params:this.GLOBAL.structure}).then(response => {
        this.searchlist = JSON.parse(response)
      });
    },
    search(val) {
      this.queryMap.pageNumber = 1;
      this.queryMap.para = val;
      this.getAllInfoData();
    },
    editPannel(index, row) {
        this.dialogFormVisible = true;
        this.addOperate = false;
        this.dialogTitle = "编辑用户信息";
        this.$nextTick(()=>{
          this.$refs.userPanel.dataInit(row);
        });
    },
    addPannel(){
        this.dialogTitle = "添加用户信息";
        this.dialogFormVisible = true;
        this.addOperate = true;
    },
    addItem(){
      console.log('add')
      this.tableItem = {
        username:'',
        password:'',
        ipaddress:'',
        email: '',
        name:'',
        department:'',
        telephone:'',
        token:'',
        enabled:'',
        permisson:''
      };
      this.dialogTitle = "添加用户信息";
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
                //this.$refs.standardPanel.init();
                this.$refs["userPanel"].dialogFormVisible = true;

            })
    },
    del(username,password){
      this.$confirm('确认要删除当前数据吗？是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get(this.api.deleteUserInfoData,{params:{username:username,password:password,structure:this.GLOBAL.structure}}).then(response => {
            const result = JSON.parse(response)
            if(result.msg != '操作成功'){
                      this.$message({
                          message: '用户信息删除失败',
                          center: true
                      });
                  }else{
                      //this.infoform = {}
                      this.$message({
                          message: '用户信息删除成功',
                          type: 'success',
                          center: true
                      });
                }
                this.getAllInfoData('refresh')
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '用户删除失败!'
            });
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
    },
    onSubmit(formName){
        //需要提交的form表单
        const result = this.$refs['userPanel'].validateHandle()
        //const type = 'save'
        if (this.addOperate) {
          this.type = 'save'
        }else{
          this.type = 'update'
        }
          if (result) {
              /* formData格式提交： */
              const qs = require('qs');
              const formData = JSON.stringify(this.$refs.userPanel.infoform)
              const PermissonTypeList = this.$refs.userPanel.PermissonTypeList
              const EnabledTypeList = this.$refs.userPanel.EnabledTypeList
              EnabledTypeList.forEach((item,index) => {
                    if(item.subcodename === this.$refs.userPanel.infoform.enabled){  
                        this.$refs.userPanel.infoform.enabled = item.subcode
                    }  
                });
              PermissonTypeList.forEach((item,index) => {
                    if(item.subcodename === this.$refs.userPanel.infoform.permisson){
                        this.$refs.userPanel.infoform.permisson = item.subcode
                    }  
              });
              //console.log(this.infoform)
              //this.infoform.testdate = this.$moment(this.addTime.createDate).format('YYYY-MM-DD HH:mm:ss')
              //const prm = {type:'Info',data:JSON.stringify(this.infoform),structure:this.GLOBAL.structure}
              const prm = qs.stringify({type:this.type,data:JSON.stringify(this.$refs.userPanel.infoform),structure:this.GLOBAL.structure})
              this.$axios.post(this.api.saveAddDataInfo,prm).then(response => {
                  const result = JSON.parse(response)
                  if(result.msg != '操作成功'){
                          this.$message({
                          message: '用户信息保存失败',
                          center: true
                      });
                  }else{
                      this.infoform = {}
                      this.$message({
                          message: '用户信息保存成功',
                          type: 'success',
                          center: true
                      });
                      this.closeDialog()
                      this.getAllInfoData('refresh')
                  }
                  
              })
              .catch(err => {

              })
          } else {
              this.$message({
                  message: '请完善用户基本信息',
                  center: true
                  });
              return false;
          }
    },
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getAllInfoData();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNumber = current;
      this.getAllInfoData();
    },
    closeDialog() {
        this.dialogFormVisible = false;
    },
    indexMethod(index){
       return (this.queryMap.pageNumber-1)*this.queryMap.pageSize+index+1;
    },
    created () {
    let that = this
    let heightStyle = that.$refs.tableCot.offsetHeight
    that.Height = heightStyle
  }
  }
};
</script>
<style scoped>
.el-dialog {width:80%}
</style>

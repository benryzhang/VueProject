<template>
  <div id="sensorinfo">

    <!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <!-- <el-card class="box-card"> -->
      <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
        <!-- <el-form-item label="传感器类型">
          <el-input v-model="queryMap.username" placeholder="请输入传感器类型查询"></el-input>
        </el-form-item>
        <el-form-item label="传感器名称">
          <el-input v-model="queryMap.ip" placeholder="请输入传感器名称查询"></el-input>
        </el-form-item>
        <el-form-item label="信息显示">
          <el-input v-model="queryMap.location" placeholder="请输入信息显示查询"></el-input>
        </el-form-item> -->
       
        <el-form-item>
          <el-button  icon="el-icon-refresh" @click="getAllProjectInfo('refresh')" type="primary">刷新结构</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button  
            icon="el-icon-plus"
            type="primary" 
            @click="addoredit('adds')">新建结构</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button @click="deleteFileOrDirectory(sels)" icon="el-icon-delete"  :disabled="this.sels.length === 0">批量</el-button>
        </el-form-item> -->
      </el-form>
      <!-- 表格区域 -->
      <template>
        <el-table 
        id="typecode"
          border
          stripe
          align="center"
          size="mini"
          :data="itemList"
          style="width: 100%;height:90%"
          max-height="872"
          >
          <el-table-column :index="indexMethod" type="index" fixed label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="structid" label="结构ID" fixed width="" align="center"  ></el-table-column>
          <el-table-column prop="structname" label="结构名称" width="" align="center"></el-table-column>
          <el-table-column prop="structtype" label="结构类型" width="" align="center" v-if="show"></el-table-column>
          <el-table-column prop="structtypename" label="结构类型" width="" align="center" ></el-table-column>
          <el-table-column prop="structinfo" label="结构说明" width="" align="center"></el-table-column>
          <el-table-column prop="longid" label="精度坐标" width="" align="center"></el-table-column>
          <el-table-column prop="latid" label="纬度坐标" width="" align="center"></el-table-column>
          <el-table-column prop="structflag" label="结构状态" width="" align="center" v-if="show"></el-table-column>
          <el-table-column prop="structflagname" label="结构状态" width="" align="center"></el-table-column>
          <el-table-column prop="structstatus" label="权限状态" width="" align="center" v-if="show"></el-table-column>
          <el-table-column prop="structstatusname" label="权限状态" width="" align="center"></el-table-column>
          <el-table-column prop="username" label="创建用户" width="" align="center"></el-table-column>
          <el-table-column prop="objurl" label="结构类型" width="" align="center"></el-table-column>
          <el-table-column prop="mtlurl" label="结构材质" width="" align="center"></el-table-column>
          <el-table-column prop="picurl" label="结构图片" width="" align="center"></el-table-column>
          <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button  @click="addoredit(scope.row)" type="text" size="small" >编辑</el-button>
        <el-button type="text" size="small"  @click="del(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>
          <!-- <el-table-column label="操作" width="100px;">
            <template slot-scope="scope">
              <el-button
               v-hasPermission="'loginLog:delete'"
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click="del(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column> -->
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
    <!-- </el-card> -->
    <!-- <el-dialog  :visible.sync="dialogFormVisible" append-to-body style="width:100%"> -->
    <jgglAddorEdit-page v-if="dialogFormVisible" ref="jgglAddorEdit"></jgglAddorEdit-page>
    <!-- <jcxtChannel-page v-if="dialogChannel" ref="jcxtChannel"></jcxtChannel-page> -->
    
  </div>
  
</template>

<script>
import axios from "axios";
import jgglAddorEdit from './jgglAddorEdit'

export default {
  inject:['reload'],
  data() {
    return {
      sels: [], //选中的值显示
      total: 0, //总共多少条数据
      itemList: [],
      Height:0,
      show:false,
      //filterList: [],
      btnLoading: false,
      btnDisabled: false,
      addDialogVisible: false, //添加弹框是否显示
      structure:{structure:this.GLOBAL.structure},
      sensortypelist: [],
      //queryMap: { pageNum: 1, pageSize: 10, location: "" } 
      queryMap:{monitparatype:'',monitpara:'',sensortype:'',username:'admin',pageNumber:1,pageSize:20,structure:this.GLOBAL.structure },//查询对象
      components: {
        jgglAddorEdit,
        //jcxtChannel
      },
      dialogFormVisible: false,
      dialogChannel:false,

      //addRuleForm: {}, //添加表单数据
      //editRuleForm: {}, //修改表单数据

    };
  },
  mounted() {
          this.getAllProjectInfo();
         },
 
  methods: {
    //搜索
    search() {
      // this.queryMap.pageNumber = 1;
      // this.getAllProjectInfo();
      // this.filterHandler();
    },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

    //加载传感器信息列表
    async getAllProjectInfo(re) {
      //this.handleCurrentChange('1');
      await this.$axios.get(this.api.getAllProjectInfo,
        {
          params: this.queryMap
         },
      ).then(response => {
        if( re === 'refresh'){
            //this.reload();
        }
         
        this.total = JSON.parse(response).total;
        //this.itemList = ''
        this.itemList = JSON.parse(response).rows;
        //console.log(this.itemList)
        //console.log(this.itemList)
        //var filtersList[];
        //  for (let i=0; i<this.itemList.length; i++){
        // //   //console.log(unique(this.itemList[i].sensortypecode));
        //    let filtersList = this.itemList[i].sensortypecode;
        //    console.log(filterlist);
        //    console.log(this.unique(filterlist));
        //    }
        //console.log(this.itemList[i].sensortypecode)()
      });

    },
    
    addoredit(row){
        //let roleId = id;
        this.dialogFormVisible = true
        console.log(row)
        //if(row != ""){
            this.$refs.jgglAddorEdit.getAllProjectInfo(row)
            this.$nextTick(()=>{
                this.$refs.jgglAddorEdit.init();
            })
       
        //}
        //else{

        //}
        //console.log(this.form.id)
        

      //this.$nextTick(() => {
      //      this.refs.jgglAddorEdit.init(id)
      //    })
    },
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getAllProjectInfo();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNumber = current;
      this.getAllProjectInfo();
    },
    //关闭弹出框
    //closeAddDialog() {
     // this.$refs.addRuleFormRef.clearValidate();
     // this.addRuleForm = {};
    //},
    //关闭弹出框
    //closeEditDialog() {
    //  this.$refs.editRuleFormRef.clearValidate();
    //  this.editRuleForm = {};
    //},
    /*----- 以下为图片处理代码 ------*/
    handleSuccess(response, file, fileList) {
      this.$success("上传成功");
    },
    handleError() {
      this.$error("上传失败,请重新上传图片!");
    },
    handleBeforeUpload(file) {
      const isImage = file.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handleProgress(event, file, fileList) {
      this.loading = true;  //  上传时执行loading事件
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
<style>
.el-dialog {width:80%}
</style>

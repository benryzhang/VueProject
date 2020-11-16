<template>
  <div id="sensorinfo">

    <!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
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
        <el-form-item label="传感器类型查询">
        <el-select clearable
            @change="searchinfobytype"
            @clear="searchinfobytype"
            v-model="queryMap.sensortype"
            placeholder="请选择传感器类型">
          <el-option
            v-for="sensortypecode in sensortypelist"
              :label="sensortypecode.name"
              :key="sensortypecode.type"
              :value="sensortypecode.type"
              >
              <span style="float: left">{{ sensortypecode.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ sensortypecode.type }}</span>
          </el-option>
        </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button  icon="el-icon-search" @click="search" type="primary">查询</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button  icon="el-icon-refresh" @click="getcgqbytandp('refresh')" type="primary">刷新</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button  
            icon="el-icon-plus"
            type="primary" 
            @click="addDialogVisible=true">添加</el-button>
        </el-form-item>
        <el-form-item>
          <download-excel
              class = "export-excel-wrapper"
              :data = "itemList"
              :fields = "json_fields"
              name = "传感器信息.xls">
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button icon="el-icon-download" type="primary">下载</el-button>
        </download-excel>
          <!-- <el-button  icon="el-icon-download" @click="search" type="primary">下载</el-button> -->
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-printer" @click="search" type="primary">打印</el-button>
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
          style="width: 100%;"
          :height="Height"
          max-height="872"
          >
          <el-table-column :index="indexMethod" type="index" fixed label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="sensortypecode" label="类型" fixed sortable width="100" align="center"  ></el-table-column>
          <el-table-column prop="sensorcode" label="编号" sortable width="" align="center"></el-table-column>
          <el-table-column prop="sensorname" label="名称" width="140" align="center"></el-table-column>
          <el-table-column prop="monitpara" label="监测参数" width="" align="center"></el-table-column>
          <el-table-column prop="position" label="具体位置" width="180" align="center"></el-table-column>
          <el-table-column prop="worktemp" label="工作温度" width="" align="center"></el-table-column>
          <el-table-column prop="antimois" label="抗潮湿指标" width="120" align="center"></el-table-column>
          <el-table-column prop="antiinterference" label="抗干扰能力" width="" align="center"></el-table-column>
          <el-table-column prop="impactvibration" label="抗冲振要求" width="" align="center"></el-table-column>
          <el-table-column prop="orientation" label="方向" width="60" align="center"></el-table-column>
          <el-table-column prop="powerreq" label="电源要求" width="90" align="center"></el-table-column>
          <el-table-column prop="sensorlife" label="寿命" width="60" align="center"></el-table-column>
          <el-table-column prop="sensorstatus" label="工作状态" width="80" align="center"></el-table-column>
          <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="90">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
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
    </el-card>
    <!-- 部门别添加弹出框 -->
      <el-dialog title="传感器信息" :visible.sync="addDialogVisible" width="60%" @close="closeAddDialog">
        <span>
          <el-form label-width="100px" class="demo-ruleForm" size="mini">
            <el-divider content-position="left">基本信息</el-divider>
              <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="传感器编号">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="传感器名称">
                                    <el-input></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="传感器类型">
                                  <el-select placeholder="传感器类型">
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="通道数量">
                                    <el-input></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="监测参数">
                                <el-select placeholder="监测参数">
                                  </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="工作状态">
                                    <el-select placeholder="工作状态">
                                  </el-select>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="尺寸">
                                    <el-input></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="方向">
                                    <el-input></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="位置">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="工作温度">
                                    <el-input></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="使用寿命">
                                    <el-input></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="电源要求">
                                    <el-input></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="抗潮湿指标">
                                <el-input></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="抗干扰能力">
                                    <el-input></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="抗冲振要求">
                                    <el-input></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="所在构件">
                                    <el-select placeholder="所在构件">
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="所在截面">
                                <el-select placeholder="所在截面">
                                  </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="监测断面">
                                    <el-input></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="虚拟传感器">
                                    <el-select placeholder="虚拟传感器">
                                      <el-option label="虚拟传感器" value="0"></el-option>
                                      <el-option label="非虚拟传感器" value="1"></el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="节点空间坐标">
                                    <el-input style="width: 33%"></el-input ><el-input style="width: 33%"></el-input><el-input style="width: 33%"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content bg-purple">
                            <el-form-item label="传感器图片" prop="logo">
                              <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
                                <!-- <el-upload
                                action="uploadUrl"
                                  :show-file-list="false"
                                  :accept="'image/*'"
                                  :on-success="handleSuccess"
                                  :on-error="handleError"
                                  :before-upload="handleBeforeUpload"
                                  :on-progress="handleProgress"
                                  
                                >
                                  <el-button type="primary" size="small">上传图片</el-button>
                                </el-upload> -->
                                <!--大图弹出框-->
                                <el-dialog :visible.sync="imgDialogVisible" size="full" :modal="false" title="查看大图片">
                                <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                                </el-form-item>
                        </div>
                    </el-col>
                    
                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content bg-purple">
                            <el-form-item label="安装方式">
                                <el-input type="textarea" ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    
                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content bg-purple">
                            <el-form-item label="备注">
                                <el-input type="textarea"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    
                   
                </el-row>
            <h5 style="margin: 0px;padding: 0px;"></h5>
            <el-divider content-position="left" >通道信息</el-divider>
            <!-- <el-form-item label="部门名称" prop="name">
              <el-input v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="办公电话" prop="phone">
              <el-input v-model="addRuleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="办公地址" prop="address">
              <el-input type="textarea" v-model="addRuleForm.address"></el-input>
            </el-form-item> -->
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add" :disabled="btnDisabled" :loading="btnLoading">保 存</el-button>
        </span>
      </el-dialog>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sels: [], //选中的值显示
      total: 0, //总共多少条数据
      itemList: [],
      Height:0,
      //filterList: [],
      btnLoading: false,
      btnDisabled: false,
      addDialogVisible: false, //添加弹框是否显示
      structure:{structure:this.GLOBAL.structure},
      sensortypelist: [],
      //queryMap: { pageNum: 1, pageSize: 10, location: "" } 
      queryMap:{monitparatype:'',monitpara:'',sensortype:'',pageNumber:1,pageSize:20,structure:this.GLOBAL.structure },//查询对象
      json_fields: {
		          "类型": "sensortypecode",
		          "编号": "sensorcode",
		          "名称": "sensorname", 
		          "监测参数": "monitpara", 
		          "具体位置": "position",
		          "工作温度": "worktemp",
		          "抗潮湿指标": "antimois", 
              "抗干扰能力": "antiinterference",
              "抗冲振要求": "impactvibration",
              "方向": "orientation",
              "电源要求": "powerreq",
              "寿命": "sensorlife",
              "工作状态": "sensorstatus"
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
          this.getcgqbytandp();
          //this.getMapWarnType();
          this.getallsensors();
          this.$nextTick(() => {
            this.Height = window.innerHeight - 240;
            //后面100一般是根据你上下导航栏的高度来减掉即可。
          })
         // getfilterlist();
             
         },
         inject:['reload'],
  methods: {
    //搜索
    search() {
      // this.queryMap.pageNumber = 1;
      // this.getcgqbytandp();
      // this.filterHandler();
    },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    // async getMapWarnType() {
    //   await this.$axios.get(this.api.getMapWarnType,{params:this.structure}).then(response => {
    //     const jsonb = response.replace(/type/g,'value')
    //     const jsonc =  JSON.parse(jsonb.replace(/name/g,'text'))
    //     let arr = []
    //     for(let i in jsonc){
    //       arr.push(jsonc[i])
    //     }
    //     this.filterList = jsonc
    //     //console.log(this.filterList)
    //   });  
    //   },
    //加载传感器信息列表
    async getcgqbytandp(re) {
      //this.handleCurrentChange('1');
      await this.$axios.get(this.api.getcgqbytandp,
        {
          params: this.queryMap
         },
      ).then(response => {
        if( re === 'refresh'){
            this.reload();
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
    /**
     * 加载所有传感器用于按传感器信息查询
     */
    async getallsensors() {
      await this.$axios.get(this.api.getMapWarnType,{params:this.structure}).then(response => {
        const sensortype = JSON.parse(response)
        this.sensortypelist = sensortype
      });
    },
    /**
     * 搜索传感器信息by 类型
     */
    searchinfobytype() {
      this.queryMap.pageNumber = 1;
      this.getcgqbytandp();
    },
    //删除登入日志
    // async del(id) {
    //   var res = await this.$confirm(
    //     "此操作将永久删除该登入日志, 是否继续?",
    //     "提示",
    //     {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }
    //   ).catch(() => {
    //     this.$message({
    //       type: "info",
    //       message: "已取消删除"
    //     });
    //   });
    //   if (res === "confirm") {
    //     const { data: res } = await this.$http.delete("loginLog/delete/" + id);
    //     if (res.code === 200) {
    //       this.$message.success("登入日志删除成功");
    //       this.getcgqbytandp();
    //     } else {
    //       this.$message.error(res.msg);
    //     }
    //   }
    // },
    //添加传感器信息
    add: function () {
      this.$refs.addRuleFormRef.validate(async valid => {
        if (!valid) {
          return;
        } else {
          (this.btnLoading = true), (this.btnDisabled = true);
          const {data: res} = await this.$http.post(
                  "sensorinfo/add",
                  this.addRuleForm
          );
          if (res.code === 200) {
            this.$message.success("部门添加成功");
            this.addRuleForm = {};
            this.getDepartmentList();
          } else {
            return this.$message.error("部门添加失败:" + res.msg);
          }
          this.addDialogVisible = false;
          (this.btnLoading = false), (this.btnDisabled = false);
        }
      });
    },
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getcgqbytandp();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNumber = current;
      this.getcgqbytandp();
    },
    //关闭弹出框
    closeAddDialog() {
      this.$refs.addRuleFormRef.clearValidate();
      this.addRuleForm = {};
    },
    //关闭弹出框
    closeEditDialog() {
      this.$refs.editRuleFormRef.clearValidate();
      this.editRuleForm = {};
    },
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

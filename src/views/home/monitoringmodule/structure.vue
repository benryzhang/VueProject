<template>
    <div class="dialog" v-show="showMask" :append-to-body="true">
        <div class="dialog-container">
            <div class="dialog-title">{{title}}</div>
            <div class="content">
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
                            :label="sensortypecode.text"
                            :key="sensortypecode.id"
                            :value="sensortypecode.id"
                            >
                            <span style="float: left">{{ sensortypecode.text }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ sensortypecode.id }}</span>
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
                            @click="addoredit('')">添加</el-button>
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
                    width="120">
                    <template slot-scope="scope">
                        <el-button  @click="addoredit(scope.row)" type="text" size="small" >编辑</el-button>
                        <el-button  @click="addoreditchannel(scope.row)" type="text" size="small" >通道</el-button>
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
                    </el-card>



            </div>
            <div class="btns">
                <div v-if="type != 'confirm'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
                <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                    {{confirmText}}
                </div>
            </div>
            <div class="el-dialog__headerbtn" @click="closeMask"><i class=" el-dialog__close el-icon el-icon-close"></i></div>
        </div>
        
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type:{
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,
            default: '关闭'
        },
    },
    data(){
        return{
            showMask: false,
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
      components: {
        //jcxtAddorEdit,
        //jcxtChannel
      },
      dialogFormVisible: false,
      dialogChannel:false,
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
        }
    },
    mounted() {
          this.getcgqbytandp();
          //this.getMapWarnType();
          //this.getallsensors();
        //   this.$nextTick(() => {
        //     this.Height = window.innerHeight - 240;
        //     //后面100一般是根据你上下导航栏的高度来减掉即可。
        //   })
          //this.$refs.dialog.open()
         // getfilterlist();
             
    },
    methods:{
        closeMask(){
            this.showMask = false;
        },
        closeBtn(){
            this.$emit('cancel');
            this.closeMask();
        },
        dangerBtn(){
            this.$emit('danger');
            this.closeMask();
        },
        confirmBtn(){
            this.$emit('confirm');
            this.closeMask();
        },
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
      console.log('getcgqbytandp')
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
      await this.$axios.get(this.api.getcgqlx,{params:this.GLOBAL.structure}).then(response => {
        //const sensortype = JSON.parse(response)
        this.sensortypelist = response
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
    //添加传感器信息 弹出添加页面
    //add: function () {
      // this.$refs.addRuleFormRef.validate(async valid => {
      //   if (!valid) {
      //     return;
      //   } else {
      //     (this.btnLoading = true), (this.btnDisabled = true);
      //     const {data: res} = await this.$http.post(
      //             "sensorinfo/add",
      //             this.addRuleForm
      //     );
      //     if (res.code === 200) {
      //       this.$message.success("部门添加成功");
      //       this.addRuleForm = {};
      //       this.getDepartmentList();
      //     } else {
      //       return this.$message.error("部门添加失败:" + res.msg);
      //     }
      //     this.addDialogVisible = false;
      //     (this.btnLoading = false), (this.btnDisabled = false);
      //   }
      // });
    //},

    addoredit(row){
        //let roleId = id;
        this.dialogFormVisible = true
        if(JSON.stringify(row) != "{}"){
          //console.log(row.sensorcode)
          this.$axios.get(this.api.getinfobykey,{params:{datatype:"cgq",code:row.sensorcode,structure:this.GLOBAL.structure}}).then(response => {
            //const sensortype = JSON.parse(response)
            this.$refs.jcxtAddorEdit.getinfobykey(JSON.parse(response))
            
            //this.sensorinfolist = response
            //console.log(this.sensorinfolist)
            this.$nextTick(()=>{
                this.$refs.jcxtAddorEdit.init();
            })
          });
        }
        else{

        }
        //console.log(this.form.id)
        

      //this.$nextTick(() => {
      //      this.refs.jcxtAddorEdit.init(id)
      //    })
    },
    addoreditchannel(row){
        //let roleId = id;
        this.dialogChannel = true
        if(JSON.stringify(row) != "{}"){
          //console.log(row.sensorcode)
          this.$axios.get(this.api.getinfobykey,{params:{datatype:"cgq",code:row.sensorcode,structure:this.GLOBAL.structure}}).then(response => {
            //const sensortypecode = response.sensortypecode
            //console.log('jcxt传值')
            this.$refs.jcxtChannel.getinfobykey(response)
          
            //this.sensorinfolist = response
            
             this.$nextTick(()=>{
                 this.$refs.jcxtChannel.init();
             })
          });
        }
        else{

        }
        //console.log(this.form.id)
        

      //this.$nextTick(() => {
      //      this.refs.jcxtAddorEdit.init(id)
      //    })
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
  
    },
    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="less" scoped>
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 999;
        .dialog-container{
            width: 1400px;
            height: 600px;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            position: relative;
            .dialog-title{
                width: 100%;
                height: 60px;
                text-align: center;
                font-size: 18px;
                color: #696969;
                font-weight: 600;
                padding: 16px 50px 0 20px;
                box-sizing: border-box;
            }
            .content{
                color: #797979;
                line-height: 26px;
                padding: 0 20px;
                box-sizing: border-box;
            }
            .inp{
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus{
                    border: 1px solid #509EE3;
                }
            }
            .btns{
                width: 100%;
                height: 60px;
                // line-height: 60px;
                position: absolute;
                bottom: 0;
                left: 0;
                text-align: right;
                padding: 0 16px;
                box-sizing: border-box;
                & > div{
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 8px;
                    margin-right: 12px;
                    cursor: pointer;
                }
                .default-btn{
                    color: #787878;
                    &:hover{
                        color: #509EE3; 
                    }
                }
                .danger-btn{
                    background: #EF8C8C;
                    &:hover{
                        background: rgb(224, 135, 135);
                    }
                    &:active{
                        background: #EF8C8C;
                    }
                }
                .confirm-btn{
                    color: #ffffff;
                    background: #509EE3;
                    &:hover{
                        background: #6FB0EB;
                    }
                }
            }
            .close-btn:before {
                content: "\e6db";
            }
            .close-btn{
                position: absolute;
                top: 16px;
                right: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    font-weight: 600;
                }
            }
        }
    }
</style>
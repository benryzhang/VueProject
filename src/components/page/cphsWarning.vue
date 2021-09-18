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
        <div>
          <el-form-item>
          <el-radio-group v-model="radio">
            <el-radio :label="1" @change="initRealTimeWarn()" >实时监测</el-radio>
            <el-radio :label="2" @change="initHistoryWarn()">历史查看</el-radio>
          </el-radio-group>
          <el-form-item label="预警时间" v-if="flag" class="demonstration"> 
          <!-- <span  v-if="flag">预警时间</span> -->
          <el-date-picker
            v-model="value1"
            v-if="flag"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            
            >
          </el-date-picker>
           <el-button type="primary" > &nbsp;查询 </el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item label="预警时长">
        <el-select clearable
            @change="getWarn"
            @clear="getWarn"
            v-model="warn"
            placeholder="请选择检测时间">
          <el-option
            v-for="item in warninfolist"
              :label="item.text"
              :key="item.id"
              :value="item.id"
              >
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="处置结果">
        <el-select clearable
            @change="getResult"
            @clear="getResult"
            v-model="result"
            placeholder="请选择处置结果">
          <el-option
            v-for="item in resultinfolist"
              :label="item.text"
              :key="item.id"
              :value="item.id"
              >
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="传感器类型">
        <el-select clearable
            @change="getSensor"
            @clear="getSensor"
            v-model="sensor"
            placeholder="请选择传感器类型">
          <el-option
            v-for="item in sensorinfolist"
              :label="item.text"
              :key="item.id"
              :value="item.id"
              >
          </el-option>
        </el-select>
        </el-form-item>
        
        </div>
        <!-- <el-form-item>
          <el-button  icon="el-icon-search" @click="search" type="primary">查询</el-button>
        </el-form-item> -->
      <div>
        <el-form-item>
          <el-button  icon="el-icon-refresh" @click="getDamageInfoData('refresh')" type="primary">刷新</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button  
            icon="el-icon-plus"
            type="primary" 
            @click="addItem">添加</el-button>
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
        </div>
        
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
          <el-table-column prop="errtype" label="预警级别" width="140" align="center"  ></el-table-column>
          <el-table-column prop="errstarttime" label="预警开始时间" width="200" align="center"></el-table-column>
          <el-table-column prop="errendtime" label="预警结束时间" width="200" align="center"></el-table-column>
          <el-table-column prop="sensortypecode" label="传感器类型" width="140" align="center"></el-table-column>
          <el-table-column prop="sensortypename" label="传感器类型" width="140" align="center"></el-table-column> 
          <el-table-column prop="sensorcode" label="传感器" width="140" align="center"></el-table-column>
          <el-table-column prop="channelcode" label="传感器通道" width="140" align="center"></el-table-column>
          <el-table-column prop="inspector" label="传感器通道" width="140" align="center"></el-table-column>
          <el-table-column prop="componentname" label="所在构件" width="140" align="center"></el-table-column>

          <el-table-column prop="alarmcontent" label="预警内容" width="200" align="center"  ></el-table-column>
          <el-table-column prop="errval" label="监测值" width="200" align="center"></el-table-column>
          <el-table-column prop="alarmvalue" label="预警值" width="200" align="center"></el-table-column>
          <el-table-column prop="maxerrval" label="最大监测值" width="200" align="center"></el-table-column>
          <el-table-column prop="maxerrtime" label="最大监测值时间" width="200" align="center"></el-table-column> 
          <el-table-column prop="level2flg" label="是否进行二级评定" width="200" align="center"></el-table-column>
          <el-table-column prop="specialflg" label="是否进行专项评定" width="200" align="center"></el-table-column>
          <el-table-column prop="handleopinion" label="处置意见" width="200" align="center"></el-table-column>
          <el-table-column prop="handleflg" label="处置结果" width="200" align="center"></el-table-column>

          <el-table-column prop="handleflgname" label="处置结果" width="" align="center"  ></el-table-column>
          <el-table-column prop="handleuserid" label="处置者" width="" align="center"></el-table-column>
          <el-table-column prop="handletime" label="处置时间" width="" align="center"></el-table-column>
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
    </el-card>
    <!-- <el-dialog  :visible.sync="dialogFormVisible" append-to-body style="width:100%"> -->
      <!--弹框组件开始-----------------------start-->
    <standardPanel-page
      v-if="dialogFormVisible"
      ref="standardPanel"
      :dialog-title="dialogTitle"
      :item-info="tableItem"
      @closeDialog="closeDialog"
    ></standardPanel-page>
    <!--弹框组件开始-----------------------end-->
    <!-- <standardPanel-page v-if="dialogFormVisible" ref="standardPanel" :dialog-title="dialogTitle"
      :item-info="tableItem"
      @closeDialog="closeDialog"></standardPanel-page> -->
    <!-- <jcxtChannel-page v-if="dialogChannel" ref="jcxtChannel"></jcxtChannel-page> -->
    
  </div>
  
</template>

<script>
import axios from "axios";
import standardPanel from './standardPanel'

export default {
  data() {
    return {
      value1:this.getNowTime(),
      //value1: '',
      warnFlag:"R",
      warn:'',
      result:'',
      sensor:'',
      flag:false,
      formData:[],
      warninfolist: [],
      resultinfolist: {},
      sensorinfolist: {},
      sels: [], //选中的值显示
      total: 0, //总共多少条数据
      itemList: [],
      Height:0,
      radio: 1,
      //filterList: [],
      damagetypelist:[],
      scalelist:[],
      btnLoading: false,
      btnDisabled: false,
      addDialogVisible: false, //添加弹框是否显示
      structure:{structure:this.GLOBAL.structure},
      
      //queryMap: { pageNum: 1, pageSize: 10, location: "" } 
      queryMap:{warn:'',result:'',sensor:'',para:'',pageNumber:1,pageSize:50,structure:this.GLOBAL.structure },//查询对象
      components: {
        standardPanel,
      },
      dialogFormVisible: false,
      dialogChannel:false,
      dialogTitle: "添加检测信息",
      tableItem: {
        testdate:'',
        blocktype: '',
        componentid:'',
        damagetype: '',
        scale: '',
        qualitativedescription: '',
        quantitativedescription: '',
        damagelocation: '',
        damagedescription: '',
        inspector: '',
        damagepicture:''
      },
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
      addRuleForm: {}, //添加表单数据
      editRuleForm: {}, //修改表单数据

    };
  },
  mounted() {
          this.getInitWarnInfo();
          
          //this.getMapWarnType();
          //this.getDamageInfoList();
          this.$nextTick(() => {
            this.Height = window.innerHeight - 240;
            //后面100一般是根据你上下导航栏的高度来减掉即可。
          })
          //this.$refs.dialog.open()
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
    async getInitWarnInfo() {
      var prm = {maincode:'DefaultWarnType',maincodename:'',structure:this.GLOBAL.structure}
      await this.$axios.get(this.api.getInitWarnInfo,{params:prm}).then(response => {
        //console.log(JSON.parse(response).root)
        this.warninfolist = JSON.parse(response).warn;
        this.resultinfolist = JSON.parse(response).result;
        this.sensorinfolist = JSON.parse(response).sensor;
        this.warn = this.warninfolist[0].id;
        this.result = this.resultinfolist[1].id;
        this.sensor = this.sensorinfolist[0].id;
        this.getyjxxinfo();
      }).catch(response=>{
          console.log(response);
      });
    },
    initHistoryWarn(){
      this.warnFlag = "H";
      this.flag = true;
    },
    initRealTimeWarn(){
      this.warnFlag = "R";
      this.flag = false;
    },
    async getyjxxinfo() {
      var url=""
      //console.log(this.warninfolist)
      if(this.warnFlag=="R"){
				await this.$axios.get(this.api.getyjpgdatas,{params:{warn:this.warn,result:this.result,sensor:this.sensor,pageNumber:this.queryMap.pageNumber,pageSize:this.queryMap.pageSize,structure:this.GLOBAL.structure}}).then(response => {
		   
         var dataObj = JSON.parse(response);
         console.log(dataObj);
			 	// if(dataObj.total!=0){
			 	// 	$("#z_yjpg").datagrid('loadData',dataObj); 
			 	// }else{
			 	// 	var loadData={"total":0,"rows":[]};
			 	// 	$("#z_yjpg").datagrid('loadData',loadData);  
			 	// }			 				
      }).catch(response=>{
          console.log(response);
      })
			}else{
        await this.$axios.get(this.api.getyjpgdatasbystime,{params:{warn:this.warninfolist.id,result:this.resultinfolist.id,sensor:this.sensorinfolist.id,pageNumber:this.queryMap.pageNumber,pageSize:this.queryMap.pageSize,structure:this.GLOBAL.structure}}).then(response => {
		   
			 	var dataObj = JSON.parse(response);
			 	// if(dataObj.total!=0){
			 	// 	$("#z_yjpg").datagrid('loadData',dataObj); 
			 	// }else{
			 	// 	var loadData={"total":0,"rows":[]};
			 	// 	$("#z_yjpg").datagrid('loadData',loadData);  
			 	// }			 				
      }).catch(response=>{
          console.log(response);
      })
			}
       
        
      
      // var prm = {maincode:'DefaultWarnType',maincodename:'',structure:this.GLOBAL.structure}
      // await this.$axios.get(this.api.getInitWarnInfo,{params:prm}).then(response => {
      //   //console.log(JSON.parse(response).root)
      //   this.warninfolist = JSON.parse(response).warn
      //   this.resultinfolist = JSON.parse(response).result
      //   this.sensorinfolist = JSON.parse(response).sensor
      //   this.formData.warn = this.warninfolist[0].id
      //   this.formData.result = this.resultinfolist[1].id
      //   this.formData.sensor = this.sensorinfolist[0].id
      //   console.log(this.warninfolist)
      //   //console.log(this.damageinfolist)
      // });
    },
     
      // async initWarnInfo() {
      // //this.handleCurrentChange('1');
      // //alert('sd')
      // //var info={maincode:'DefaultWarnType',maincodename:'',structure:this.GLOBAL.structure};
      // await this.$axios.get(this.api.initWarnInfo,{params: {maincode:'DefaultWarnType',maincodename:'',structure:this.GLOBAL.structure}}).then(response => {
      //   //if( re === 'refresh'){
      //    //   this.reload();
      //   //}
      //   console.log(response)
        
        //this.total = JSON.parse(response).total;
        //this.itemList = ''
        //this.itemList = JSON.parse(response).rows;

        
        
        //console.log(this.itemList)
        
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
      //});

    //},
    scaleFormat(row, column, data){
     // console.log(row.scale)
      // this.$axios.get(this.api.getScaleListByDamageType,{params:{type:row.scale,structure:this.structure}}).then(response => {
      //     this.scalelist = response
      //     //console.log(this.damagetypelist)
      // });
      // this.$axios.get(this.api.getScaleListByDamageType,{params:{type:row.damagetype,structure:this.GLOBAL.structure}}).then(response => {
      //     this.damagetypelist = response
      //     //console.log(this.damagetypelist)
      //     //console.log(this.damagetypelist)
      //   });  
      return  this.scalelist.map((item, index) => {
        if(row.scale == item.scale ){
           return item.qualitativedescription;
        }
      });

    },
    /**
     * 加载所有传感器用于按传感器信息查询
     */
    // async getDamageInfoList() {
    //   await this.$axios.get(this.api.getDamageInfoList,{params:this.structure}).then(response => {
    //     //console.log(JSON.parse(response).root)
    //     this.damageinfolist = JSON.parse(response).root
    //     //console.log(this.damageinfolist)
    //   });
    // },
    /**
     * 搜索传感器信息by 类型
     */
    searchinfobytype() {
      this.queryMap.pageNumber = 1;
      this.getDamageInfoData();
    },
    getWarn(item){
			  let warnobj = {};//定义对象集合
        warnobj = this.warninfolist.find(project => {//projectlist 为Select遍历集合 project 为Select 遍历 对象
            return project.id === item; //筛选出匹配数据 返回对象
        });
        //console.log(warnobj.text); //name Select中 对象 label
        this.warn = warnobj.id;//id Select 中 对象 id
    },
    getResult(item){
        let resultobj = {};//定义对象集合
        resultobj = this.resultinfolist.find(project => {//projectlist 为Select遍历集合 project 为Select 遍历 对象
            return project.id === item; //筛选出匹配数据 返回对象
        });
        this.result = resultobj.id;//id Select 中 对象 id
    },
    getSensor(item){
        let sensorobj = {};//定义对象集合
        sensorobj = this.sensorinfolist.find(project => {//projectlist 为Select遍历集合 project 为Select 遍历 对象
            return project.id === item; //筛选出匹配数据 返回对象
        });
        this.sensor = sensorobj.id;//id Select 中 对象 id
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
    addItem(){
      console.log('add')
      this.tableItem = {
        testdate:'',
        blocktype:'',
        componentid: '',
        damagetype:'',
        scale:'',
        qualitativedescription:'',
        quantitativedescription:'',
        damagelocation:'',
        damagedescription:'',
        inspector:'',
        damagepicture:''
      };
      this.dialogTitle = "添加检测信息";
      this.dialogFormVisible = true;
       this.$nextTick(()=>{
                //this.$refs.standardPanel.init();
                this.$refs["standardPanel"].dialogFormVisible = true;

            })
      // this.$nextTick(() => {
      //   this.$refs["standardPanel"].dialogFormVisible = true;
      // });
    },

    addoredit(row){
        //let roleId = id;
        this.dialogFormVisible = true
        console.log(JSON.stringify(row))
        if(JSON.stringify(row) === 'add'){
           console.log('zengjiasdsdas')
          //console.log(row.sensorcode)
        }
        else{
         
          this.$axios.get(this.api.getDamageDataById,{params:{type:'Info',testdate:row.testdate,blocktype:row.blocktype,componentid:row.componentid,damagetype:row.damagetype,scale:row.scale,structure:this.GLOBAL.structure}}).then(response => {
            //const sensortype = JSON.parse(response)
            this.$refs.standardPanel.getinfobykey(JSON.parse(response))
            
            //this.sensorinfolist = response
            //console.log(this.sensorinfolist)
            
          });
        }
        this.$nextTick(()=>{
                this.$refs.standardPanel.init();
            })
        //console.log(this.form.id)
        

      //this.$nextTick(() => {
      //      this.refs.jcxtAddorEdit.init(id)
      //    })
    },
    
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getDamageInfoData();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNumber = current;
      this.getDamageInfoData();
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
    getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); //得到年份
	       var month = now.getMonth(); //得到月份
	       var date = now.getDate(); //得到日期
	       var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
	       var defaultDate = `${year}-${month}-${date}${hour}`;
         console.log(defaultDate)
         //this.value1 = defaultDate
	       return defaultDate;
	       //this.$set(this.value1, defaultDate);
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
.demonstration{padding-left: 20px}
/* .el-range-editor{display: none;} */
</style>

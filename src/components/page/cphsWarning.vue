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
        <el-form-item label="预警时长">
        <el-select clearable
            @change="searchinfobytype"
            @clear="searchinfobytype"
            v-model="queryMap.sensortype"
            placeholder="请选择检测时间">
          <el-option
            v-for="item in damageinfolist"
              :label="item.name"
              :key="item.code"
              :value="item.code"
              >
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="处置结果">
        <el-select clearable
            @change="searchinfobytype"
            @clear="searchinfobytype"
            v-model="queryMap.sensortype"
            placeholder="请选择处置结果">
          <el-option
            v-for="item in damageinfolist"
              :label="item.name"
              :key="item.code"
              :value="item.code"
              >
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="传感器类型">
        <el-select clearable
            @change="searchinfobytype"
            @clear="searchinfobytype"
            v-model="queryMap.sensortype"
            placeholder="请选择传感器类型">
          <el-option
            v-for="item in damageinfolist"
              :label="item.name"
              :key="item.code"
              :value="item.code"
              >
          </el-option>
        </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button  icon="el-icon-search" @click="search" type="primary">查询</el-button>
        </el-form-item> -->
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
        <el-form-item>
          <el-radio-group v-model="radio">
            <el-radio :label="3">实时监测</el-radio>
            <el-radio :label="6">历史查看</el-radio>
          </el-radio-group>
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
          <el-table-column prop="testdate" label="检测时间" fixed sortable width="200" align="center"  ></el-table-column>
          <el-table-column prop="blocktype" label="构件类型" width="" align="center"></el-table-column>
          <el-table-column prop="componentid" label="构件ID" width="140" align="center"></el-table-column>
          <el-table-column prop="damagelocation" label="病害部位描述" width="" align="center"></el-table-column>
          <el-table-column prop="damagetype" label="病害类型" width="" align="center"></el-table-column> 
          <!-- :formatter="damagetypeFormat"  :formatter="((row,column)=>{return scaleFormat(row, column, cellValue, index)})" -->
          <el-table-column prop="damagedescription" label="病害描述" width="" align="center"></el-table-column>
          <el-table-column prop="scale" label="病害标度" width="" align="center"></el-table-column>
          <el-table-column prop="inspector" label="检测人" width="" align="center"></el-table-column>
          <el-table-column prop="damagepicture" label="病害图片" width="" align="center"></el-table-column>
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
      sels: [], //选中的值显示
      total: 0, //总共多少条数据
      itemList: [],
      Height:0,
      radio: 3,
      //filterList: [],
      damagetypelist:[],
      scalelist:[],
      btnLoading: false,
      btnDisabled: false,
      addDialogVisible: false, //添加弹框是否显示
      structure:{structure:this.GLOBAL.structure},
      damageinfolist: [],
      //queryMap: { pageNum: 1, pageSize: 10, location: "" } 
      queryMap:{para:'',pageNumber:1,pageSize:20,structure:this.GLOBAL.structure },//查询对象
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
          this.getDamageInfoData();
          //this.getMapWarnType();
          this.getDamageInfoList();
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
    async getDamageInfoData(re) {
      //this.handleCurrentChange('1');
      await this.$axios.get(this.api.getDamageInfoData,
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
    async getDamageInfoList() {
      await this.$axios.get(this.api.getDamageInfoList,{params:this.structure}).then(response => {
        //console.log(JSON.parse(response).root)
        this.damageinfolist = JSON.parse(response).root
        //console.log(this.damageinfolist)
      });
    },
    /**
     * 搜索传感器信息by 类型
     */
    searchinfobytype() {
      this.queryMap.pageNumber = 1;
      this.getDamageInfoData();
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

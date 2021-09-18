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
        <el-form-item label="检测时间查询">
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
            @click="addPannel">添加</el-button>
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
          <el-table-column prop="damagepicture" label="病害图片" align="center" width="150px" padding="0px">
                        <!--            <template slot-scope="scope">-->
                        <!--              <img-->
                        <!--                slot="error"-->
                        <!--                :src="'https://www.zykhome.club/'+scope.row.damagepicture"-->
                        <!--                alt-->
                        <!--                style="width: 55px;height:55px"-->
                        <!--              />-->
                        <!--            </template>-->
                        <template slot-scope="scope">
                            <el-popover placement="right" trigger="hover">
                                <img :src="'https://www.zykhome.club/'+scope.row.damagepicture"
                                     style="height: 200px;width: 200px"/>
                                <img slot="reference" :src="scope.row.damagepicture"
                                     :alt="scope.row.damagepicture" style="height: 38px;width: 38px;cursor: pointer">
                            </el-popover>
                        </template>
                    </el-table-column>
          <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button  @click="editPannel(scope.$index, scope.row)" type="text" size="small" >编辑</el-button>
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
      <transition name="dialog-fade">
<el-dialog  :title="dialogTitle" :visible.sync="dialogFormVisible" append-to-body width="60%" class="abow_dialog" @open = "open" v-if="dialogFormVisible" @close="closeDialog('damageinfolist')">
    <detectionPanel-page
      v-if="dialogFormVisible"
      ref="detectionPanel"
      :dialog-title="dialogTitle"
      :item-info="tableItem"
      @closeDialog="closeDialog"
    ></detectionPanel-page>
    <!-- 确定按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="onSubmit('damageinfolist')" >保 存</el-button>
        </span>
    </el-dialog>
    
</transition>

    <!--弹框组件开始-----------------------end-->
    <!-- <detectionPanel-page v-if="dialogFormVisible" ref="detectionPanel" :dialog-title="dialogTitle"
      :item-info="tableItem"
      @closeDialog="closeDialog"></detectionPanel-page> -->
    <!-- <jcxtChannel-page v-if="dialogChannel" ref="jcxtChannel"></jcxtChannel-page> -->
    
  </div>
  
</template>

<script>
import axios from "axios";
import detectionPanel from './detectionPanel'

export default {
  name: "DialogDemo",
  components: {detectionPanel},
  data() {
    return {
      addOperate: undefined,
      sels: [], //选中的值显示
      total: 0, //总共多少条数据
      itemList: [],
      Height:0,
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
      // json_fields: {
		  //         "类型": "sensortypecode",
		  //         "编号": "sensorcode",
		  //         "名称": "sensorname", 
		  //         "监测参数": "monitpara", 
		  //         "具体位置": "position",
		  //         "工作温度": "worktemp",
		  //         "抗潮湿指标": "antimois", 
      //         "抗干扰能力": "antiinterference",
      //         "抗冲振要求": "impactvibration",
      //         "方向": "orientation",
      //         "电源要求": "powerreq",
      //         "寿命": "sensorlife",
      //         "工作状态": "sensorstatus"
      //       },
      //       json_meta: [
		  //         [
		  //           {
		  //             " key ": " charset ",
		  //             " value ": " utf- 8 "
		  //           }
		  //         ]
      //       ],
      //addRuleForm: {}, //添加表单数据
      //editRuleForm: {}, //修改表单数据

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
    editPannel(index, row) {
        this.dialogFormVisible = true;
        this.addOperate = false;
        this.dialogTitle = "编辑设备信息";
        this.$nextTick(()=>{
          this.$refs.detectionPanel.dataInit(row);
        });
    },
    addPannel(){
        this.dialogTitle = "添加设备信息";
        this.dialogFormVisible = true;
        this.addOperate = true;
    },
    
    onSubmit(formName){
      this.$refs.detectionPanel.validataForm('damageinfolist');
        //需要提交的form表单
        //console.log('tijiao')
        //console.log(this.$refs.detectionPanel)
        const formData = this.$refs.detectionPanel.damageinfolist;
        console.log(formData)
        if (this.addOperate) {
          //axious 添加新增
          console.log('添加新增')
        }else{
          console.log('编辑修改')
          //axious 编辑修改
          this.$refs[damageinfolist].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
          // async saveAddDamageDataInfo(formName){
console.log(formName)
          //this.$refs.detectionPanel.validate((valid) => {
            this.$refs[formName].validate(valid => {
              console.log('zou')
            if (valid) {
                /* formData格式提交： */
                //this.$delete(this.damageinfolist,'fm')
                const qs = require('qs');
                let formData = JSON.stringify(this.damageinfolist)
                // let formData = new FormData();
                // //console.log(this.damageinfolist.testdate)
                //     formData.append('testdate', '2020-12-10 16:01:27');
                //     formData.append('blocktype', this.blocktype);
                //     formData.append('componentid', this.componentid);
                //     formData.append('damagetype', this.damagetype);
                //     formData.append('scale', this.scale);
                //     formData.append('qualitativedescription', this.qualitativedescription);
                //     formData.append('quantitativedescription', this.quantitativedescription);
                //     formData.append('damagelocation', this.damagelocation);
                //     formData.append('damagedescription', this.damagedescription);
                //     formData.append('inspector', this.inspector);
                //     formData.append('damagepicture', this.damagepicture);
                
                //this.damageinfolist.testdate = '2020-12-10 00:00:00'
                //this.dateFormat(this.damageinfolist.testdate)
                //console.log(moment(this.damageinfolist.testdate).format('YYYY-MM-DD HH-mm'))
                //const createDate = this.$moment(this.addTime.createDate).format('YYYY-MM-DD HH:mm:ss')
                //const data  =  moment("12/10/2020 00:00:00").format('YYYY-MM-DD HH:mm:ss')
                //console.log(createDate)   //    "2019-05-25 08:23:56"
                //console.log(this.dateFormat(this.damageinfolist.testdate))
                
                this.damageinfolist.testdate = this.$moment(this.addTime.createDate).format('YYYY-MM-DD HH:mm:ss')
                //const prm = {type:'Info',data:JSON.stringify(this.damageinfolist),structure:this.GLOBAL.structure}
                const prm = qs.stringify({type:'Info',data:JSON.stringify(this.damageinfolist),structure:this.GLOBAL.structure})
                console.log(prm)
                this.$axios.post(this.api.saveAddDamageDataInfo,prm).then(response => {
                   // this.szgjbhlist = response
                   const result = JSON.parse(response)
                   console.log(result)
                   if(result.msg != '操作成功'){
                            this.$message({
                            message: '传感器信息保存失败',
                            center: true
                        });
                   }else{
                       this.damageinfolist = {}
                       this.$message({
                           
                            message: '传感器信息保存成功',
                            type: 'success',
                            center: true
                        });
                        this.closeDialog()
                   }
                    
                })
                .catch(err => {
	
                })
            } else {
                this.$message({
                    message: '请完善传感器基本信息',
                    center: true
                    });
                return false;
            }
            });
        }
 
    },
    // addItem(){
    //   console.log('add')
    //   this.tableItem = {
    //     testdate:'',
    //     blocktype:'',
    //     componentid: '',
    //     damagetype:'',
    //     scale:'',
    //     qualitativedescription:'',
    //     quantitativedescription:'',
    //     damagelocation:'',
    //     damagedescription:'',
    //     inspector:'',
    //     damagepicture:''
    //   };
    //   this.dialogTitle = "添加检测信息";
    //   this.dialogFormVisible = true;
    //   console.log(this.dialogTitle)
    //   //this.$nextTick(()=>{
    //             //this.$refs.detectionPanel.init();
    //             //this.$refs["detectionPanel"].dialogFormVisible = true;
    //         //})
    //   // this.$nextTick(() => {
    //   //   this.$refs["detectionPanel"].dialogFormVisible = true;
    //   // });
    // },







      // filterHandler(value, row, column) {
      //   const property = column['property'];
      //   return row[property] === value;
      // },
      
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
        //this.itemList.damagepicture = 'sensor/ACC.png'
        //console.log(this.itemList.damagepicture)
        //console.log(this.itemList)

        
        
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
    
    // 编辑操作
    // editRow(row,state) {
    //   if(state==0){
    //     console.log('edit')
    //     row.isDel=0
    //     this.tableItem = row;
    //     this.dialogTitle = "编辑检测信息";
    //     this.dialogFormVisible = true;
    //     this.$nextTick(() => {
    //       this.$refs.detectionPanel.init();
    //         //this.$refs["detectionPanel"].dialogFormVisible = true;
    //     });
    //   }else{
    //       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //        row.isDel=1
    //        this.tableItem = row;
    //        this.postRequest("/asset/setAsset", this.tableItem).then(res => {
    //            this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //             });
    //             this.fetchData()
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });          
    //     });
    //   }
    // },
    // addoredit(row){
    //     //let roleId = id;
    //     this.dialogFormVisible = true
    //     console.log(JSON.stringify(row))
    //     if(JSON.stringify(row) === 'add'){
    //        console.log('zengjiasdsdas')
    //       //console.log(row.sensorcode)
    //     }
    //     else{
         
    //       this.$axios.get(this.api.getDamageDataById,{params:{type:'Info',testdate:row.testdate,blocktype:row.blocktype,componentid:row.componentid,damagetype:row.damagetype,scale:row.scale,structure:this.GLOBAL.structure}}).then(response => {
    //         //const sensortype = JSON.parse(response)
    //         this.$refs.detectionPanel.getinfobykey(JSON.parse(response))
            
    //         //this.sensorinfolist = response
    //         //console.log(this.sensorinfolist)
            
    //       });
    //     }
    //     this.$nextTick(()=>{
    //             this.$refs.detectionPanel.init();
    //         })
    //     //console.log(this.form.id)
        

    //   //this.$nextTick(() => {
    //   //      this.refs.jcxtAddorEdit.init(id)
    //   //    })
    // },
    // 关闭 Modal 执行
    closeDialog() {
        
        //his.dialogFormVisible = false
        //this.$refs.damageinfolist.resetFields();
        //this.reload()
        //this.$refs["damageinfolist"].resetFields();
        this.dialogFormVisible = false;
        //this.$emit("closeDialog", flag);
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

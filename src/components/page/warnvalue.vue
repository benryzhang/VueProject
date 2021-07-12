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
        <el-form-item label="按传感器类型查询">
        <el-select clearable
            @change="search"
            @clear="search"
            v-model="queryMap.sensortype"
            placeholder="请选择传感器类型">
          <el-option
            v-for="item in searchlist"
              :label="item.text"
              :key="item.id"
              :value="item.id"
              >
              <span style="float: left">{{ item.text }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
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
          <el-table-column prop="sensortypecode" label="传感器类型" fixed sortable align="center"  v-if="show"></el-table-column>
          <el-table-column prop="sensortypename" label="传感器类型" fixed sortable  align="center"  ></el-table-column>
          <el-table-column prop="channelcode" label="传感器" width="160" align="center"></el-table-column>
          <el-table-column prop="channelname" label="传感器通道"  width="160" align="center"></el-table-column>
          <el-table-column prop="alarmcontent" label="预警内容" width="" align="center"></el-table-column>
          <el-table-column prop="alarmlevel" label="预警级别" width="" align="center"  v-if="show"></el-table-column> 
          <el-table-column prop="alarmlevelname" label="预警级别" width="" align="center"></el-table-column> 
          <!-- :formatter="damagetypeFormat"  :formatter="((row,column)=>{return scaleFormat(row, column, cellValue, index)})" -->
          <el-table-column prop="dataunit" label="单位" width="" align="center"></el-table-column>
          <el-table-column prop="limitkind" label="预警阈值类型" width="" align="center"  v-if="show"></el-table-column> 
          <el-table-column prop="limitkindname" label="预警阈值类型" width="" align="center"></el-table-column>
          <el-table-column prop="describe" label="描述" width="" align="center"></el-table-column>
          <el-table-column prop="designval" label="预警设计值" width="" align="center"></el-table-column>
          <el-table-column prop="alarmrate" label="预警倍率" width="" align="center"></el-table-column>
          <el-table-column prop="alarmvalue" label="实际预警值" width="" align="center"></el-table-column>
          <el-table-column prop="isvisible" label="预警是否可见" width="" align="center" v-if="show"></el-table-column>
          <el-table-column prop="isvisiblename" label="预警是否可见" width="" align="center"></el-table-column>
          <el-table-column prop="graphname" label="预警是否可见" width="" align="center" v-if="show"></el-table-column>
          <el-table-column prop="interval" label="预警是否可见" width="" align="center" v-if="show"></el-table-column>
          
          <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="120">
      <template v-slot="prm" >
        <el-button  @click="editPannel(prm.$index, prm.row)" type="text" size="small" >编辑</el-button>
        <el-button type="text" size="small"  @click="del(prm.row.sensortypecode, prm.row.alarmcontent, prm.row.alarmlevel, prm.row.sensorcode, prm.row.channelcode, prm.row.limitkind)">删除</el-button>
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
        <warnvaluePanel-page
          v-if="dialogFormVisible"
          ref="warnvaluePanel"
          :dialog-title="dialogTitle"
          :item-info="tableItem"
          @closeDialog="closeDialog"
        ></warnvaluePanel-page>
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
import warnvaluePanel from './warnvaluePanel'


export default {
  data() {
    return {
      addOperate: undefined,
      savetype:'',
      itemList: [],
      Height:0,
      show:false,
      total:0,
      searchlist:[],
      reformList:[],
      infoform: [],
      queryMap:{pageNumber:1,pageSize:20,sensortype:'',monitparatype:'',monitpara:'',structure:this.GLOBAL.structure },//查询对象
      components: {
        warnvaluePanel,
      },
      dialogFormVisible: false,
      dialogTitle: "添加预警值信息",
      tableItem: {
            alarmcontent: "",
            alarmlevel: "",
            alarmlevelname: "",
            alarmrate: "",
            alarmvalue: "0.",
            channelcode: "",
            channelname: "",
            dataunit: "",
            describe: "",
            designval: "",
            graphname: "",
            interval: "",
            isvisible: "",
            isvisiblename: "",
            limitkind: "",
            limitkindname: "",
            sensorcode: "",
            sensorname: "",
            sensortypecode: "",
            sensortypename: ""
      },
      json_fields: {
        传感器类型:"sensortypecode",
            传感器类型名称:"sensortypename",
            传感器编号:"sensorcode",
            传感器名称:"sensorname",
            通道编号:"channelcode",
            通道名称:"channelname",
            预警内容:"alarmcontent",
            预警级别:"alarmlevel",
            预警级别名称:"alarmlevelname",
            倍率:"alarmrate",
            预警值:"alarmvalue",
            单位:"dataunit",
            描述:"describe",
            设计值:"designval",
            传感器类型:"graphname",
            实际值:"interval",
            是否可见:"isvisible",
            是否可见:"isvisiblename",
            预警阈值类型:"limitkind",
            预警阈值类型:"limitkindname"
           
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
      await this.$axios.get(this.api.getAllAlarmInfo,
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
      await this.$axios.get(this.api.getcgqlx,{params:this.GLOBAL.structure}).then(response => {
        //const lins = []
        this.searchlist = response
        
        // for (let i = 0; i < response.length; i++) {
        //   let lins = response[i]
        //   //this.reformList.push(response.id)
        //   this.reformList.push({'id': response.id, 'text': response.text})
        // }
        // for (let item of response) {
        //       this.reformList.push(item)
        // }
        // console.log(this.reformList,'reformList')
        // //lins = JSON.parse(response)
        // JSON.parse(response).forEach((item,i) => {
        //   lins.push({lins:item.children});
            
        //     //item.age = 27
            
        // })
        // console.log(lins);
        // lins.forEach((val,i) => {
        //     console.log(val,'2')
        //       this.searchlist.push({searchlist:val});
        //     //item.age = 27
        //       })
        // console.log(this.searchlist,'searchlist')
      });
    },
    search(val) {
      this.queryMap.pageNumber = 1;
      console.log(val)
      //this.queryMap.para = val;
      this.getAllInfoData();
    },
    editPannel(index, row) {
        this.dialogFormVisible = true;
        this.addOperate = false;
        this.dialogTitle = "编辑预警值信息";
        this.$nextTick(()=>{
          this.$refs.warnvaluePanel.dataInit(row);
        });
    },
    addPannel(){
        this.dialogTitle = "添加预警值信息";
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
      this.dialogTitle = "添加预警值信息";
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
                //this.$refs.standardPanel.init();
                this.$refs["warnvaluePanel"].dialogFormVisible = true;

            })
    },
    del(st,ac,al,sd,cc,lk){
      this.$confirm('确认要删除当前数据吗？是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get(this.api.deleteAlarmInfoData,{params:{sensortypecode:st,alarmcontent:ac,alarmlevel:al,sensorcode:sd,channelcode:cc,limitkind:lk,structure:this.GLOBAL.structure}}).then(response => {
            const result = JSON.parse(response)
            if(result.msg != '操作成功'){
                      this.$message({
                          message: '预警值信息删除失败',
                          center: true
                      });
                  }else{
                      //this.infoform = {}
                      this.$message({
                          message: '预警值信息删除成功',
                          type: 'success',
                          center: true
                      });
                }
                this.getAllInfoData('refresh')
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '预警值信息删除失败!'
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
        const result = this.$refs['warnvaluePanel'].validateHandle()
        //const type = 'save'
        if (this.addOperate) {
          this.savetype = 'insert'
        }else{
          this.savetype = 'update'
        }
          if (result) {
              /* formData格式提交： */
              const qs = require('qs');
              const formData = JSON.stringify(this.$refs.warnvaluePanel.infoform)
              // const PermissonTypeList = this.$refs.warnvaluePanel.PermissonTypeList
              // const EnabledTypeList = this.$refs.warnvaluePanel.EnabledTypeList
              // EnabledTypeList.forEach((item,index) => {
              //       if(item.subcodename === this.$refs.warnvaluePanel.infoform.enabled){  
              //           this.$refs.warnvaluePanel.infoform.enabled = item.subcode
              //       }  
              //   });
              // PermissonTypeList.forEach((item,index) => {
              //       if(item.subcodename === this.$refs.warnvaluePanel.infoform.permisson){
              //           this.$refs.warnvaluePanel.infoform.permisson = item.subcode
              //       }  
              // });
              //console.log(this.infoform)
              //this.infoform.testdate = this.$moment(this.addTime.createDate).format('YYYY-MM-DD HH:mm:ss')
              let sensortypecode = this.$refs.warnvaluePanel.infoform.sensortypecode
              let alarmcontent = this.$refs.warnvaluePanel.infoform.alarmcontent
              let alarmlevel = this.$refs.warnvaluePanel.infoform.alarmlevel
              let dataunit = this.$refs.warnvaluePanel.infoform.dataunit
              let limitkind = this.$refs.warnvaluePanel.infoform.limitkind
              let sensorcode = this.$refs.warnvaluePanel.infoform.sensorcode
              let channelcode = this.$refs.warnvaluePanel.infoform.channelcode
              let describe = this.$refs.warnvaluePanel.infoform.describe
              let designval = this.$refs.warnvaluePanel.infoform.designval
              let alarmrate = this.$refs.warnvaluePanel.infoform.alarmrate
              let alarmvalue = this.$refs.warnvaluePanel.infoform.alarmvalue
              let graphname = this.$refs.warnvaluePanel.infoform.graphname
              let interval = this.$refs.warnvaluePanel.infoform.interval
              let isvisible = this.$refs.warnvaluePanel.infoform.isvisible
              const prm = qs.stringify({sensortypecode:sensortypecode,alarmcontent:alarmcontent,alarmlevel:alarmlevel,sensorcode:sensorcode,channelcode:channelcode,designval:designval,alarmrate:alarmrate,limitkind:limitkind,describe:describe,dataunit:dataunit,alarmvalue:alarmvalue,graphname:graphname,interval:interval,isvisible:isvisible,savetype:this.savetype,structure:this.GLOBAL.structure})
              
              //const prm = qs.stringify({type:this.type,data:JSON.stringify(this.$refs.warnvaluePanel.infoform),structure:this.GLOBAL.structure})
              this.$axios.post(this.api.saveAddAlarmDataInfo,prm).then(response => {
                  const result = JSON.parse(response)
                  if(result.msg === '操作成功' || result.msg === '保存成功'){
                    this.infoform = {}
                      this.$message({
                          message: '预警值信息保存成功',
                          type: 'success',
                          center: true
                      });
                      this.closeDialog()
                      this.getAllInfoData('refresh')
                  }else{
                      this.$message({
                          message: '预警值信息保存失败',
                          center: true
                      });
                  }
                  
              })
              .catch(err => {

              })
          } else {
              this.$message({
                  message: '请完善基本信息',
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

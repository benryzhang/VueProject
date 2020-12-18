<template>
<transition name="dialog-fade">
<el-dialog :visible.sync="dialogFormVisible" :title="dialogTitle" append-to-body width="60%" class="abow_dialog" @open = "open" ref = "dialog" v-if="dialogFormVisible" @close="closeDialog('damageinfolist')">
        <span>
          <el-form label-width="100px" class="demo-ruleForm" size="mini" :model="damageinfolist" :rules="sensorules" ref="damageinfolist" :validate-on-rule-change="false">
            <!-- <el-divider content-position="left">基本信息</el-divider> -->
              <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                          <el-form-item label="检测时间" prop="createDate">
                              <el-input v-model="addTime.createDate" :readonly="true"></el-input>
                              <!-- <el-date-picker
                                    v-model="addTime.createDate"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    
                                    placeholder="选择日期时间"
                                    readonly = "true"
                                    clearable="false">
                                </el-date-picker> -->
                          </el-form-item>
                        </div>
                    </el-col>
      
                   
                </el-row>
                
                
            <h5 style="margin: 0px;padding: 0px;"></h5>
            
          </el-form>
          <!-- <el-button @click="addchannel" type="primary">增加通道</el-button>
          <el-button @click="delchannel" type="primary">删减通道</el-button> -->
            <!-- <el-divider content-position="left" v-if="isShow">通道信息</el-divider>
            <el-tabs v-model="editableTabsValue" type="card"  v-show="isShow"
                    @tab-remove="removeTab" 
                    :before-leave="beforeLeave"
                    class="my-tab-pane"
                    >
                    <el-tab-pane
                        v-for="item in editableTabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        closable
                    >

                        <jcxtChannel-page></jcxtChannel-page>
 
                    </el-tab-pane>
                    <el-tab-pane key="add" name="add">
                        <span slot="label" style="padding: 8px;font-size:20px;font-weight:bold;" @click="addchannel">
                            +
                        </span>
                    </el-tab-pane>
                </el-tabs> -->
        </span>
        
        
     <!-- 确定按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="saveAddDamageDataInfo('damageinfolist')" >保 存</el-button>
        </span>
</el-dialog>
</transition>
</template>
<script>
import jcxtChannel from './jcxtChannel'
//import moment from 'moment'

  export default {
    name: "standardPanel",
    props: {
    dialogTitle: {
      type: String,
      default: "添加人员"
    },
    itemInfo: {
      type: Object,
      default: function() {
        return {};
        }
        }
    },
    data() {
      return {
        addTime:{createDate:this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')},
        selectindex:{status:'1'},
        dialogFormVisible:false,
        blocktypelist:[],
        ChCodeStatus:{code:"ChCodeStatus",structure:this.GLOBAL.structure},
        sensorstatuslist:{},
        // damageinfolist: {
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
        //     damagepicture:'',
        // },
        damageinfolist: JSON.parse(JSON.stringify(this.itemInfo)),
        sensortypelist:{},
        channelcount:(''),
        szgjbhlist:{},
        cgqjccslist:{},
        sectionlist:{},
        isvirtualflag:[{
          value: '0',
          label: '虚拟传感器'
        }, {
          value: '1',
          label: '非虚拟传感器'
        }],
        components: {
            jcxtChannel
        },
        counter:[],
        isvirtualflagvalue:'',
        imageUrl: 'sensor/ACC.png',
        sensorules: {
          
        }
      };
    },
     created(){
　　　　    //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
        //this.blockname = this.blocktypelist[0].typename;
        //console.log(this.blockname + 'sd')
    },
    mounted() {
          this.getinfobykey();
    },
    
    inject:['reload'],
    methods: {
        init(id){
            //this.form.id = id || 0
            this.dialogFormVisible = true
            //this.dialogChannel = true
            this.$nextTick(()=>{
            //this.$refs.jcxtAddorEdit.init(id);
            })

        },
        open(){
             
            // this.getcgqjccs()
            // this.getsyscodeinfo()
            // this.getszgjbh()
            // this.getSectionIdByType()
        },
        async getDamageTypeByBlockType() {
            await this.$axios.get(this.api.getDamageTypeByBlockType,{params:{type:this.damageinfolist.blocktype,structure:this.GLOBAL.structure}}).then(response => {
                //const sensortype = JSON.parse(response)
                this.sensortypelist = response
                console.log(response)
            });
        },
        async getcgqjccs() {
            await this.$axios.get(this.api.getcgqjccs,{params:this.structure}).then(response => {
                this.cgqjccslist = response
            });
        },
        async getsyscodeinfo() {
            await this.$axios.get(this.api.getsyscodeinfo,{params:this.ChCodeStatus}).then(response => {
                this.sensorstatuslist = response
            });
        },
        async getszgjbh() {
            await this.$axios.get(this.api.getszgjbh,{params:this.structure}).then(response => {
                this.szgjbhlist = response
            });
        },
        async getSectionIdByType() {
            await this.$axios.get(this.api.getSectionIdByType,{params:this.structure}).then(response => {
                this.sectionlist = response
            });
        },
        async reloadSectionInfo(val) {
            let obj = {};
            obj = this.szgjbhlist.find(function(item){
                return item.id === val
            })
            await this.$axios.get(this.api.getSectionIdByType,{params:{type:val,structure:this.GLOBAL.structure}}).then(response => {
                this.sectionlist = response
                this.damageinfolist.sectionid = this.sectionlist[0].sectionname;
            });
        },
       
        async getinfobykey(info){
            // console.log(info.channelcount)
            // if(info != '{}'){
                
            // }
            //this.reloadSectionInfo()
            //console.log(info.componentid)
            //this.reloadSectionInfo(info.componentid)
            //this.getszgjbh()
            this.damageinfolist=info
            //this.imageUrl = this.damageinfolist.picture
            //console.log(this.damageinfolist)
            //this.blocktypelist.push({
            ////    blocktype: this.damageinfolist.blocktype,
            //    blockname: this.damageinfolist.blockname,
            //});
            //console.log(JSON.parse(JSON.stringify(this.blocktypelist[0])))
            //this.blocktypelist = ()

            //this.getDamageTypeByBlockType()
            //console.log(this.damageinfolist.picture)
            //console.log(this.damageinfolist.channelcount)
            //.channelcount = Number(this.damageinfolist.channelcount)
            //console.log(this.damageinfolist)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                this.$Message.info("查询");
                console.log('请完善传感器基本信息');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        async saveAddDamageDataInfo(formName){
            
            this.$refs[formName].validate((valid) => {
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
        },
        // 关闭 Modal 执行
        closeDialog(formName) {
            
            this.dialogFormVisible = false
            //this.$refs.damageinfolist.resetFields();
            this.reload()
        },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
            /* 活动标签切换时触发 */
        beforeLeave(currentName,oldName) {
            var self=this;
            //重点，如果name是add，则什么都不触发
            if(currentName=="add"){
                //this.addTab()
                return false
            }else{
                this.currentIndex=currentName;
            }
        }
        }
  }
</script>
<style>
.abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;}
.el-dialog {
    margin: 0px auto !important;
    height: 78%;
    overflow: hidden;}
.el-dialog__body {
    /* position: absolute;
    left: 40;
    top: 44px;
    bottom: 0;
    right: 40;
    padding: 60;
    z-index: 1;
    overflow: hidden;
    overflow-y: auto; */
    height: 82%;
  overflow: auto;
}
.el-dialog-div {
  height: 78%;
  overflow: auto;
}
/* .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{margin-bottom:4px;}    */
.dialog-footer{position:relative;margin-right:0;margin-bottom:0}
.el-input__inner{ padding: 0 8px;}
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
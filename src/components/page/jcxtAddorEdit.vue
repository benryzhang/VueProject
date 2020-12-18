<template>
<el-dialog  title="传感器信息" :visible.sync="dialogFormVisible" append-to-body width="60%" class="abow_dialog" @open = "open" ref = "dialog" v-if="sensorinfolist" @close="closeDialog('sensorinfolist')">
        <span>
          <el-form label-width="100px" class="demo-ruleForm" size="mini" :model="sensorinfolist" :rules="sensorules" ref="sensorinfolist" :validate-on-rule-change="false">
            <!-- <el-divider content-position="left">基本信息</el-divider> -->
              <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                          <el-form-item label="传感器编号" prop="sensorcode">
                            <el-input v-model="sensorinfolist.sensorcode"></el-input>
                          </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="传感器类型" prop="sensortypecode">
                                  <el-select placeholder="请选择传感器类型" v-model="sensorinfolist.sensortypecode">
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
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                
                                <el-form-item label="传感器名称" prop="sensorname">
                                    <el-input v-model="sensorinfolist.sensorname"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="通道数量" prop="channelcount">
                                    <el-input v-model="sensorinfolist.channelcount" ></el-input>
                                    <!-- <el-input-number v-model.number="sensorinfolist.channelcount" controls-position="right" :min="1" :max="10"></el-input-number> -->
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="监测参数" prop="monitpara">
                                <el-select placeholder="请选择监测参数" v-model="sensorinfolist.monitpara">
                                    <el-option
                                        v-for="cgqjccslist in cgqjccslist"
                                        :label="cgqjccslist.text"
                                        :key="cgqjccslist.id"
                                        :value="cgqjccslist.id"
                                        >
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="工作状态" prop="sensorstatus">
                                    <el-select placeholder="请选择工作状态" v-model="sensorinfolist.sensorstatus">
                                        <el-option
                                            v-for="sensorstatuslist in sensorstatuslist"
                                            :key="sensorstatuslist.id"
                                            :label="sensorstatuslist.text"
                                            :value="sensorstatuslist.id">
                                        </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="尺寸"  prop="sensorsize">
                                    <el-input v-model="sensorinfolist.sensorsize"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="方向" prop="orientation">
                                    <el-input v-model="sensorinfolist.orientation"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="位置" prop="position">
                                <el-input v-model="sensorinfolist.position"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="工作温度" prop="worktemp">
                                    <el-input v-model="sensorinfolist.worktemp"></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="使用寿命" prop="sensorlife">
                                    <el-input v-model="sensorinfolist.sensorlife"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="电源要求" prop="powerreq">
                                    <el-input v-model="sensorinfolist.powerreq"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="抗潮湿指标" prop="antimois">
                                <el-input v-model="sensorinfolist.antimois"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="抗干扰能力" prop="antiinterference">
                                    <el-input v-model="sensorinfolist.antiinterference"></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="抗冲振要求" prop="impactvibration">
                                    <el-input v-model="sensorinfolist.impactvibration"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="虚拟传感器" prop="isvirtualflag">
                                    <el-select placeholder="请选择虚拟传感器" v-model="isvirtualflagvalue">
                                      <!-- <el-option label="虚拟传感器" value="0"></el-option>
                                      <el-option label="非虚拟传感器" value="1"></el-option> -->
                                      <el-option
                                        v-for="item in isvirtualflag"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="所在构件" prop="componentid">
                                    <el-select placeholder="请选择所在构件" v-model="sensorinfolist.componentid" @change="reloadSectionInfo">
                                        <el-option
                                        v-for="szgjbhlist in szgjbhlist"
                                        :label="szgjbhlist.text"
                                        :key="szgjbhlist.id"
                                        :value="szgjbhlist.id"
                                        >
                                        </el-option>
                                  </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="所在截面" prop="sectionid" >
                                <el-select placeholder="请选择所在截面" v-model="sensorinfolist.sectionid">
                                    <el-option
                                        v-for="sectionlist in sectionlist"
                                        :label="sectionlist.sectionname"
                                        :key="sectionlist.sectionid"
                                        :value="sectionlist.sectionid"
                                        >
                                        </el-option>
                                  </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="监测断面" prop="sensorsection">
                                    <el-input v-model="sensorinfolist.sensorsection"></el-input>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="节点空间坐标" prop="coordinate">
                                    <el-input style="width: 33%"  v-model.number="sensorinfolist.x" placeholder="x"></el-input ><el-input style="width: 33%" v-model.number="sensorinfolist.y" placeholder="y"></el-input><el-input style="width: 33%" v-model.number="sensorinfolist.z" placeholder="z"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="传感器图片" prop="picture" >
                                <el-upload
                                    class="avatar-uploader"
                                    action="D:\xxbp\bshm_xxbp\src\assets\img"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    >
                                    
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                              <!-- <el-upload
                                class="upload-demo"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                              </el-upload> -->
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
                                </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple">
                            <el-form-item label="安装方式" prop="installation">
                                <el-input type="textarea" v-model="sensorinfolist.installation" ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple">
                            <el-form-item label="备注" prop="describe">
                                <el-input type="textarea" v-model="sensorinfolist.describe" ></el-input>
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
          <el-button @click="cancledialog">取 消</el-button>
          <el-button type="primary" @click="savejcxtdata('sensorinfolist')" >保 存</el-button>
        </span>
</el-dialog>

</template>
<script>
import jcxtChannel from './jcxtChannel'
  export default {
    data() {
      return {
        // editableTabsValue: '1',
        // currentIndex:1,
        // editableTabs: [{
        // title: '通道1',
        // name: '1',
        // }],
        // tabIndex: 1,
        // addIndex:1,
        // isShow:true,
        dialogFormVisible:false,
        structure:{structure:this.GLOBAL.structure},
        ChCodeStatus:{code:"ChCodeStatus",structure:this.GLOBAL.structure},
        sensorstatuslist:{},
        sensorinfolist: {},
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
          sensorcode: [
            { required: true, message: '请输入传感器编号', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          sensorname: [
            { message: '请输入传感器名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          sensortypecode: [
            { required: true, message: '请选择传感器类型', trigger: 'change' }
          ],
          channelcount: [
            {  message: '通道数量必须为数字值',min:0 }//type:'number',
          ],
          monitpara: [
            { required: true, message: '请选择监测参数', trigger: 'change' }
          ],
          sensorstatus: [
            { message: '请选择工作状态', trigger: 'change' }
          ],
          sensorsize: [
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          orientation: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          position: [
            { min: 1, max: 1024, message: '长度在 1 到 1024 个字符', trigger: 'blur'}
          ],
          worktemp: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          sensorlife: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          powerreq: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          antimois: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          antiinterference: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          impactvibration: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          componentid: [{required: true, message: '请选择所在构件', trigger: 'change'}
          ],
          sectionid: [{required: true, message: '请选择所在截面', trigger: 'change'}
          ],
          sensorsection: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          installation: [
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          describe: [
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          coordinate: [
              { type: 'number', message: '坐标必须为数字值', trigger: 'blur'}
          ],
        }
      };
    },
    mounted() {
          this.getinfobykey();
    },
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
            this.getallsensors()
            this.getcgqjccs()
            this.getsyscodeinfo()
            this.getszgjbh()
            this.getSectionIdByType()
        },
        async getallsensors() {
            await this.$axios.get(this.api.getcgqlx,{params:this.structure}).then(response => {
                //const sensortype = JSON.parse(response)
                this.sensortypelist = response
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
                this.sensorinfolist.sectionid = this.sectionlist[0].sectionname;
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
            this.sensorinfolist=info
            this.imageUrl = this.sensorinfolist.picture
            //console.log(this.sensorinfolist.picture)
            //console.log(this.sensorinfolist.channelcount)
            //.channelcount = Number(this.sensorinfolist.channelcount)
            //console.log(this.sensorinfolist)
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
        addchannel () {
            // this.form.dynamicItem.push({
            // name: '',
            // phone: ''
            // })
            this.isShow = true
            let newTabIndex = ++this.tabIndex + '';
            this.editableTabs.push({
                title: '通道'+ ++this.addIndex,
                name: newTabIndex,
            });
            this.editableTabsValue = newTabIndex;
            this.currentIndex=newTabIndex;
            //console.log()
            this.counter.push({})

            
        },
        async savejcxtdata(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                /* formData格式提交： */
                this.$delete(this.sensorinfolist,'fm')
                const qs = require('qs');
                let formData = JSON.stringify(this.sensorinfolist)
                const prm = qs.stringify({type:'cgq',fdata:formData,structure:this.GLOBAL.structure})
                this.$axios.post(this.api.updatebaseinfo,prm).then(response => {
                   // this.szgjbhlist = response
                   const result = JSON.parse(response)
                   if(result.errorMsg){
                            this.$message({
                            message: '传感器信息保存失败',
                            center: true
                        });
                   }else{
                       this.$message({
                            message: '传感器信息保存成功',
                            type: 'success',
                            center: true
                        });
                        this.cancledialog()
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
        delchannel (item, index) {
            this.form.dynamicItem.splice(index, 1)
        },
        cancledialog(formRule){
            this.dialogFormVisible = false
            this.$refs.sensorinfolist.resetFields();
        },
        // 关闭 Modal 执行
        closeDialog(formName) {
            this.$refs.sensorinfolist.resetFields();
        },
        // removeTab(targetName) {
        //     if(this.editableTabs.length<=0){
        //         this.isShow = false
        //         return false;
        //     }
        //     var self=this;
        //     let tabs = self.editableTabs;
        //     let activeName = self.editableTabsValue;
        //     if (activeName === targetName) {
        //         tabs.forEach((tab, index) => {
        //             if (tab.name === targetName) {
        //                 let nextTab = tabs[index + 1] || tabs[index - 1];
        //                 if (nextTab) {
        //                     activeName = nextTab.name;
        //                 }
        //             }
        //         });
        //     }
        //     self.editableTabsValue = activeName;
            
        //     self.editableTabs = tabs.filter(tab => tab.name !== targetName);
            
        //     self.editableTabs.map((tab,index)=>{
        //         tab.title="通道"+(index+1);
        //         self.addIndex=(index+1);
        //     })
        //     self.currentIndex=self.editableTabsValue;
        //     // if(this.editableTabs.length<=0){
        //     //     self.currentIndex = 0
        //     // }
        //     console.log(self.currentIndex)
        //     self.$message({
        //                         type: 'success',
        //                         message: '通道删除成功!'
        //     });
        // },
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
<template>
    <span>
        <el-form label-width="100px" class="demo-ruleForm" size="mini" :model="damageinfolist" :rules="formrules" ref="damageinfolist" :validate-on-rule-change="false">
        <!-- <el-divider content-position="left">基本信息</el-divider> -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="检测时间" prop="testdate">
                            <el-input v-model="damageinfolist.testdate" :readonly="true"></el-input>
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
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="构件类型" prop="blocktype">
                                <el-select placeholder="请选择构件类型" v-model="damageinfolist.blockname" >
                                    <el-option
                                    v-for="item in blocktypelist"
                                    :label="item.blockname"
                                    :key="item.blocktype"
                                    :value="item.blocktype"
                                    >
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="构件ID" prop="componentid">
                            <el-select placeholder="请选择构件ID" v-model="damageinfolist.componentid">
                                <el-option
                                    v-for="item in componentidlist"
                                    :label="item.text"
                                    :key="item.id"
                                    :value="item.id"
                                    >
                                </el-option>
                                </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="病害类型" prop="damagetype">
                                <el-select placeholder="请选择病害类型" v-model="damageinfolist.damagetype">
                                    <el-option
                                        v-for="item in damagetypelist"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="病害标度" prop="scale">
                                <el-select placeholder="请选择病害标度" v-model="damageinfolist.scale">
                                    <el-option
                                    v-for="item in scalelist"
                                    :label="item.text"
                                    :key="item.id"
                                    :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="检测人" prop="inspector">
                            <el-input v-model="damageinfolist.inspector"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                
                
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <div class="grid-content bg-purple">
                        <el-form-item label="病害定性描述" prop="qualitativedescription">
                            <el-input type="textarea" v-model="damageinfolist.qualitativedescription" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col >
                    <div class="grid-content bg-purple">
                        <el-form-item label="病害定量描述" prop="quantitativedescription">
                            <el-input type="textarea" v-model="damageinfolist.quantitativedescription" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col >
                    <div class="grid-content bg-purple">
                        <el-form-item label="病害部位描述" prop="damagelocation">
                            <el-input type="textarea" v-model="damageinfolist.damagelocation" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col >
                    <div class="grid-content bg-purple">
                        <el-form-item label="病害描述" prop="damagedescription">
                            <el-input type="textarea" v-model="damageinfolist.damagedescription" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="传感器图片" prop="picture" >
                           <el-button type="primary" @click.native="upStart">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
                            <!-- <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                >
                                
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload> -->
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
                <el-col :span="1">
                    <div class="grid-content bg-purple">
                        <el-form-item label="" prop="picture" >
                           
                        <el-image 
                            style="width: 100px; height: 100px"
                            :src="url" 
                            :preview-src-list="srcList">
                        </el-image>

                        </el-form-item>
                    </div>
                </el-col>
     
            </el-row>
            <!-- 确定按钮 -->
            
        <!-- <span slot="footer" class="dialog-footer"> --
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="onSubmit('damageinfolist')" >保 存</el-button>
        <-- </span> -->
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

                        <detectionPanel-page></detectionPanel-page>
 
                    </el-tab-pane>
                    <el-tab-pane key="add" name="add">
                        <span slot="label" style="padding: 8px;font-size:20px;font-weight:bold;" @click="addchannel">
                            +
                        </span>
                    </el-tab-pane>
                </el-tabs> -->
                
    </span>
</template>
<script>
import detectionPanel from './detectionPanel'
//import moment from 'moment'

  export default {
    name: "detectionPanel",
    // props: {
    //     dialogTitle: {
    //         type: String,
    //         default: "添加人员"
    //     },
    //     itemInfo: {
    //     type: Object,
    //     default: function() {
    //         return {};
    //     }
    //     }
    // },
    // watch: {
    //     formWatch: function(val) {
    //     this.damageinfolist = val
    //     }
    // },
    data() {
      return {
        addTime:{createDate:this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')},
        damageinfolist: {
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
            damagepicture:'',
        },
        url:"sensor/ACC.png",
        imageUrl: '',
        // dialogFormVisible:false,
        // selectindex:{status:'1'},
        
        // blocktypelist:[],
        // ChCodeStatus:{code:"ChCodeStatus",structure:this.GLOBAL.structure},
        // sensorstatuslist:{},
        // //damageinfolist: JSON.parse(JSON.stringify(this.itemInfo)),
        
        // sensortypelist:{},
        // szgjbhlist:{},
        // cgqjccslist:{},
        // sectionlist:{},
        // isvirtualflag:[{
        //   value: '0',
        //   label: '虚拟传感器'
        // }, {
        //   value: '1',
        //   label: '非虚拟传感器'
        // }],
        // counter:[],
        // isvirtualflagvalue:'',
        // imageUrl: 'sensor/ACC.png',
        formrules: {
           createDate: [
             { required: true, message: '请输入传感器编号' ,trigger: 'blur'}
           ],
          blocktype: [
            { required: true, message: '请选择构件类型', trigger: 'change' },
          ],
          componentid: [
            { required: true, message: '请选择构件ID', trigger: 'change' }
          ],
          damagetype: [
            {  required: true, message: '请选择病害类型', trigger: 'change' }
          ],
          scale: [
            { required: true, message: '请选择病害标度', trigger: 'change' }
          ],
        //   qualitativedescription: [
        //     { message: '请选择工作状态', trigger: 'change' }
        //   ],
          quantitativedescription: [
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
          ],
          damagelocation: [
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          damagedescription: [
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
          ],
          inspector: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ]
         
        }
      };
    },
//      created(){
// 　　　　    //如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
//         //this.blockname = this.blocktypelist[0].typename;
//         //console.log(this.blockname + 'sd')
//     },
    mounted() {
          //this.getinfobykey();
          this.damageinfolist.testdate = this.addTime.createDate
                
    },
    //inject:['reload'],
    methods: {
        dataInit(data){
            if(data){
                this.damageinfolist = data;
                this.damageinfolist.testdate = this.addTime.createDate
                //console.log(this.addTime.createDate)
                console.log(this.damageinfolist);
            }
        },
        validataForm(formName) {
            console.log('sdsdsdsd')
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const qs = require('qs');
                const prm = qs.stringify({type:'Info',data:JSON.stringify(this.damageinfolist),structure:this.GLOBAL.structure})
                 console.log(prm)
                 this.$axios.post(this.api.saveAddDamageDataInfo,prm).then(response => {
        //            // this.szgjbhlist = response
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
        onSubmit(formName){
            console.log('zi')
             
        },
        UploadUrl(){
            console.log('upload')
        },
        upStart() {
            //创建input
            const upload = document.createElement("input");
            //设置type为file
            upload.type = "file";
            //类型
            upload.accept = "image/png, image/jpeg";
            //添加onchange事件
            upload.onchange = this.setFile;
            //模拟点击
            upload.click();
        },
        setFile(e) {
            //获取文件
            const file = e.path[0].files[0];
            console.log(e.target.files[0])
            console.log(file)
            //将其放入formdata中方便上传
            const formData = new FormData();
            formData.append("imgFile", file);
            console.log(formData)
            const ImgUrl = window.URL.createObjectURL(file);
            //构建Image对象方便获取其宽高
            const img = new Image();
            img.src = ImgUrl;
            console.log(ImgUrl)
            img.onload = () => {
                //只有在图片完成加载的时候才能拿到图片的宽高
                this.userDetail.upAva.imgSize = img.width;
            };
            this.userDetail.upAva.url = ImgUrl;
        },
        // async getDamageTypeByBlockType() {
        //     await this.$axios.get(this.api.getDamageTypeByBlockType,{params:{type:this.damageinfolist.blocktype,structure:this.GLOBAL.structure}}).then(response => {
        //         //const sensortype = JSON.parse(response)
        //         this.sensortypelist = response
        //         console.log(response)
        //     });
        // },
        // async getcgqjccs() {
        //     await this.$axios.get(this.api.getcgqjccs,{params:this.structure}).then(response => {
        //         this.cgqjccslist = response
        //     });
        // },
        // async getsyscodeinfo() {
        //     await this.$axios.get(this.api.getsyscodeinfo,{params:this.ChCodeStatus}).then(response => {
        //         this.sensorstatuslist = response
        //     });
        // },
        // async getszgjbh() {
        //     await this.$axios.get(this.api.getszgjbh,{params:this.structure}).then(response => {
        //         this.szgjbhlist = response
        //     });
        // },
        // async getSectionIdByType() {
        //     await this.$axios.get(this.api.getSectionIdByType,{params:this.structure}).then(response => {
        //         this.sectionlist = response
        //     });
        // },

        // async reloadSectionInfo(val) {
        //     let obj = {};
        //     obj = this.szgjbhlist.find(function(item){
        //         return item.id === val
        //     })
        //     await this.$axios.get(this.api.getSectionIdByType,{params:{type:val,structure:this.GLOBAL.structure}}).then(response => {
        //         this.sectionlist = response
        //         this.damageinfolist.sectionid = this.sectionlist[0].sectionname;
        //     });
        // },
       
        //async getinfobykey(info){
            // console.log(info.channelcount)
            // if(info != '{}'){
                
            // }
            //this.reloadSectionInfo()
            //console.log(info.componentid)
            //this.reloadSectionInfo(info.componentid)
            //this.getszgjbh()
            //this.damageinfolist=info
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
        //},
        // submitForm(formName) {
        //     this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //         alert('submit!');
        //     } else {
        //         this.$Message.info("查询");
        //         console.log('请完善传感器基本信息');
        //         return false;
        //     }
        //     });
        // },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // },

        // async saveAddDamageDataInfo(formName){
            
        //     this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //         /* formData格式提交： */
        //         //this.$delete(this.damageinfolist,'fm')
        //         const qs = require('qs');
        //         let formData = JSON.stringify(this.damageinfolist)
        //         // let formData = new FormData();
        //         // //console.log(this.damageinfolist.testdate)
        //         //     formData.append('testdate', '2020-12-10 16:01:27');
        //         //     formData.append('blocktype', this.blocktype);
        //         //     formData.append('componentid', this.componentid);
        //         //     formData.append('damagetype', this.damagetype);
        //         //     formData.append('scale', this.scale);
        //         //     formData.append('qualitativedescription', this.qualitativedescription);
        //         //     formData.append('quantitativedescription', this.quantitativedescription);
        //         //     formData.append('damagelocation', this.damagelocation);
        //         //     formData.append('damagedescription', this.damagedescription);
        //         //     formData.append('inspector', this.inspector);
        //         //     formData.append('damagepicture', this.damagepicture);
                
        //         //this.damageinfolist.testdate = '2020-12-10 00:00:00'
        //         //this.dateFormat(this.damageinfolist.testdate)
        //         //console.log(moment(this.damageinfolist.testdate).format('YYYY-MM-DD HH-mm'))
        //         //const createDate = this.$moment(this.addTime.createDate).format('YYYY-MM-DD HH:mm:ss')
        //         //const data  =  moment("12/10/2020 00:00:00").format('YYYY-MM-DD HH:mm:ss')
        //         //console.log(createDate)   //    "2019-05-25 08:23:56"
        //         //console.log(this.dateFormat(this.damageinfolist.testdate))
                
        //         this.damageinfolist.testdate = this.$moment(this.addTime.createDate).format('YYYY-MM-DD HH:mm:ss')
        //         //const prm = {type:'Info',data:JSON.stringify(this.damageinfolist),structure:this.GLOBAL.structure}
        //         const prm = qs.stringify({type:'Info',data:JSON.stringify(this.damageinfolist),structure:this.GLOBAL.structure})
        //         console.log(prm)
        //         this.$axios.post(this.api.saveAddDamageDataInfo,prm).then(response => {
        //            // this.szgjbhlist = response
        //            const result = JSON.parse(response)
        //            console.log(result)
        //            if(result.msg != '操作成功'){
        //                     this.$message({
        //                     message: '传感器信息保存失败',
        //                     center: true
        //                 });
        //            }else{
        //                this.damageinfolist = {}
        //                this.$message({
                           
        //                     message: '传感器信息保存成功',
        //                     type: 'success',
        //                     center: true
        //                 });
        //                 this.closeDialog()
        //            }
                    
        //         })
        //         .catch(err => {
	
        //         })
        //     } else {
        //         this.$message({
        //             message: '请完善传感器基本信息',
        //             center: true
        //             });
        //         return false;
        //     }
        //     });
        // },

        
        handleAvatarSuccess(res, file) {
            console.log('shangchuanchenggong')
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
        //     /* 活动标签切换时触发 */
        // beforeLeave(currentName,oldName) {
        //     var self=this;
        //     //重点，如果name是add，则什么都不触发
        //     if(currentName=="add"){
        //         //this.addTab()
        //         return false
        //     }else{
        //         this.currentIndex=currentName;
        //     }
        // }
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
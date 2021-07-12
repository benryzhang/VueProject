<template>
    <span>
        <el-form label-width="120px" class="demo-ruleForm" size="mini" :model="infoform" :rules="formrules" ref="infoform" :validate-on-rule-change="false">
        <!-- <el-divider content-position="left">基本信息</el-divider> -->
            <el-row :gutter="20">
                <el-col >
                    <div class="grid-content bg-purple">
                        <el-form-item label="传感器类型" prop="sensortypecode">
                            <el-select placeholder="请选择传感器类型"  :label-in-value="true" value-key="subcode" v-model="infoform.sensortypecode" :disabled="disabled" @change="getSensorcodeBySensortype">
                                    <el-option
                                    v-for="item in cgqlxList"
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
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="预警内容" prop="alarmcontent">
                                <el-input v-model="infoform.alarmcontent" :disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="预警级别" prop="alarmlevel">
                            <el-select placeholder="请选择预警级别"  :label-in-value="true" value-key="subcode" v-model="infoform.alarmlevel" :disabled="disabled">
                                    <el-option
                                    v-for="item in alarmlevelList"
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
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="传感器编号" prop="sensorcode">
                                <el-select placeholder="请选择传感器编号"  :label-in-value="true" value-key="subcode" v-model="infoform.sensorcode" :disabled="disabled">
                                    <el-option
                                    v-for="item in sensorcodeList"
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
            </el-row>
                <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="通道编号" prop="channelcode">
                                <el-select placeholder="请选择通道编号"  :label-in-value="true" value-key="subcode" v-model="infoform.channelcode" :disabled="disabled">
                                    <el-option
                                    v-for="item in channelcodeList"
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
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="单位" prop="dataunit">
                            <el-input v-model="infoform.dataunit" :disabled="disabled"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="25">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="预警阈值类型" prop="limitkind">
                            <el-select placeholder="请选择预警阈值类型"  :label-in-value="true" value-key="subcode" v-model="infoform.limitkind" :disabled="disabled">
                                    <el-option
                                    v-for="item in limitkindinfoList"
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
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="预警是否可见" prop="isvisible">
                            <el-select placeholder="请选择传感器类型"  :label-in-value="true" value-key="subcode" v-model="infoform.isvisible" >
                                    <el-option
                                    v-for="item in alarmvsibleinfoList"
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
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="描述" prop="describe">
                            <el-input v-model="infoform.describe"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="标准设计值" prop="designval">
                            <el-input v-model="infoform.designval"></el-input>
                                
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="倍率" prop="alarmrate">
                            <el-input v-model="infoform.alarmrate"></el-input>
                                
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="实际预警值" prop="alarmvalue">
                            <el-input v-model="infoform.alarmvalue"></el-input>
                                
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <!-- 确定按钮 -->
        <h5 style="margin: 0px;padding: 0px;"></h5>
        
        </el-form>
                
    </span>
</template>
<script>
import warnvaluePanel from './warnvaluePanel'
import { validateIP,validatePhoneTwo } from './../../assets/js/validate.js'//引用验证文件

  export default {
    name: "warnvaluePanel",
    // props: {
    //   disabled: {
    //     default: false
    //   }
    // },
    data() {
      return {
        disabled:false,
        EnabledTypeList:[],
        PermissonTypeList:[],
        cgqlxList:[],
        alarmlevelList:[],
        sensorcodeList:[],
        channelcodeList:[],
        limitkindinfoList:[],
        alarmvsibleinfoList:[],
        infoform: {
            alarmcontent: "",
            alarmlevel: "",
            alarmlevelname: "",
            alarmrate: "",
            alarmvalue: "",
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
        formrules: {
            sensortypecode: [
                {  required: true, message: '请选择传感器类型', trigger: 'change'},
            ],
            alarmcontent: [
                { required: true, message: '请输入预警内容', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }

            ],
            alarmlevel: [
                { required: true, message: '请选择预警级别', trigger: 'change'}            ],
            limitkind: [
                { required: true, message: '请选择预警阈值类型', trigger: 'change'}
            ],
            isvisible: [
                { required: true, message: '请选择预警是否可见', trigger: 'change' }
            ],  
            designval: [
                { required: true, message: '请输入设计值', trigger: 'blur'},
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            alarmrate: [
                { required: true, message: '请输入倍率', trigger: 'blur'},
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }  
            ],
            alarmvalue: [
                { required: true, message: '请输入实际预警值', trigger: 'blur'},
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }  
            ],
            enabled: [
                { required: true, message: '请选择用户状态', trigger: 'change'}
            ], 
            permisson: [
                { required: true, message: '请选择用户权限', trigger: 'change' }
            ],  
         
        }
      };
    },
      created(){
          this.getEnabledTypeList()
                this.getPermissonTypeList()   
                this.getcgqlx() 
                this.getsyscodeinfoinalarmlevel()    
                this.getSensorcodeBySensortype()
                
                this.getLimitKindInfo()
                this.getAlarmVisibleInfo()
     },
    mounted() {
          
    },
    methods: {
        dataInit(data){
            if(data){
                this.infoform = data;
                this.disabled = true   
                // this.getEnabledTypeList()
                // this.getPermissonTypeList()   
                // this.getcgqlx() 
                // this.getsyscodeinfoinalarmlevel()    
                // this.getSensorcodeBySensortype()
                // this.getChannelcodeBySensorcode()
                // this.getLimitKindInfo()
                // this.getAlarmVisibleInfo()
            }
        },
        getEnabledTypeList() {
             this.$axios.get(this.api.getEnabledTypeList,{params:this.GLOBAL.structure}).then(response => {
                this.EnabledTypeList = response
            });
        },
        getcgqlx() {
             this.$axios.get(this.api.getcgqlx,{params:this.GLOBAL.structure}).then(response => {
                this.cgqlxList = response
            });
        },
        getsyscodeinfoinalarmlevel() {
             this.$axios.get(this.api.getsyscodeinfoinalarmlevel,{params:{code:'AlarmLevel',structure:this.GLOBAL.structure}}).then(response => {
                this.alarmlevelList = response
            });
        },
        
        getPermissonTypeList() {
            this.$axios.get(this.api.getPermissonTypeList,{params:this.GLOBAL.structure}).then(response => {
                this.PermissonTypeList = response
            });
        },
        getSensorcodeBySensortype() { 
            this.$axios.get(this.api.getSensorcodeBySensortype,{params:{type:this.infoform.sensortypecode,structure:this.GLOBAL.structure}}).then(response => {
                this.sensorcodeList = response
                this.getChannelcodeBySensorcode()
            });
        },
        getChannelcodeBySensorcode() { 
            this.$axios.get(this.api.getChannelcodeBySensorcode,{params:{type:this.infoform.sensortypecode,structure:this.GLOBAL.structure,code:this.infoform.sensorcode}}).then(response => {
                this.channelcodeList = response
            });
        },
        getLimitKindInfo() {
            this.$axios.get(this.api.getLimitKindInfo,{params:this.GLOBAL.structure}).then(response => {
                this.limitkindinfoList = response
            });
        },
        getAlarmVisibleInfo() {
            this.$axios.get(this.api.getAlarmVisibleInfo,{params:this.GLOBAL.structure}).then(response => {
                this.alarmvsibleinfoList = response
            });
        },
        
        
        
        
        validateHandle () {
        let flag = null
        this.$refs['infoform'].validate(valid => {
          if (valid) {
            flag = true
          } else {
            flag = false
          }
        })
        return flag
      },
    }
  }
</script>
<style>

</style>
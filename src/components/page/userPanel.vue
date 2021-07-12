<template>
    <span>
        <el-form label-width="100px" class="demo-ruleForm" size="mini" :model="infoform" :rules="formrules" ref="infoform" :validate-on-rule-change="false">
        <!-- <el-divider content-position="left">基本信息</el-divider> -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="infoform.username"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="infoform.password" type="password"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="IP地址" prop="ipaddress">
                            <el-input v-model="infoform.ipaddress"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="邮件" prop="email">
                                <el-input v-model="infoform.email"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
            </el-row>
                <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="grid-content bg-purple">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="infoform.name"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="部门" prop="department">
                            <el-input v-model="infoform.department"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="电话" prop="telephone">
                            <el-input v-model="infoform.telephone" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="移动令牌" prop="token">
                            <el-input v-model="infoform.token" ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="用户状态" prop="enabled">
                            <el-select placeholder="请选择用户状态"  :label-in-value="true" value-key="subcode" v-model="infoform.enabled" >
                                    <el-option
                                    v-for="item in EnabledTypeList"
                                    :label="item.subcodename"
                                    :key="item.subcode"
                                    :value="item.subcode"
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
                        <el-form-item label="用户权限" prop="permisson">
                            <el-select placeholder="请选择用户权限" value-key="subcode"  v-model="infoform.permisson" >
                                    <el-option
                                    v-for="item in PermissonTypeList"
                                    :label="item.subcodename"
                                    :key="item.subcode"
                                    :value="item.subcode"
                                    >
                                    {{item.subcodename}}
                                </el-option>
                                </el-select>
                                
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
import userPanel from './userPanel'
import { validateIP,validatePhoneTwo } from './../../assets/js/validate.js'//引用验证文件

  export default {
    name: "userPanel",
    data() {
      return {
        EnabledTypeList:[],
        PermissonTypeList:[],
        infoform: {
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
        },
        formrules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }

            ],
            ipaddress: [
                { required: true, message: '请输入正确的IP地址', trigger: 'blur' },
                { validator:validateIP, trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            email: [
                {   type: "email",min: 1, max: 20,required: true, message: '请输入正确的邮箱', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],  
            department: [
                { required: true, message: '请输入所在部门', trigger: 'blur'},
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            telephone: [
                { min: 1, max: 20, required: true, message: '请输入电话', trigger: 'blur'},
                { validator:validatePhoneTwo, trigger: 'blur' },
            ],
            token: [
                { message: '请输入令牌', trigger: 'blur'},
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

     },
    mounted() {
          this.getEnabledTypeList()
          this.getPermissonTypeList()          
    },
    methods: {
        dataInit(data){
            if(data){
                this.infoform = data;       
            }
        },
        getEnabledTypeList() {
             this.$axios.get(this.api.getEnabledTypeList,{params:this.GLOBAL.structure}).then(response => {
                this.EnabledTypeList = response
            });
        },
        getPermissonTypeList() {
            this.$axios.get(this.api.getPermissonTypeList,{params:this.GLOBAL.structure}).then(response => {
                this.PermissonTypeList = response
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
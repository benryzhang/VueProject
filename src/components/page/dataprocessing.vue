<template>
  <div id="sensorinfo">

    <!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
        <el-form label-width="100px" class="demo-ruleForm" size="max" :model="infoform" :rules="formrules" ref="infoform" :validate-on-rule-change="false">
        <!-- <el-divider content-position="left">基本信息</el-divider> -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="开始时间" prop="reportstarttime">
                            <el-date-picker
                                v-model="value1"
                                type="datetime"
                                placeholder="选择开始时间"
                                 @change="getSTime">
                                </el-date-picker>
                           
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="结束时间" prop="reportendtime">
                            <el-date-picker
                                v-model="value2"
                                type="datetime"
                                placeholder="选择结束时间"
                                 @change="getETime">
                                </el-date-picker>
                           
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
          
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="报告类型" prop="reporttype">
                            <el-select placeholder="请选择报告类型"  :label-in-value="true" value-key="subcode" v-model="infoform.reporttype" >
                                    <el-option
                                    v-for="item in reporttypelist"
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
                        <el-form-item label="报告时间" prop="reporttime">
                            <el-select placeholder="请选择报告时间" value-key="subcode"  v-model="infoform.reporttime" >
                                    <el-option
                                    v-for="item in reporttimeList"
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
                        <el-form-item label="" prop="permisson">
                            <el-button type="primary" @click="getReportInfoByTime">立即生成报告</el-button>
                                
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <!-- 确定按钮 -->
        <h5 style="margin: 0px;padding: 0px;"></h5>
        
        </el-form>
                
    </el-card>
  </div>
</template>
<script>
  export default {
    name: "userPanel",
    data() {
      return {
        value1: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        value2: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        reporttypelist:[{
          id: '1',
          text: '数据分析'
        }, {
          id: '2',
          text: '安全一级评定'
        }],
        reporttimeList:[{
          id: 'M',
          text: '月度报告'
        }, {
          id: 'S',
          text: '季度报告'
        }, {
          id: 'Y',
          text: '年度报告'
        }],
        infoform: {
            reportstarttime:'',
            reportendtime:'',
            reporttype:'',
            reporttime: '',
        },
        formrules: {
            reportstarttime: [
                { required: true, message: '请选择开始时间', trigger: 'change'}
            ], 
            reportendtime: [
                { required: true, message: '请选择结束时间', trigger: 'change' }
            ],
            reporttype: [
                { required: true, message: '请选择报告类型', trigger: 'change'}            
            ],
            reporttime: [
                { required: true, message: '请选择报告时间', trigger: 'change'}
            ],
        }
      };
    },
    created(){
          this.getSTime()
          this.getETime()
     },
    mounted() {
         
    },
    methods: {
        getSTime(val){
            this.infoform.reportstarttime = this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
        },
        getETime(val){
            this.infoform.reportendtime = this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
        },
        getReportInfoByTime () {
            this.$refs.infoform.validate(valid=>{
                if(valid){
                    var prm = {startTime:this.infoform.reportstarttime,endTime:this.infoform.reportendtime,reportType:this.infoform.reporttype,reportTime:this.infoform.reporttime,structure:this.GLOBAL.structure};
                    this.$axios.get(this.api.getReportInfoByTime,{params:prm}).then(response => {
                        this.$message({
                            message: JSON.parse(response).msg,
                            center: true
                        });
                    });
                }else{
                     this.$alert('请完善基本信息', '提示', {
                        confirmButtonText: '确定'
                    });
                }
            })	
      },
    }
  }
</script>
<style>

</style>
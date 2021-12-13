export default {
    getModelSensorElementInfo: process.env.VUE_APP_BASE_API + "/getModelSensorElementInfo",
    login: process.env.VUE_APP_BASE_API + "/login",                 //获取登录信息
    getcgqbytandp:process.env.VUE_APP_BASE_API + "/getcgqbytandp",  //获取传感器
    getMapWarnType:process.env.VUE_APP_BASE_API + "/getMapWarnType",//获取预警信息
    getviewinfo:process.env.VUE_APP_BASE_API + "/getviewinfo",      //获取工程简介内容 
    getallsensors:process.env.VUE_APP_BASE_API + "/getallsensors",  //获取所有传感器信息
    getcgqlx:process.env.VUE_APP_BASE_API + "/getcgqlx",            //获取传感器类型
    getcgqjccs:process.env.VUE_APP_BASE_API + "/getcgqjccs",        //获取传感器监测参数
    getszgjbh:process.env.VUE_APP_BASE_API + "/getszgjbh",          //获取传感器所在构件
    getsyscodeinfo:process.env.VUE_APP_BASE_API + "/getsyscodeinfo",//获取传感器信息相关
    getSectionIdByType:process.env.VUE_APP_BASE_API + "/getSectionIdByType",//获取截面信息
    getinfobykey:process.env.VUE_APP_BASE_API + "/getinfobykey",    //用传感器编号获取传感器信息 
    updatebaseinfo:process.env.VUE_APP_BASE_API + "/updatebaseinfo",//更新传感器信息 
    savebaseinfo:process.env.VUE_APP_BASE_API + "/savebaseinfo",    //新建传感器信息 
    getDamageInfoList:process.env.VUE_APP_BASE_API + "/getDamageInfoList",    //获取评定标准的查询时间
    getDamageInfoData:process.env.VUE_APP_BASE_API + "/getDamageInfoData",    //获取人工巡检评定标准数据
    getDamageTypeByBlockType:process.env.VUE_APP_BASE_API + "/getDamageTypeByBlockType",    //获取人工巡检评定标准病害类型
    getScaleListByDamageType:process.env.VUE_APP_BASE_API + "/getScaleListByDamageType",    //获取人工巡检评定标准病害标度
    getDamageDataById:process.env.VUE_APP_BASE_API + "/getDamageDataById",    //获取人工巡检评定标准病害详细信息，用于编辑窗口
    getDamageTypeByBlockType:process.env.VUE_APP_BASE_API + "/getDamageTypeByBlockType",    //获取人工巡检评定标准构件类型
    saveAddDamageDataInfo:process.env.VUE_APP_BASE_API + "/saveAddDamageDataInfo",    //获取人工巡检评定标准检测信息保存
    getAllRoleInfo:process.env.VUE_APP_BASE_API + "/adminInfo/getAllRoleInfo",    //获取所有人物角色权限
    getAllInfoData:process.env.VUE_APP_BASE_API + "/adminInfo/getAllInfoData",    //获取所有人物信息
    getUserInfoDataByUsername:process.env.VUE_APP_BASE_API + "/adminInfo/getUserInfoDataByUsername",    //获取所有人物信息
    getEnabledTypeList:process.env.VUE_APP_BASE_API + "/adminInfo/getEnabledTypeList",    //获取用户信息权限
    getPermissonTypeList:process.env.VUE_APP_BASE_API + "/adminInfo/getPermissonTypeList",    //获取用户状态是否可用
    saveAddDataInfo:process.env.VUE_APP_BASE_API + "/adminInfo/saveAddDataInfo",    //新增或修改保存用户信息
    deleteUserInfoData:process.env.VUE_APP_BASE_API + "/adminInfo/deleteUserInfoData",    //删除用户信息
    getAllAlarmInfo:process.env.VUE_APP_BASE_API + "/getAllAlarmInfo",    //获取预警值信息
    getsyscodeinfoinalarmlevel:process.env.VUE_APP_BASE_API + "/getsyscodeinfoinalarmlevel",    //获取预警级别
    getSensorcodeBySensortype:process.env.VUE_APP_BASE_API + "/getSensorcodeBySensortype",    //获取传感器编号
    getChannelcodeBySensorcode:process.env.VUE_APP_BASE_API + "/getChannelcodeBySensorcode",    //获取传感器通道编号
    getLimitKindInfo:process.env.VUE_APP_BASE_API + "/getLimitKindInfo",    //获取传感器阈值类型
    getAlarmVisibleInfo:process.env.VUE_APP_BASE_API + "/getAlarmVisibleInfo",    //获取传感器预警是否可见
    saveAddAlarmDataInfo:process.env.VUE_APP_BASE_API + "/saveAddAlarmDataInfo",    //保存预警信息
    deleteAlarmInfoData:process.env.VUE_APP_BASE_API + "/deleteAlarmInfoData",    //删除预警信息
    getReportInfoByTime:process.env.VUE_APP_BASE_API + "/getReportInfoByTime",    //手工生成数据报告

    getInitWarnInfo:process.env.VUE_APP_BASE_API + "/getInitWarnInfo",    //获取综合预警选择条件（预警时长、处置结果、传感器类型）
    getyjpgdatas:process.env.VUE_APP_BASE_API + "/getyjpgdatas",    //获取综合预警预警信息
    getyjpgdatasbystime:process.env.VUE_APP_BASE_API + "/getyjpgdatasbystime",    //获取综合预警预警信息 用时间查询
    
    

    
    getAQYJRTDataByCode:process.env.VUE_APP_BASE_API + "/getAQYJRTDataByCode",    //测试图标查询RT UAN数据
    getBasicSjfxInfo:process.env.VUE_APP_BASE_API + "/getBasicSjfxInfo",    //测试THM数据分析数据
    


    //------------------------------------------------------MAP 地图所用接口以下
    getStructInfo:process.env.VUE_APP_BASE_API + "/getStructInfo",    //获取结构体ID 使用状态等内容
    getviewinfo:process.env.VUE_APP_BASE_API + "/getviewinfo",    //获取平台简介内容
    geALLWarnNum:process.env.VUE_APP_BASE_API + "/geALLWarnNum",    //获取传感器按类型统计预警内容
    geALLSensorNum:process.env.VUE_APP_BASE_API + "/geALLSensorNum",    //获取按类型传感器数量
    getMapWarnInfo:process.env.VUE_APP_BASE_API + "/getMapWarnInfo",    //获取24小时预警信息
    getAllProjectInfo:process.env.VUE_APP_BASE_API + "/getAllProjectInfo",    //获取项目结构
    
    
    
    
    //------------------------------------------------------MAP 地图所用接口以上
    //------------------------------------------------------数据分析页面所用接口以下
    
    getMonitParaType:process.env.VUE_APP_BASE_API + "/getMonitParaType",  //获取传感器监测类别 {code":"1","name":"环境与荷载"},{"code":"2","name":"结构整体性能"},{"code":"3","name":"结构局部性能"}
    getSensorByMonitType:process.env.VUE_APP_BASE_API + "/getSensorByMonitType",  //获取传感器监测内容
    getSjfxSensorInfo:process.env.VUE_APP_BASE_API + "/getSjfxSensorInfo",  //获取传感器编号
    getSysInfoCodeByMainCode:process.env.VUE_APP_BASE_API + "/getSysInfoCodeByMainCode",  //获取默认传感器编号
    getTimeTypeInfo:process.env.VUE_APP_BASE_API + "/getTimeTypeInfo",  //获取默认时间
    
    
    
    //------------------------------------------------------数据分析页面所用接口以上


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
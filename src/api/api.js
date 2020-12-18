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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
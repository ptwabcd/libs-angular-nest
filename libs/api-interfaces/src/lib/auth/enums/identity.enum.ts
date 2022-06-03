export enum Identity {
  ALL                           = 99, // 未指派
  GENERAL_USER                  = 1,  // 一般使用者
  SOFTWARE_DEVELOPER            = 2,  // 軟體開發者
  DEVICE_ADMIN                  = 4,  // 裝置管理者
  FIRST_LEVEL_ADMIN             = 5,  // 一級系統管理者
  SECONDARY_ADMIN               = 6,  // 二級系統管理者
  THIRD_LEVEL_ADMIN             = 7,  // 三級系統管理者
  LEVEL_FOUR_ADMIN              = 8,  // 四級系統管理者
  FIRST_INSTANCE_EXAMINER       = 31, // 一審審查者
  SECOND_INSTANCE_EXAMINER      = 32, // 二審審查者
  THIRD_INSTANCE_EXAMINER       = 33  // 三審審查者
}

class RoleModel {
    constructor(roleId, roleName, statusFlag) {
      this.roleId = roleId;
      this.roleName = roleName;
      this.statusFlag = statusFlag;
    }
  
    static fromApiData(apiData) {
      // Convert API data to a RoleModel instance
      return new RoleModel(
        apiData.roleId,
        apiData.roleName,
        apiData.statusFlag
      );
    }
  }
  
  export default RoleModel;
/**
 * 定義可修改的使用者資料內容。
 * @typedef {Object} EditableUserData
 * @property {string} password 使用者密碼。
 * @property {string} rocId 使用者身份證字號。
 * @property {string} name 使用者姓名。
 * @property {string} mobilePhone 使用者手機。
 * @property {string} gender 使用者性別。
 */

/**
 * 定義註冊資料內容。
 * @typedef {Object} RegisterData
 * @property {string} email 使用者 email。
 * @property {EditableUserData} editableUserData 可修改的使用者資料內容。
 */

/**
 * 定義使用者完整資料內容。
 * @typedef {Object} UserData
 * @property {number} id 使用者 ID。
 * @property {RegisterData} registerData 使用者註冊資料。
 */

/**
 * 定義使用者 API 回傳的授權資料。
 * @typedef {Object} APIUserData
 * @property {string} accessToken 授權 Token。
 * @property {UserData} user 使用者資料（可能不會包含密碼）。
 */

import { defineRule, configure } from "vee-validate";
import { required, email } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zh_TW from "@vee-validate/i18n/dist/locale/zh_TW.json";

/** VeeValidate 相關功能 */
export class VeeValidateHelper {
  /**
   * 初始化 VeeValidate 環境。
   */
  static initEnv() {
    // 定義驗證規則
    defineRule("required", required);
    defineRule("email", email);

    // 配置設定
    configure({
      validateOnBlur: false,
      validateOnChange: false,
      generateMessage: localize({ zh_TW }),
    });

    // 設定預設語系為繁體中文
    setLocale("zh_TW");
  }
}

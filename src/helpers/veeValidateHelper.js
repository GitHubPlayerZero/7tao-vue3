import { defineRule, configure } from "vee-validate";
import { required, email, regex } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zh_TW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import { CheckHelper } from "./checkHelper";

/**
 * VeeValidate 相關功能。
 */
export class VeeValidateHelper {
  /**
   * 初始化 VeeValidate 環境。
   */
  static initEnv() {
    // 定義驗證規則
    defineRule("required", required);
    defineRule("email", email);
    defineRule("regex", regex);

    // 自訂身份證字號驗證規則
    defineRule("rocId", (value) => {
      return CheckHelper.isValidRocId(value);
    });

    // 自訂密碼驗證規則
    defineRule("password", (value) => {
      return CheckHelper.isValidPassword(value);
    });

    // 自訂確認密碼驗證規則
    defineRule("confirmPassword", (value, [target], ctx) => {
      return value === ctx.form[target];
    });

    // 配置設定
    configure({
      validateOnBlur: false,
      validateOnChange: false,

      generateMessage: localize({
        // 繁體中文訊息
        zh_TW: {
          messages: {
            ...zh_TW.messages, // 繼承預設訊息
            confirmPassword: "與密碼不相符",
          },
        },
      }),
    });

    // 設定預設語系為繁體中文
    setLocale("zh_TW");
  }
}

<template>
  <h2 class="mb-4">JS 測試</h2>

  <div class="d-flex gap-4">
    <button type="button" @click="testDateTool">測試 DateTool</button>
    <button type="button" @click="testTypeTool">測試 TypeTool</button>
    <button type="button" @click="testTypeToolNumber">測試 TypeTool (Number)</button>
  </div>
</template>

<script>
import { TypeUtils, DateStyles, DateUtils } from "@/helpers";

export default {
  data() {
    return {};
  },

  methods: {
    testDateTool() {
      console.clear();
      console.log(`========== 測試 DateTool - Start ==========`);

      // 測試 format 功能
      let testCases = [
        new Date("2024/1/5"),
        new Date("2024/02/07"),
        new Date("2024/03/9"),
        new Date("2025/4/13"),
        new Date("2025/5/20"),
        new Date("2025/06/1"),
        new Date("2025/7/9"),
        new Date("2025/8/19"),
        new Date("2025/9/02"),
        new Date("2025/10/30"),
        new Date("2025/11/08"),
        new Date("2025/12/21"),
        "2025/3/11",
        "aaa",
      ];

      // prettier-ignore
      try {
        console.log(DateUtils.getSysDate());
        console.log(DateUtils.getSysDate(DateStyles.yyyymdSlash));
        console.log(DateUtils.getSysDate(DateStyles.yyyymmdd));
        console.log(DateUtils.getSysDate(DateStyles.yyyymdDash));
        console.log(DateUtils.getSysDate(DateStyles.yyyymmddDash));
        console.log(DateUtils.getSysDate(DateStyles.dateAbbrMonthYear));
      }
      catch (error) {
        console.error(error);
      }
      finally {
        console.log(``);
      }

      testCases.forEach((d) => {
        // prettier-ignore
        try {
          console.log(`test ==>`, d, "|", typeof d);
          console.log(DateUtils.formatDate(d));
          console.log(DateUtils.formatDate(d, DateStyles.yyyymdSlash));
          console.log(DateUtils.formatDate(d, DateStyles.yyyymmdd));
          console.log(DateUtils.formatDate(d, DateStyles.yyyymdDash));
          console.log(DateUtils.formatDate(d, DateStyles.yyyymmddDash));
          console.log(DateUtils.formatDate(d, DateStyles.dateAbbrMonthYear));
        }
        catch (error) {
          console.error(error);
        }
        finally {
          console.log(``);
        }
      });

      // 測試其它功能
      testCases = [
        new Date(),
        "2025/3/11",
        "2025/1",
        "2025/1/32",
        0,
        new String("2025/3/11"),
        "123",
        NaN,
        Infinity,
        "aaa",
      ];

      testCases.forEach((val) => {
        // prettier-ignore
        try {
          console.log(`test ==>`, val, "|", typeof val);
          console.log(`isDate ==>`, DateUtils.isDate(val));
          console.log(`canBeDate ==>`, DateUtils.canBeDate(val));
        }
        catch (error) {
          console.error(error);
        }
        finally {
          console.log(``);
        }
      });

      console.log(`========== 測試 DateTool - End ==========`);
      console.log(``);
    },

    testTypeTool() {
      console.clear();
      console.log(`========== 測試 TypeTool - Start ==========`);

      const testCases = [
        new Date(),
        "2025/3/11",
        "2025/1",
        "2025/1/32",
        0,
        new String("2025/3/11"),
        new String("123"),
        "123",
        new Number(123),
        NaN,
        Infinity,
      ];

      testCases.forEach((val) => {
        // prettier-ignore
        try {
          console.log(`val ==>`, val, "|", typeof val);
          // console.log(`isPrimitiveString ==>`, TypeUtils.isPrimitiveString(val));
          // console.log(`isObjectString ==>`, TypeUtils.isObjectString(val));
          console.log(`isString ==>`, TypeUtils.isString(val));
        }
        catch (error) {
          console.error(error);
        }
        finally {
          console.log(``);
        }
      });

      console.log(`========== 測試 TypeTool - End ==========`);
      console.log(``);
    },

    testTypeToolNumber() {
      console.clear();
      console.log(`========== 測試 TypeTool (Number) - Start ==========`);

      const testCases = [
        "aaa",
        "123",
        new String("123"),
        123,
        new Number(123),
        NaN,
        Infinity,
        -Infinity,
        true,
        false,
        0,
        -0,
        "Infinity",
        "NaN",
      ];

      testCases.forEach((val) => {
        // prettier-ignore
        try {
          console.log(`val ==>`, val, "|", typeof val);
          console.log(`isInfinity ==>`, TypeUtils.isInfinity(val));
          console.log(`isNaN ==>`, TypeUtils.isNaN(val));
          // console.log(`isPrimitiveNumber ==>`, TypeUtils.isPrimitiveNumber(val));
          // console.log(`isObjectNumber ==>`, TypeUtils.isObjectNumber(val));
          // console.log(`isStrictNumber ==>`, TypeUtils.isStrictNumber(val));
          // console.log(`isLooseNumber ==>`, TypeUtils.isLooseNumber(val));
          console.log(`converToNumber ==>`, TypeUtils.converToNumber(val));
        }
        catch (error) {
          console.error(error);
        }
        finally {
          console.log(``);
        }
      });

      console.log(`========== 測試 TypeTool (Number) - End ==========`);
      console.log(``);
    },
  },
};
</script>

<style lang="scss" scoped></style>

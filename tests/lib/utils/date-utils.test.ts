import { calcDaysFromToday, calcDistanceFromToday, calcMonthsFromToday, calcYearsFromToday, getRelativeDays } from "lib/utils/date-utils";


describe("[lib] date-utils methods", () => {

  // from lib\utils\date-utils.ts

  // calcDaysfromToday
  it("calcDaysFromToday() Should return the number of days from today", () => {
    let dayBefore = new Date();
    dayBefore.setDate(new Date().getDate() - 7);
    const result = calcDaysFromToday(dayBefore);

    expect(result).toEqual(7);
  });

  // calcMonthsFromToday
  it("calcMonthsFromToday() Should return the number of months from today", () => {
    let monthBefore = new Date();
    monthBefore.setMonth(new Date().getMonth() - 3);
    const result = calcMonthsFromToday(monthBefore);

    expect(result).toEqual(3);
  });

  // calcYearsFromToday
  it("calcYearsFromToday() Should return the number of years from today", () => {
    let yearBefore = new Date();
    yearBefore.setFullYear(new Date().getFullYear() - 4);
    const result = calcYearsFromToday(yearBefore);

    expect(result).toEqual(4);
  });

  // getRelativeDays
  it("getRelativeDays() Should properly produce formats depending on the number of days", () => {

    let days = 0;
    let result = getRelativeDays(days);
    expect(result).toEqual("-");

    days = 29;
    result = getRelativeDays(days);
    expect(result).toEqual("29d");

    days = 60;
    result = getRelativeDays(days);
    expect(result).toEqual("2mo");

    days = 367;
    result = getRelativeDays(days);
    expect(result).toEqual("1y");
  });

  // calcDistanceFromToday
  it("calcDistanceFromToday() Should return distance between today and a date formatted to best time unit", () => {
    let date1 = new Date();
    date1.setDate(new Date().getDate() - 5);
    const result = calcDistanceFromToday(date1);
    expect(result).toEqual("5d");

    let date2 = new Date();
    date2.setMonth(new Date().getMonth() - 8);
    const result2 = calcDistanceFromToday(date2);
    expect(result2).toEqual("8mo");

    let date3 = new Date();
    date3.setFullYear(new Date().getFullYear() - 4);
    const result3 = calcDistanceFromToday(date3);
    expect(result3).toEqual("4y");

    let date4 = new Date();
    date4.setMonth(new Date().getMonth() - 24);
    const result4 = calcDistanceFromToday(date4);
    expect(result4).toEqual("2y");

    let date5 = new Date();
    date5.setDate(new Date().getDate() - 65);
    const result5 = calcDistanceFromToday(date5);
    expect(result5).toEqual("2mo");

  });

});

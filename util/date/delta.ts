const TimeDelta = {
  absoluteTimeDifferenceInHours: (date1: Date, date2: Date): number => {
    return Math.abs(date1.getTime() - date2.getTime()) / 36e5;
  },
};

export default TimeDelta;

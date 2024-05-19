export {};

declare global {
  interface Date {
    addDays(days: number, useThis?: boolean): Date;
    isToday(): boolean;
    isSameDate(date: Date): boolean;
  }
}

Date.prototype.addDays = function (days: number): Date {
  if (!days) return this;
  this.setDate(this.getDate() + days);
  return this;
};

Date.prototype.isToday = function (): boolean {
  const today = new Date();
  return this.isSameDate(today);
};

Date.prototype.isSameDate = function (date: Date): boolean {
  return (
    date &&
    this.getFullYear() === date.getFullYear() &&
    this.getMonth() === date.getMonth() &&
    this.getDate() === date.getDate()
  );
};

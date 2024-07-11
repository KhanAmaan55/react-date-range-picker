import React, { useState, useRef, useEffect } from "react";
import "./DateRangePicker.scss";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const DateRangePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const data: (number | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      data.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      data.push(i);
    }

    return data;
  };

  const handleDateClick = (day: number, monthOffset: number) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      day
    );

    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      setDateRange({ startDate: clickedDate, endDate: null });
    } else if (dateRange.startDate && !dateRange.endDate) {
      if (clickedDate < dateRange.startDate) {
        setDateRange({ startDate: clickedDate, endDate: dateRange.startDate });
      } else {
        setDateRange({ ...dateRange, endDate: clickedDate });
      }
    }
  };

  const isDateInRange = (day: number, monthOffset: number) => {
    if (!dateRange.startDate || !dateRange.endDate) return false;
    const currentDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      day
    );
    return (
      currentDate >= dateRange.startDate && currentDate <= dateRange.endDate
    );
  };

  const isDateSelected = (day: number, monthOffset: number) => {
    const currentDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      day
    );
    return (
      currentDate.getTime() === dateRange.startDate?.getTime() ||
      currentDate.getTime() === dateRange.endDate?.getTime()
    );
  };

  const renderMonth = (monthOffset: number) => {
    const monthDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      1
    );
    const monthData = getMonthData(monthDate);

    return (
      <div className="month">
        <h3>
          {monthDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="calendar">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          {monthData.map((day, index) => (
            <div
              key={index}
              className={`day ${day === null ? "empty" : ""} ${
                isDateInRange(day as number, monthOffset) ? "in-range" : ""
              } ${
                isDateSelected(day as number, monthOffset) ? "selected" : ""
              }`}
              onClick={() => day !== null && handleDateClick(day, monthOffset)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const formatDateRange = () => {
    if (dateRange.startDate && dateRange.endDate) {
      return `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`;
    } else if (dateRange.startDate) {
      return dateRange.startDate.toLocaleDateString();
    }
    return "";
  };

  return (
    <div className="date-range-picker-container" ref={pickerRef}>
      <input
        type="text"
        className="date-range-input"
        value={formatDateRange()}
        onClick={() => setIsOpen(true)}
        readOnly
        placeholder="Select date range"
      />
      {isOpen && (
        <div className="date-range-picker">
          <div className="calendars">
            <button onClick={handlePrevMonth}>&lt;</button>
            {renderMonth(0)}
            {renderMonth(1)}
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

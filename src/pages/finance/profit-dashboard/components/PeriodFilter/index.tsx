import { DatePicker, Segmented } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { FC } from 'react';

export type PeriodMode = 'year' | 'month';

export interface PeriodValue {
  mode: PeriodMode;
  year: number;
  /** 年度模式下忽略此字段 */
  month: number;
}

export interface PeriodFilterProps {
  value: PeriodValue;
  onChange: (value: PeriodValue) => void;
}

const PeriodFilter: FC<PeriodFilterProps> = ({ value, onChange }) => {
  const { mode, year, month } = value;

  const handleModeChange = (newMode: string | number) => {
    onChange({
      ...value,
      mode: newMode as PeriodMode,
    });
  };

  const handleYearChange = (d: Dayjs | null) => {
    if (d) {
      onChange({ ...value, year: d.year() });
    }
  };

  const handleMonthChange = (d: Dayjs | null) => {
    if (d) {
      onChange({ ...value, month: d.month() + 1 });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
      }}
    >
      <span>数据周期：</span>
      <Segmented
        value={mode}
        onChange={handleModeChange}
        options={[
          { label: '年度', value: 'year' },
          { label: '月度', value: 'month' },
        ]}
      />
      <DatePicker
        picker="year"
        value={dayjs().year(year)}
        onChange={handleYearChange}
        allowClear={false}
      />
      {mode === 'month' && (
        <DatePicker
          picker="month"
          value={dayjs(`${year}-${String(month).padStart(2, '0')}`)}
          onChange={handleMonthChange}
          allowClear={false}
        />
      )}
    </div>
  );
};

export default PeriodFilter;

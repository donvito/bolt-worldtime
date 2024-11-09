import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TimeZoneSelectorProps {
  selectedTimezone: string;
  onTimezoneChange: (timezone: string) => void;
}

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({
  selectedTimezone,
  onTimezoneChange,
}) => {
  const currentTime = new Date();
  
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Select Your Timezone
      </h2>
      <select
        value={selectedTimezone}
        onChange={(e) => onTimezoneChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {Intl.supportedValuesOf('timeZone').map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
      <p className="text-sm text-slate-400">
        Current time in your timezone:{' '}
        <span className="font-medium text-white">
          {format(currentTime, 'hh:mm:ss a')}
        </span>
      </p>
    </div>
  );
}

export default TimeZoneSelector;
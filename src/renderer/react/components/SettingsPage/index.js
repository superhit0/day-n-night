import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Toggle from '../Toggle';
import SettingsHeader from '../SettingsHeader';

import 'rc-time-picker/assets/index.css';

const format = 'HH:mm';

const getDefaultValue = ({ hour, minutes }) => (
  moment(`${hour}:${minutes}`, format)
);

const mapBoundLimits = (value) => {
  const [ hour, minutes ] = value && value.format(format).split(':') || [ '', '' ];

  return {
    hour,
    minutes
  };
};

export default function({ setShowSettingsPage, boundType, setBoundType, boundLimits, setBoundsLimits }) {
  const onChange = (boundLimit, { hour, minutes }) => {
    boundLimits[boundLimit] = {
      hour,
      minutes
    };
    setBoundsLimits(boundLimits);
  };

  return (
    <div className="container vh-100 bg-light">
      <SettingsHeader setShowSettingsPage={setShowSettingsPage} />
      <hr className="mt-1" />
      <div>
        <label className="h5">Awake Mode</label>
        <div className="float-right">
          <Toggle
            value={boundType === 'awake'}
            onToggle={() => {
              boundType === 'awake'
                ? setBoundType('day')
                : setBoundType('awake')
            }}
          />
        </div>
      </div>
      <div className="h5 mt-2 mb-1">
        Awake Time
      </div>
      <div>
        <TimePicker
          defaultValue={getDefaultValue(boundLimits.min)}
          showSecond={false}
          className="w-48 px-1"
          onChange={(value) => onChange('min', mapBoundLimits(value))}
          format={format}
          inputReadOnly
          disabled={boundType !== 'awake'}
        />
        -
        <TimePicker
          defaultValue={getDefaultValue(boundLimits.max)}
          showSecond={false}
          className="w-48 px-1"
          onChange={(value) => onChange('max', mapBoundLimits(value))}
          format={format}
          inputReadOnly
          disabled={boundType !== 'awake'}
        />
      </div>
    </div>
  );
}

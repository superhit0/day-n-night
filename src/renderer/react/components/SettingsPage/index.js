import React from 'react';
import TimePicker from 'rc-time-picker';
import Toggle from '../Toggle';
import SettingsHeader from '../SettingsHeader';

import 'rc-time-picker/assets/index.css';

export default function({ setShowSettingsPage, boundType, setBoundType }) {
  const format = 'H:mm';
  const onChange = () => {};
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
          showSecond={false}
          className="w-48 px-1"
          onChange={onChange}
          format={format}
          inputReadOnly
        />
        -
        <TimePicker
          showSecond={false}
          className="w-48 px-1"
          onChange={onChange}
          format={format}
          inputReadOnly
        />
      </div>
    </div>
  );
}

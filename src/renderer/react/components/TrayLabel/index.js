import React from 'react';

export default function({ text = '' }) {
  return (
    <div className="display-2 text-center h-auto w-100 pt-5">
      { text }
    </div>
  )
}

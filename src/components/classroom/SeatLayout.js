import React from 'react';
import { RiSofaLine } from 'react-icons/ri';

const SeatLayout = ({ layout, onSeatClick }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {layout.map((group, groupIndex) => (
        <div key={groupIndex} className="flex items-center justify-between p-3 rounded-md shadow-md bg-slate-300">
          {group.map((seat, seatIndex) => (
            <div
              key={seatIndex}
              onClick={() => onSeatClick(seat)}
              className={`w-10 h-10 flex items-center justify-center bg-slate-200 rounded-lg shadow-md cursor-pointer hover:bg-slate-300 transition-colors`}
              title={`Seat No: ${seat.seatNo}, Student: ${seat.student || 'None'}`}
            >
              <RiSofaLine className={`text-4xl ${seat.status === 'occupied' ? 'text-red-500' : 'text-green-600'}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatLayout;

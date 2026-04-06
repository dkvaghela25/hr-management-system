import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsMegaphone } from 'react-icons/bs';
import { FaAward } from 'react-icons/fa';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      icon: <BiCalendar size={18} className="text-indigo-600" />,
      title: "Quarterly Town Hall",
      desc: "Join us this Friday at 4 PM in the main conference hall.",
      date: "April 10"
    },
    {
      id: 2,
      icon: <FaAward size={18} className="text-pink-500" />,
      title: "Annual Rewards & Recognition",
      desc: "Nominations for 'Employee of the Month' are now open.",
      date: "April 12"
    },
    {
      id: 3,
      icon: <BsMegaphone size={18} className="text-orange-500" />,
      title: "New Policy Update",
      desc: "Please review the updated remote work guidelines in the settings.",
      date: "April 15"
    }
  ];

  return (
    <div className="bg-white border border-gray-100 shadow-sm p-6 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Announcements</h2>
        <button className="text-indigo-600 font-medium text-sm hover:underline">View All</button>
      </div>

      <div className="flex flex-col gap-6">
        {announcements.map((item) => (
          <div key={item.id} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0">
            <div className="p-2 bg-gray-50 rounded-lg">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mt-2 block">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
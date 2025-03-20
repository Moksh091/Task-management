import { CiCircleList } from "react-icons/ci";
import { FiInbox } from "react-icons/fi";
import { IoChevronDown, IoChevronUp, IoHome } from "react-icons/io5";
import { PiDotsThreeBold, PiSpiral } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GoPlus } from "react-icons/go";

function Sidebar() {
  return (
    <div className="w-64 bg-[#f4f6f8] px-4 py-4">
      <p className="font-semibold text-black text-lg">Task.Co</p>
      <div className=" py-2 border-b border-b-gray-200 w-full">
        <button className="flex items-center gap-2">
          <IoHome />
          Dashboard
        </button>
        <button className="flex items-center gap-2">
          <FiInbox />
          Inbox
        </button>
        <button className="flex items-center gap-2">
          <SlCalender />
          Calendar
        </button>
        <button className="flex items-center gap-2">
          <PiSpiral />
          Assigned to me
        </button>
        <button className="flex items-center gap-2 pb-4">
          <CiCircleList />
          Created by me
        </button>
        <button className="flex items-center justify-between gap-2 border-t border-gray-200 py-2 w-full">
          <div className="flex items-center gap-2">
            <IoChevronDown />
            Favorites
          </div>
          <div className="flex items-center gap-2">
            <PiDotsThreeBold />
            <GoPlus />
          </div>
        </button>
        <button className="flex items-center justify-between gap-2 border-t border-gray-200 py-2 w-full">
          <div className="flex items-center gap-2">
            <IoChevronUp />
            Projects
          </div>
          <div className="flex items-center gap-2">
            <PiDotsThreeBold />
            <GoPlus />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

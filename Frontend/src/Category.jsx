import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { LuSoup } from "react-icons/lu";
import { GiNoodles } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { GiFullPizza } from "react-icons/gi";
import { PiHamburgerBold } from "react-icons/pi";
export const categories=[
    {
        id:1,
        name:"All",
        image:<TiThSmallOutline  className='text-green-400 w-[50px] h-[50px] '/>
    },
      {
        id:2,
        name:"breakfast",
        image:<MdOutlineFreeBreakfast className='text-green-400 w-[50px] h-[50px] ' />
    },
      {
        id:3,
        name:"Soup",
        image:<LuSoup className='text-green-400 w-[50px] h-[50px] '/>
    },
      {
        id:4,
        name:"pasta",
        image:<GiNoodles className='text-green-400 w-[50px] h-[50px] ' />
    },
      {
        id:5,
        name:"burger",
        image:<PiHamburgerBold className='text-green-400 w-[50px] h-[50px] '/>
    },
      {
        id:6,
        name:"main_course",
        image:<ImSpoonKnife className='text-green-400 w-[50px] h-[50px] ' />
    },
      {
        id:7,
        name:"pizza",
        image:<GiFullPizza className='text-green-400 w-[50px] h-[50px] '/>
    },
]
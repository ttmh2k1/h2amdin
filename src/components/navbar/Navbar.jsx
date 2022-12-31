import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import React from "react";
import Avatar from 'react-avatar'
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <DarkModeOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <FullscreenExitIcon className="icon" />
        </div>
        <div className="items">
          <ChatBubbleOutlineOutlinedIcon className="icon" />
          <div className="couter">1</div>
        </div>
        <div className="items">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="couter">1</div>
        </div>
        <div className="items">
          <ReorderOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <Avatar className='avatar' name={localStorage.getItem('fullname')} style={undefined} />
          {/* <img
            src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/306270860_3298140720458506_3713114337754087711_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FGP8MS6oV-gAX8taVEq&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT8OvTv8zRndTwKqLh-t1H7ec3Rh-uw4yNejjn-k0wA5hg&oe=635E6371"
            alt="avatar"
            className="avatar"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

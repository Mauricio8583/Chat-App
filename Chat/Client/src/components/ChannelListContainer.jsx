import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from '.';
import Cookies from 'universal-cookie';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const cookie = new Cookies();

const SideBar = ({ logout }) => {
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={HospitalIcon} alt="Hospital" width="30"/>
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className='icon2__inner' onClick={logout} > 
                <img src={LogoutIcon} alt="Hospital" width="30"/>
            </div>
        </div>
    </div>
}

const CompanyHeader = () => {
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Medical Pager</p>
    </div>
}

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');

}

const customChannelMessaginFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'Messagin');

}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => { // Function that shows the content of the chat channels

    const { client } = useChatContext();

    const logout = () => { // Function that logout the user
        cookie.remove("token");
        cookie.remove("userID");
        cookie.remove("username");
        cookie.remove("fullName");
        cookie.remove("avatarURL");
        cookie.remove("hashedPassword");
        cookie.remove("phoneNumber");

        window.location.reload();
    }

    const filters = {  members: { $in : [client.userID] } } // Get the chat members according to the ID from the user

    return (
        <>
          <SideBar logout={logout} />
          <div className='channel-list__header__wrapper'>
              <CompanyHeader />
              <ChannelSearch  setToggleContainer={setToggleContainer} />
              <ChannelList filters={{filters}} channelRenderFilterFn={customChannelTeamFilter} List={(listProps) => (
                  <TeamChannelList 
                     {...listProps}
                     type="team"
                     isCreating={isCreating}
                     setIsCreating={setIsCreating}
                     setCreateType={setCreateType}    // Shows the content of the team chat
                     setIsEditing={setIsEditing}
                     setToggleContainer={setToggleContainer}
                  />   
              )} Preview={(previewProps) => (
                  <TeamChannelPreview 
                     {...previewProps}
                     type="team"
                     isCreating={isCreating}
                     setIsCreating={setIsCreating}  // Shows the preview from the team chat
                     setCreateType={setCreateType}
                     setIsEditing={setIsEditing}
                     setToggleContainer={setToggleContainer}
                  />   
                   
              )} />
              <ChannelList filters={{filters}} channelRenderFilterFn={customChannelMessaginFilter} List={(listProps) => (
                  <TeamChannelList 
                     {...listProps}
                     type="messaging"
                     isCreating={isCreating}
                     setIsCreating={setIsCreating}
                     setCreateType={setCreateType}   // Shows the team chat during the message
                     setIsEditing={setIsEditing}
                     setToggleContainer={setToggleContainer}
                  />   
              )} Preview={(previewProps) => (
                  <TeamChannelPreview 
                     {...previewProps}
                     type="messaging"
                     setIsCreating={setIsCreating} // Shows the preview during the message
                     setIsEditing={setIsEditing}
                     setToggleContainer={setToggleContainer}
                  />   
                   
              )} />
          </div>
        </>
    )
}

const ChannelListContainer = ( { setCreateType, setIsCreating, setIsEditing } ) => {

    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
           <div className='channel-list__container'>
               <ChannelListContent 
                 setIsCreating={setIsCreating}
                 setCreateType={setCreateType}
                 setIsEditing={setIsEditing}
               
               />
           </div>

           <div className='channel-list__container-responsive' style={ { left: toggleContainer ? "0%" : "-89%" , backgroundColor: "#005fff"}} >
               <div className='channel-list__container-toggle' onClick={ () => setToggleContainer(prevToggleContainer => !prevToggleContainer) } >

               </div>
               <ChannelListContent 
               setIsCreating={setIsCreating}
               setCreateType={setCreateType}
               setIsEditing={setIsEditing}
               setToggleContainer={setToggleContainer}
               />

               

           </div>
        </>
    )


}

export default ChannelListContainer;
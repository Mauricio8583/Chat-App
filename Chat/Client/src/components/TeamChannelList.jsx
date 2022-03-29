import React from 'react';
import { AddChannel } from '../assets';

const TeamChannelList = ({children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer  }) => {
    if(error){
        return type === "team" ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error
                </p>
            </div>
        ) : null; // Shows a error if the connection fails
    }
    if(loading){
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === "team" ? "Channel" : "Messages"}...loading 
                </p>
            </div>
        ) // Show while it is loading
    }
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                {type === "team" ? "Channel" : "Direct Messages"} 
                </p>
                <AddChannel 
                  isCreating={isCreating}
                  setIsCreating={setIsCreating}
                  setCreateType={setCreateType}
                  setIsEditing={setIsEditing}
                  setToggleContainer={setToggleContainer}
                  type={type === 'team' ? 'Team' : 'Messaging'}
                />
            </div>
            {children}
        </div> // Show the options if it is a team chat or a user chat
    )
}

export default TeamChannelList;
import React, { useState } from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import { ChannelContainer, ChannelListContainer, Auth } from './components';
import Cookies from 'universal-cookie';

import 'stream-chat-react/dist/css/index.css';
import './App.css';


const cookies = new Cookies();  // Makes the cookies ready to be used

const apiKey = "cxgek3p7zwtf";  // Key wich can be found in the Stream site in the dashboard

const client = StreamChat.getInstance(apiKey); // Get the client attached to the key

const authToken = cookies.get("token"); 

if(authToken){
    client.connectUser({
        id: cookies.get("userID"),
        token: cookies.get("token"),
        name: cookies.get("username"),
        fullName: cookies.get("fullName"),             // Checks if the accessToken exist to connect to user to the chat 
        phoneNumber: cookies.get("phoneNumber"),
        image: cookies.get("avatarURL"),
        hashedPassword: cookies.get("hashedPassword")
    }, authToken);
}

const App = () => {

    const [ createType, setCreateType ] = useState('');
    const [ isCreating, setIsCreating ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);

    if(!authToken){
        return <Auth />  // Directs to the auth page if the authToken doesen´t exists
    }

    return (
        <div className="app__wrapper">
            <Chat client = {client} theme="team light">
                <ChannelListContainer
                 isCreating = {isCreating}
                 setIsCreating = {setIsCreating}
                 setCreateType = {setCreateType}
                 setIsEditing = {setIsEditing}
                />                                      
                <ChannelContainer                    
                isCreating = {isCreating}
                setIsCreating = {setIsCreating}
                isEditing = {isEditing}
                setIsEditing = {setIsEditing}
                createType = {createType}
                />
            </Chat>
        </div>   // Show the chats containers
    )
}

export default App;
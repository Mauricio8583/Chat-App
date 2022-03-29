import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { SearchIcon } from '../assets';
import { ResultsDropdown } from './';

const ChannelSearch = ( { setToggleContainer } ) => {
    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {

        if(!query){
            setTeamChannels([]);
            setActiveChannel([]);  // Set the values to nothing if there is nothing on query
        }

    }, [query])

    const getChannels = async (text) => {
        try{
            const channelResponse = client.queryChannels({ type: 'team', name: { $autocomplete: text }, members: { $in: [client.userID] } });
            const userResponse = client.queryUsers({ id: { $ne: client.userID }, name: { $autocomplete: text } });
            
            const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

            if(channels.length) setTeamChannels(channels); // Send the chat channels to setTeamChannels

            if(users.length) setDirectChannels(users);  // Send the users to setDirectChannels

        }catch(err){
            setQuery('');
        }
    }

    const onSearch = (e) => { // Function that search for the content
        e.preventDefault();
        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);

    }

    const setChannel = (channel) => { // Function the actives the chat channel informed
        setQuery('');
        setActiveChannel(channel);
    } 

    return (
        <div className='channel-search__conatainer'>
            <div className='channel-search__input__wrapper'>
                <div className='channel-search__input__icon'>
                    < SearchIcon />
                </div>
                <input className='channel-search__input__text' placeholder='Search' type='text' value={query} onChange={onSearch}></input>
            </div>
            { query && (
                <ResultsDropdown 
                teamChannels={teamChannels}
                directChannels={directChannels}
                loading={loading}
                setChannel={setChannel}  // Shows the resulst according to query
                setQuery={setQuery}
                setToggleContainer={setToggleContainer}
                
                />

                
            ) }
        </div>
    )
}

export default ChannelSearch;
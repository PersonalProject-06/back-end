import React ,{useContext} from 'react'
import {ChatContext} from '../../context/ChatProvider'

const ChatBox = () => {
  const {slectedChat} = useContext(ChatContext)
  console.log(user);
  return (
    <div>ChatBox</div>
  )
}

export default ChatBox
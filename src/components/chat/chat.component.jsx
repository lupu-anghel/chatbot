import React, {useContext} from "react";
import BotMessage from "../bot/bot-message.component";
import UserMessage from "../user/user-message.component";
import { MessagesContext } from "../../context/messages.context";
import './chat.styles.scss'

const Chat = () => {
    const { messages, loading, hasError} = useContext(MessagesContext);

    return (
        
        <div className="chat">
            <div className="chat-header">
                <p> <i className="chatbot-icon"></i>LSEG chatbot</p>
            </div>
            <div className="chat-body">
                {loading  
                    ? <p>Loading...</p> 
                : messages.length > 0 ? 
                
                    messages.map((message, i) => 
                        
                        <div className="row" key={i}>
                            <UserMessage message={message.user}/>
                            <BotMessage  message={message.bot} disabled={messages.length <= 2 ? false : i === messages.length - 1 ? false : true}/>
                        </div>
                        
                    )
                        
                : hasError 
                    ? <p>Oops an error occured, please try again later. If the problem persists, please contact the system administrator.</p>  
                : <p>Unhandled exception</p>}
            </div>
           
            <div className="chat-footer">
                <input type="text" placeholder="Please pick an option" disabled={true}/>
            </div>                                        
        </div>
    )
};

export default Chat;
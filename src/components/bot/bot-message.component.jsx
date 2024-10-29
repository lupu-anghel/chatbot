import { useContext } from "react";
import { MessagesContext } from "../../context/messages.context";
import './bot-message.styles.scss';

const BotMessage = ({message, disabled}) => {
    const { handleMessage } = useContext(MessagesContext);

    const nextMesageTypes = {
        'stockExchange': 'stock',
        'stock': 'price',
        'back': 'back',
        'main': 'stockExchange'
    }

    const createBotMessage = (type, id, parentId) => handleMessage(type, id, parentId);

    return <div className="bot-card">
        <div className="title">
            {message.title}
        </div>
        {
            <div className="body">
                {
                    message.items.map(item => (
                        <button 
                            type='button' 
                            className='choice' 
                            key={item.id}
                            onClick={() => {
                                createBotMessage(
                                    nextMesageTypes[item.type], 
                                    item.id, 
                                    item.parentId 
                                )}
                            }
                            disabled = {disabled}
                        >
                            {item.name}
                        </button>
                    ))
                }
            </div>
        }
    </div>

}

export default BotMessage;
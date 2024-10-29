import { createContext, useState, useEffect } from "react";

export const MessagesContext = createContext({
    loading: true,
    messages: [],
    hasError: false,
    handleMessage: () => {}
});

//function that generates the next message based on where the user is in the journey
const generateMessage = (props) => {
   
    const {type, id, parentId, stockData, messages, setMessages} = props;
    
    switch(type){
        case 'stockExchange': { 
            const messageData = {bot: {title:'Please select a Stock Exchange.', items: []}, user: ""};

            for(let k in stockData){
                messageData.bot.items.push({id: k, parentId: null, name: stockData[k].stockExchange, type: type});
            }

            setMessages([...messages, messageData]);
            break;
        }
        case 'stock': {
            const messageData = {bot: {title:'Please select a stock', items: []}, user: ""};
            for(let k in stockData){
                if(k === id){
                    messageData.user = stockData[k].stockExchange;
                    stockData[k].topStocks.forEach(stock => {
                        messageData.bot.items.push({id: stock.code, parentId: k, name: stock.stockName, type: type});
                    });
                }
            }
            setMessages([...messages, messageData]);
            break;
        }
        case 'price': {
            const messageData = {bot: {title:'', items: []}, user: ""};

            stockData[parentId].topStocks.forEach((item) =>{
                if(item.code === id){
                    messageData.user = item.stockName;
                    messageData.bot.title = `Stock price of ${item.stockName} is ${item.price}. Please select an option`;
                }
            });
            messageData.bot.items= [
                {id: 'main', parentId: null, name: 'Main menu', type: 'main'},
                {id: 'back', parentId: null, name: 'Go Back', type: 'back'}
            ];

            setMessages([...messages, messageData]);
            break;
        }
        case 'back':{
            const previous =  messages[messages.length - 2];
            previous.user = 'Go Back';
            setMessages([...messages, previous]);
            break;
        }
        default:
            break;
            
    }
    
}


export const MessagesProvider = ({children}) => {
    
    const [messages, setMessages] = useState([
        {bot: {title: 'Hello! Welcome to LSEG. I\'m here to help you.', items: []}, user: '' }
    ]);
   
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    
    //exposed function that allows to control the state of the chat messages
    const handleMessage = (type, id, parentId) =>{

        setTimeout(() => {
            //setTimeout to mimic server behavior
            fetch(`data/stocks.json`)
                .then(async (response) => {
                    const stockData = await response.json();
                    
                    setLoading(false);
                    generateMessage({type, id, parentId, stockData, messages, setMessages});
                })
                .catch((error) => {
                    setLoading(false);
                    setHasError(true);
                });
        }, 1000);
    }

    const value = {messages, loading, hasError, handleMessage};

    useEffect(() => {
        
        handleMessage('stockExchange', null, null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MessagesContext.Provider value={value}> {children} </MessagesContext.Provider>
    )
}
import { useState } from 'react';
import useChats from './hooks/useChats';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

function App() {
    const {
        chats,
        activeChat,
        activeChatId,
        createChatWithMessage,
        selectChat,
        deleteChat,
        addMessage
    } = useChats();

    const [selectedModel, setSelectedModel] = useState('gpt-4o');

    const handleSendMessage = (messageData) => {
        const { content, files = [] } = messageData;

        if (!activeChatId) {
            // Создаем новый чат с первым сообщением
            const userMessage = {
                id: Date.now().toString(),
                role: 'user',
                content,
                files,
                timestamp: Date.now()
            };

            const newChatId = createChatWithMessage(selectedModel, userMessage);

            setTimeout(() => {
                addMessage(newChatId, {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: `Это ответ от ${selectedModel}. Я получил ваш запрос: "${content}".`,
                    timestamp: Date.now()
                });
            }, 1000);
        } else {
            // Добавляем сообщение в существующий чат
            const userMessage = {
                id: Date.now().toString(),
                role: 'user',
                content,
                files,
                timestamp: Date.now()
            };

            addMessage(activeChatId, userMessage);

            setTimeout(() => {
                addMessage(activeChatId, {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: `Это ответ от ${activeChat?.model || 'AI'}. В реальном проекте здесь будет ответ с бэкенда.`,
                    timestamp: Date.now()
                });
            }, 1000);
        }
    };

    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden font-sans text-gray-900">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onSelectChat={selectChat}
                onNewChat={() => selectChat(null)}
                onDeleteChat={deleteChat}
            />
            <ChatArea
                activeChat={activeChat}
                activeChatId={activeChatId}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
}

export default App;
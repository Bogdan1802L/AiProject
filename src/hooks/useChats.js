import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'reachat_chats';
const ACTIVE_KEY = 'reachat_active_chat';

export default function useChats() {
    const [chats, setChats] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [activeChatId, setActiveChatId] = useState(() => {
        return localStorage.getItem(ACTIVE_KEY) || null;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        if (activeChatId) {
            localStorage.setItem(ACTIVE_KEY, activeChatId);
        } else {
            localStorage.removeItem(ACTIVE_KEY);
        }
    }, [activeChatId]);

    const activeChat = chats.find(c => c.id === activeChatId);

    const createChat = useCallback((model = 'gpt-4o') => {
        const newChat = {
            id: Date.now().toString(),
            title: 'Новый чат',
            model,
            messages: [],
            createdAt: Date.now()
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
    }, []);

    const createChatWithMessage = useCallback((model, firstMessage) => {
        const chatId = Date.now().toString();
        const content = firstMessage.content || '';
        const newChat = {
            id: chatId,
            title: content.slice(0, 30) + (content.length > 30 ? '...' : 'Новый чат'),
            model,
            messages: [firstMessage],
            createdAt: Date.now()
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(chatId);
        return chatId;
    }, []);

    const selectChat = useCallback((id) => {
        setActiveChatId(id);
    }, []);

    const deleteChat = useCallback((id) => {
        setChats(prev => prev.filter(c => c.id !== id));
        if (activeChatId === id) {
            const remaining = chats.filter(c => c.id !== id);
            setActiveChatId(remaining[0]?.id || null);
        }
    }, [activeChatId, chats]);

    const addMessage = useCallback((chatId, message) => {
        setChats(prev => prev.map(chat => {
            if (chat.id === chatId) {
                const updatedMessages = [...chat.messages, message];
                const title = chat.title === 'Новый чат' && message.role === 'user'
                    ? (message.content || '').slice(0, 30) + ((message.content || '').length > 30 ? '...' : '')
                    : chat.title;
                return { ...chat, messages: updatedMessages, title };
            }
            return chat;
        }));
    }, []);

    return {
        chats,
        activeChat,
        activeChatId,
        createChat,
        createChatWithMessage,
        selectChat,
        deleteChat,
        addMessage
    };
}
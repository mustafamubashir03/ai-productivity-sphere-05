
import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChatMessage, processChatQuery } from "@/services/chatbotService";
import { Avatar } from "@/components/ui/avatar";

interface ChatbotUIProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotUI: React.FC<ChatbotUIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi there! I'm the Top AI Tools assistant. I can help you discover AI tools, compare them, or find helpful blog posts. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      const response = await processChatQuery(userMessage.content, messages);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.content,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error while processing your request. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-focus the textarea when the chatbot opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const renderMessageContent = (content: string) => {
    // Process links in the response
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = content.split(linkRegex);
    
    if (parts.length === 1) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }
    
    const elements: React.ReactNode[] = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        elements.push(<span key={`text-${i}`}>{parts[i]}</span>);
      } else if (i % 3 === 1) {
        const url = parts[i + 1];
        elements.push(
          <a 
            key={`link-${i}`}
            href={url}
            className="text-primary hover:underline font-medium"
          >
            {parts[i]}
          </a>
        );
      }
    }
    
    return <p className="whitespace-pre-wrap">{elements}</p>;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[350px] md:w-[400px] h-[550px] shadow-2xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Top AI Tools Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn("flex", {
              "justify-end": message.role === "user",
            })}
          >
            <div
              className={cn("max-w-[80%] rounded-2xl p-3", {
                "bg-primary text-primary-foreground": message.role === "user",
                "bg-gray-100 dark:bg-gray-800": message.role === "assistant",
              })}
            >
              {message.role === "assistant" && (
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <img src="/favicon.svg" alt="Top AI Tools" />
                  </Avatar>
                  <span className="text-xs font-medium">Top AI Tools</span>
                </div>
              )}
              {renderMessageContent(message.content)}
              <div className="text-right mt-1">
                <span className="text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 max-w-[80%] flex items-center">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about AI tools, comparisons, or blogs..."
            className="pr-12 max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            className="absolute right-2 bottom-2 h-8 w-8 p-0"
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
          >
            {inputMessage.trim() ? <Send className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;

import { useState } from "react";
import { Bell, X, Mail, MailOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { messages as initialMessages, Message } from "./mock-data";
import { useApp } from "../contexts/AppContext";
import { translations } from "../utils/translations";
import { formatDistanceToNow } from "date-fns";

interface MessagesPopupProps {
  onHoverPreview?: boolean;
}

export function MessagesPopup({ onHoverPreview }: MessagesPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const { language } = useApp();
  const t = translations[language];

  const unreadCount = messages.filter((m) => !m.read).length;
  const recentMessages = messages.slice(0, 5);

  const toggleMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: !msg.read } : msg))
    );
  };

  const getMessageTypeColor = (type: Message["type"]) => {
    switch (type) {
      case "instructor":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "system":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "peer":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      {/* Messages Button */}
      <div
        className="relative"
        onMouseEnter={() => onHoverPreview && setShowPreview(true)}
        onMouseLeave={() => onHoverPreview && setShowPreview(false)}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent transition-colors relative"
        >
          <Bell className="w-4 h-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full border-2 border-card flex items-center justify-center text-[10px] text-primary-foreground font-medium">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Hover Preview */}
        {showPreview && unreadCount > 0 && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
            <div className="p-3 border-b border-border">
              <h3 className="text-sm text-foreground">
                {unreadCount} {unreadCount === 1 ? t.unreadMessages : t.unreadMessagesPlural}
              </h3>
            </div>
            <ScrollArea className="max-h-96">
              <div className="p-2 space-y-2">
                {recentMessages
                  .filter((m) => !m.read)
                  .map((message) => (
                    <div
                      key={message.id}
                      className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => {
                        setShowPreview(false);
                        setIsOpen(true);
                      }}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground font-medium truncate">
                            {message.sender}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {message.subject}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 pl-6">
                        {message.preview}
                      </p>
                    </div>
                  ))}
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-border">
              <button
                onClick={() => {
                  setShowPreview(false);
                  setIsOpen(true);
                }}
                className="w-full text-sm text-primary hover:underline"
              >
                {t.showMore}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full Messages Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{t.messages}</span>
              {unreadCount > 0 && (
                <Badge variant="default">
                  {unreadCount} {unreadCount === 1 ? t.unreadMessages : t.unreadMessagesPlural}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {t.noMessages}
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`border border-border rounded-lg p-4 ${
                      !message.read ? "bg-accent/50" : "bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${getMessageTypeColor(
                            message.type
                          )}`}
                        >
                          {message.read ? (
                            <MailOpen className="w-5 h-5" />
                          ) : (
                            <Mail className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm text-foreground font-medium">
                              {message.sender}
                            </h4>
                            <Badge
                              variant="outline"
                              className={getMessageTypeColor(message.type)}
                            >
                              {message.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground mb-1">
                            {message.subject}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(message.date), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMessageRead(message.id)}
                      >
                        {message.read ? t.markAsUnread : t.markAsRead}
                      </Button>
                    </div>
                    <div className="pl-13">
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

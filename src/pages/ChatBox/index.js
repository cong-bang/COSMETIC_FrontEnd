import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ChatBox.module.scss";
import TypingIndicator from "./TypingIndicator";
import ProductCard from "./ProductCard ";
import avatar_user from "../../assets/images/avatar/avatar.jpg";
import chatbot from "images/avatar/chatbot.png";
import { sendToChatbot } from "services/chatBotService";
import BrandCard from "./BrandCard";

const ChatBox = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const token = useSelector((state) => state.user.user?.token);

  const formatTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.flatMap((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={`link-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#e48bb2", textDecoration: "underline" }}
          >
            {part}
          </a>
        );
      } else {
        const lines = part.split(/\r?\n/);
        return lines.flatMap((line, i) => [
          <span key={`text-${index}-${i}`}>{line}</span>,
          i < lines.length - 1 ? <br key={`br-${index}-${i}`} /> : null,
        ]);
      }
    });
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() !== "") {
      const userMessage = chatInput.trim();
      setChatMessages((prev) => [
        ...prev,
        { type: "user", text: userMessage },
        { type: "loading" },
      ]);
      setChatInput("");

      const result = await callSqlApi(userMessage);

      setChatMessages((prev) => {
        const updated = prev.filter((msg) => msg.type !== "loading");

        if (result.data) {
          const dataArray = Array.isArray(result.data)
            ? result.data
            : [result.data];

          if (
            dataArray.length === 0 ||
            (dataArray.length === 1 && Object.keys(dataArray[0]).length === 0)
          ) {
            updated.push({
              type: "bot",
              text: "Cửa hàng hiện tại không có sản phẩm đó hoặc đã hết hàng.",
            });
          } else {
            updated.push({
              type: "bot",
              data: dataArray,
            });
          }
        } else if (result.text) {
          updated.push({ type: "bot", text: result.text });
        } else if (result.message) {
          updated.push({ type: "bot", text: result.message });
        } else {
          updated.push({ type: "bot", text: "Lỗi không xác định." });
        }

        return updated;
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const isBrandData = (item) => {
    return (
      item?.Logo &&
      item?.Country &&
      item?.Description &&
      item?.Name &&
      !item?.Price &&
      !item?.Quantity &&
      !item?.Guide &&
      !item?.Capacity &&
      !item?.ExpiredDate
    );
  };

  const callSqlApi = async (sqlText) => {
    return await sendToChatbot(sqlText, token);
  };

  return (
    <>
      <div
        className={styles.chatbox_button}
        onClick={() => {
          const chat = document.getElementById("custom-chatbox");
          chat.style.display = chat.style.display === "flex" ? "none" : "flex";
        }}
      >
        <img src={chatbot} alt="chatbot" />
      </div>

      <div className={styles.chatbox_container} id="custom-chatbox">
        <div className={styles.chatbox_header}>Hỗ trợ khách hàng</div>

        <div className={styles.chatbox_content}>
          <p>
            Xin mừng bạn đến với puré cosmetic! Chúng tôi có thể giúp gì cho
            bạn?
          </p>

          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.chatbox_message} ${
                msg.type === "user" ? styles.user_message : styles.bot_message
              }`}
            >
              {msg.type !== "user" && (
                <img className={styles.avatar} src={chatbot} alt="avatar" />
              )}
              <div className={styles.message_text}>
                {msg.type === "loading" ? (
                  <TypingIndicator />
                ) : msg.data ? (
                  msg.data.map((item, idx) =>
                    isBrandData(item) ? (
                      <BrandCard key={idx} brand={item} />
                    ) : (
                      <ProductCard key={idx} product={item} />
                    )
                  )
                ) : (
                  formatTextWithLinks(msg.text)
                )}
              </div>
              {msg.type === "user" && (
                <img className={styles.avatar} src={avatar_user} alt="avatar" />
              )}
            </div>
          ))}
        </div>

        <div className={styles.chatbox_input}>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage}>Gửi</button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;

# 💬 WA-Tools: Quick WhatsApp Direct Sender

**WA-Tools** is a simple, web-based utility designed to instantly open a WhatsApp chat with any phone number, even if you haven't saved the contact. It leverages the official WhatsApp click-to-chat API to provide a seamless messaging experience.

## ✨ Features

* **Direct Chat:** Send messages without the hassle of saving a contact first.
* **Country Code Selector:** Easily select the recipient's country code to ensure the number is formatted correctly.
* **Pre-filled Message:** Compose your message directly in the tool, and it will automatically appear in the WhatsApp chat window.
* **Quick Actions:** Options to initiate a **Call** or generate a **Shareable Link** for the composed message.
* **Custom Prefix Option:** Flexibility to include a custom dialing prefix if needed.

---

## 🚀 How to Use It

The application is hosted on GitHub Pages and is ready to use immediately.

1.  **Select Country:** Choose the country of the recipient from the dropdown menu. This automatically fills the correct country code.
2.  **Enter Mobile Number:** Input the recipient's mobile number into the **Mobile Number** field. **Do not** include the country code here, as that is handled by step 1.
3.  **Compose Message:** Write your desired message in the **WA Message** text area.
    * *Optional:* Check the **"With Hi"** box to automatically start your message with a greeting.
4.  **Send:** Click the **"Message"** button. This will redirect you to WhatsApp Web or the WhatsApp application on your device, opening a chat with the entered number and pre-filled with your message.

### 🔗 Generating a Direct Link

To get a link you can copy and share:

* After filling out the number and message, click the **"Link"** button. The complete `wa.me/` link will be generated and displayed for you to copy.

---

## 🛠️ Technology Used

This tool primarily uses **HTML, CSS, and JavaScript** to construct the correct WhatsApp API link format:

`https://wa.me/<country-code><mobile-number>?text=<URL-encoded-message>`

All processing is done **client-side** (in your browser), ensuring your phone number and message data are never stored on a server.

---

/* Add import for useEffect at top */
import { useState, useCallback, useEffect } from "react";
/* ... existing imports ... */
import emailjs from "@emailjs/browser";

/* ... inside component (or top-level in the module, but keep inside useEffect for client only) */
useEffect(() => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    // Initialize the EmailJS SDK with your public key
    emailjs.init(publicKey);
  } else {
    // Optional: console.warn to help debugging when env is missing
    // eslint-disable-next-line no-console
    console.warn("VITE_EMAILJS_PUBLIC_KEY is not set. EmailJS will not be initialized.");
  }
}, []);

/* ... inside onSubmit before calling emailjs.send ... */
try {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = EMAILJS_TEMPLATE_ID; // already defined in file

  if (!publicKey || !serviceId || !templateId) {
    throw new Error("Email service is not configured properly.");
  }

  const templateParams = {
    from_name: data.name,
    reply_to: data.email,
    subject: data.subject,
    message: data.message,
    // add any other variables your template expects
  };

  // Option A: If you've called emailjs.init(publicKey), you can call send without publicKey:
  await emailjs.send(serviceId, templateId, templateParams);

  // Option B (explicit): Pass publicKey as the 4th argument to send (works without init):
  // await emailjs.send(serviceId, templateId, templateParams, publicKey);

  // handle success...
} catch (err) {
  // handle error...
}

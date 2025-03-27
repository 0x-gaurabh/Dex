import ClientWrapper from "./ClientWrapper";
import "./globals.css";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import Web3ModalProvider from "@/context";

export default async function Main({ children }) {
  const initialState = getInitialState();
  return (
    <html lang="en">
      <body>
      <Web3ModalProvider initialState={initialState}>
        
        
          <ClientWrapper />

          
        {children}

      </Web3ModalProvider>
      </body>
    </html>
  );
}
async function getInitialState() {
  const headersData = headers(); // Get the headers (async)
  const cookie = headersData.get("cookie"); // Get the cookie value
  return cookieToInitialState(config, cookie); // Process and return initial state
}
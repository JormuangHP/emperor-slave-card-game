import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "皇帝与奴隶 - 卡牌对战游戏",
  description: "一个基于皇帝与奴隶规则的卡牌对战游戏，与NPC进行对战，赢取筹码！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  );
}

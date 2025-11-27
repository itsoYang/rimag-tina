import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";
import Navbar from "@/components/common/Navbar";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "医学影像标准化平台",
  description: "医学影像检查项目名称及编码标准官网",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={cn(fontSans.variable, nunito.variable, lato.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <VideoDialogProvider>
          <Navbar />
          <main>{children}</main>
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}

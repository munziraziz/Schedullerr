import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-event";



export const metadata = {
  title: "Scheuduler",
  description: "Meeting scheduler app",
};


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
        >
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">{children}</main>

          <footer className="bg-blue-100 text-center py-10 text-sm text-gray-500">
            © 2026 Scheduler App. All rights reserved.
          </footer>
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}

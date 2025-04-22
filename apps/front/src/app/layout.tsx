import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "./providers";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Blog system",
  description: "Create a post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          <Providers>
            <div className="border-b-4 border-primary bg-foreground text-primary w-full fixed top-0 left-0 z-50">
              <Navbar />
            </div>

            {children}

            <Toaster
            // toastOptions={{
            //   classNames: {
            //     toast: "bg-white text-black border border-gray-200 shadow-md",
            //     description: "text-gray-600",
            //     actionButton: "bg-blue-500 text-white",
            //     cancelButton: "bg-gray-100 text-gray-800",
            //   },
            // }}
            />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

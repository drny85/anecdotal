import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Students Notes",
  description: "Anecdotal Notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme
          appearance="light"
          accentColor="pink"
          grayColor="slate"
          radius="large"
        >
          <main className="max-w-xl mx-auto p-4">
            <AuthProvider>
              <Container>
                <Toaster />
                {children}
              </Container>
            </AuthProvider>
          </main>
        </Theme>
      </body>
    </html>
  );
}

import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import CandyNav from "@/components/CandyNav";
import ClientLayout from "@/components/ClientLayout";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Nicole Fong — Developer Portfolio",
  description: "Full-stack developer. Dark mode candy aesthetic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-charcoal text-white min-h-screen">
        <CandyNav />
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}

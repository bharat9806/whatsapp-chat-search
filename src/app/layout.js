import "./globals.css"; // Ensure global styles are included

export const metadata = {
  title: "Chat Search App",
  description: "Easily search your chat history from WhatsApp, Instagram, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white py-4 text-center">
          <h1 className="text-2xl font-bold">Chat Search App</h1>
        </header>

        <main className="container mx-auto p-6">{children}</main>

        <footer className="text-center p-4 bg-gray-100">
          <p>© {new Date().getFullYear()} Chat Search App</p>
        </footer>
      </body>
    </html>
  );
}

import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ background: "#f8f8f8", minHeight: "100vh" }}>
        {children}
      </main>
    </>
  );
}

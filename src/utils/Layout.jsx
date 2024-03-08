import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="" style={{ textAlign: "center", height: "100vh " }}>
      <div className="main">
        <div className="background" />
      </div>
      <main className="body_content">{children}</main>
    </div>
  );
};

export default Layout;

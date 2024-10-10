import { FC, ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-vh-100">
            <Navbar />
            <div className="bg-light" style={{ padding: "20px 100px" }}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
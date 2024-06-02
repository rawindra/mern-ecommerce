import { FC, ReactNode } from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container">
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
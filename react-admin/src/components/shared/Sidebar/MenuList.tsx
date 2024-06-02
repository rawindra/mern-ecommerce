import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AdbIcon from "@mui/icons-material/Adb";

import { Dashboard } from "../../../pages/Dashboard";
import { CategoryList } from "../../../pages/Category";
import { ProductList } from "../../../pages/Product";
import { AttributeList } from "../../../pages/Attribute";
import { AttributeOptionList } from "../../../pages/AttributeOption";

interface MenuListProps {
  open: boolean;
}

const MenuList: FC<MenuListProps> = ({ open }) => {
  const menuItems = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/admin/dashboard",
        component: <Dashboard />,
      },
      {
        title: "Category",
        icon: <CategoryIcon />,
        link: "/admin/categories",
        component: <CategoryList />,
      },
      {
        title: "Product",
        icon: <AdbIcon />,
        link: "/admin/products",
        component: <ProductList />,
      },
      {
        title: "Attribute",
        icon: <AcUnitIcon />,
        link: "/admin/attributes",
        component: <AttributeList />,
      },
      {
        title: "Attribute Option",
        icon: <ColorLensIcon />,
        link: "/admin/attribute-options",
        component: <AttributeOptionList />,
      },
    ],
    []
  );

  const navigate = useNavigate();

  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem key={index} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => navigate(item.link)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;

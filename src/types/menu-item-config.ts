import {NavbarItem} from "@/types/navbar-item";

export type MenuItemConfig = {
    item: NavbarItem;
    onClick?: () => void;
    mobile?: boolean;
    subitem?: boolean;
};
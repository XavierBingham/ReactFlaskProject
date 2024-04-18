//Imports
import { Divider, Fade } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//Types
type props = {
    open:boolean,
    onClose:()=>void,
    anchorEl:any,
}

//Component
export default function ManageDropdown({open, onClose, anchorEl}:props) {

    //Component
    return (
        <Menu
            open={true}
            TransitionComponent={Fade}
            onClose={onClose}
            anchorEl={anchorEl}
            transformOrigin={{horizontal:"right", vertical:"top"}}
            anchorOrigin={{horizontal:"right", vertical:"bottom"}}
        >
            <MenuItem>
                Test
            </MenuItem>
        </Menu>
    );

}
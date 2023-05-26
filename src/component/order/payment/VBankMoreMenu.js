import {
    ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Stack, IconButton, ListItemIcon, Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useEffect, useRef, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {blue, pink} from "@mui/material/colors";

export default function VBankMoreMenu(props) {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const editVBank = (e) => {
        props.handelEditMode(props.vBankId)
        handleClose(e)
    }

    const deleteVBank = () => {
    }

    return (
        <Stack direction="row" spacing={2}>
            <div>
                <IconButton
                    ref={anchorRef}
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    sx={{
                        color: blue[500]
                    }}
                >
                    <MoreVertIcon />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    sx={{
                        zIndex: 1000
                    }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem>
                                            <ListItemIcon>
                                                <EditIcon fontSize="small"
                                                sx={{
                                                    color: blue[500]
                                                }}
                                                />
                                            </ListItemIcon>
                                            <Typography variant="inherit" onClick={editVBank}>수정하기</Typography>
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <DeleteIcon fontSize="small"
                                                sx={{
                                                    color: pink[500]
                                                }}
                                                />
                                            </ListItemIcon>
                                            <Typography variant="inherit" onClick={deleteVBank}>삭제하기</Typography>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
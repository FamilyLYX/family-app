import { useState } from "react";
import { Button } from "..";
import { Popover as MuiPopover, Typography } from "@mui/material";

export function Popover({ ButtonText, PopoverContent }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        {ButtonText}
      </Button>
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        classes={{ root: "mt-2" }}
      >
        <div className="p-4 ">{PopoverContent}</div>
      </MuiPopover>
    </div>
  );
}

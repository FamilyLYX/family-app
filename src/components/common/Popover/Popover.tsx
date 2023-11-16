import React, { useState } from "react";
import { Button } from "..";
import { Popover as MuiPopover, Typography } from "@mui/material";

interface PopoverProps {
  ButtonText: string;
  PopoverContent: React.ReactNode;
}

export function Popover({ ButtonText, PopoverContent }: PopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <div className="p-4">{PopoverContent}</div>
      </MuiPopover>
    </div>
  );
}

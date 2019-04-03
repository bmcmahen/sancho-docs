/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton, Sheet, useTheme } from "sancho";
import { ComponentList } from "./ComponentList";

interface SideMenuProps {}

export function SideMenu({  }: SideMenuProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <IconButton
        label="Show menu"
        icon="menu"
        variant="ghost"
        color={theme.colors.text.muted}
        size="lg"
        onClick={() => setIsOpen(true)}
        css={{
          // marginLeft: "-" + theme.spaces.sm,
          // marginRight: theme.spaces.sm,
          [theme.breakpoints.md]: {
            marginLeft: 0
          },
          [theme.breakpoints.lg]: {
            display: "none"
          }
        }}
      />
      <Sheet
        position="left"
        isOpen={isOpen}
        css={{
          [theme.breakpoints.lg]: {
            display: "none"
          }
        }}
        onRequestClose={() => setIsOpen(false)}
      >
        <ComponentList />
      </Sheet>
    </React.Fragment>
  );
}

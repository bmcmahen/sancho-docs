/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton, Sheet, useTheme, IconMenu } from "sancho";
import { ComponentList } from "./ComponentList";

interface SideMenuProps {}

export function SideMenu({  }: SideMenuProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <IconButton
        label="Show menu"
        icon={<IconMenu />}
        variant="ghost"
        color={theme.colors.text.muted}
        onClick={() => setIsOpen(true)}
        css={{
          // marginLeft: "-" + theme.spaces.sm,
          // marginRight: theme.spaces.sm,
          [theme.mediaQueries.md]: {
            marginLeft: 0
          },
          [theme.mediaQueries.lg]: {
            display: "none"
          }
        }}
      />
      <Sheet
        position="left"
        isOpen={isOpen}
        css={{
          [theme.mediaQueries.lg]: {
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

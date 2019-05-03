/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconButton, Sheet, useTheme, IconMenu } from "sancho";
import { SetNavOpenContext } from "./Layout";

interface SideMenuProps {}

export function SideMenu({  }: SideMenuProps) {
  const theme = useTheme();
  const { openNav } = React.useContext(SetNavOpenContext);

  function setIsOpen() {
    if (openNav) {
      openNav();
    }
  }

  return (
    <IconButton
      label="Show menu"
      icon={<IconMenu />}
      variant="ghost"
      color={theme.colors.text.muted}
      onPress={setIsOpen}
      css={{
        [theme.mediaQueries.md]: {
          marginLeft: 0
        },
        [theme.mediaQueries.lg]: {
          display: "none"
        }
      }}
    />
  );
}

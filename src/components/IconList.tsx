/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconNames, Icon, Text, useTheme } from "sancho";

const keys = Object.keys(IconNames).map(key => IconNames[key]);

interface IconListProps {}

export function IconList({  }: IconListProps) {
  const theme = useTheme();
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginLeft: "-0.5rem",
        marginRight: "-0.5rem"
      }}
    >
      {keys.map(key => {
        return (
          <div
            css={{
              display: "inline-flex",
              flex: "1 1 50%",
              maxWidth: "50%",
              [theme.breakpoints.md]: {
                flex: "1 1 33.33333%",
                maxWidth: "33.33333%"
              },
              boxSizing: "border-box",
              alignItems: "center"
            }}
            key={key}
          >
            <div
              css={{
                background: theme.colors.background.tint1,
                borderRadius: theme.radii.sm,
                display: "flex",
                alignItems: "center",
                padding: theme.spaces.md,
                margin: theme.spaces.sm,
                flex: "1",
                minWidth: 0
              }}
            >
              <Icon css={{ margin: theme.spaces.sm }} icon={key} />

              <Text
                wrap={false}
                css={{
                  fontSize: theme.sizes[0],
                  marginLeft: theme.spaces.md
                }}
              >
                {key}
              </Text>
            </div>
          </div>
        );
      })}
    </div>
  );
}

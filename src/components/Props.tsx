/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import table from "../pages/components/props.json";
import { Text, Divider, useTheme } from "sancho";
import { anchorPadding } from "./ExamplePreview.jsx";

// pretty lame
function getKey(name: string) {
  return `${name}.tsx`;
}

interface PropsProps {
  names: string[];
  exclude: string[];
}

export function Props({ names, exclude = [] }: PropsProps) {
  const theme = useTheme();
  const dark = theme.colors.mode === "dark";
  return (
    <div>
      <div
        id="props"
        css={[
          {
            marginBottom: theme.spaces.xl
          },
          anchorPadding
        ]}
      >
        <Text
          css={{ marginBottom: theme.spaces.md, marginTop: theme.spaces.lg }}
          variant="h2"
        >
          Props
        </Text>
        {names.map(name => {
          const entries = table[getKey(name)];
          if (entries) {
            return entries.map(entry => {
              const { props } = entry;

              if (!props) {
                return null;
              }

              if (exclude.indexOf(entry.displayName) > -1) {
                return null;
              }

              return (
                <div
                  css={{ marginBottom: theme.spaces.lg }}
                  key={entry.displayName}
                >
                  <Divider muted />
                  <div>
                    <Text variant="h5">{entry.displayName}</Text>
                  </div>

                  {Object.keys(props).map(key => {
                    const row = props[key];
                    if (!row.type) {
                      return null;
                    }
                    const type = row.type.name;
                    const val = row.type.value;
                    const { required, description } = row;
                    return (
                      <div
                        css={{ display: "block", marginBottom: "1rem" }}
                        key={key + name}
                      >
                        <div css={{ flex: "0 0 200px" }}>
                          <Text
                            css={{
                              padding: "3px",
                              borderRadius: theme.radii.sm,
                              background: dark
                                ? theme.colors.palette.blue.dark
                                : theme.colors.palette.blue.lightest,
                              fontWeight: 500,
                              fontSize: theme.fontSizes[0],
                              marginRight: theme.spaces.sm
                            }}
                          >
                            {key}
                            {required ? "*" : ""}
                          </Text>
                          <Text
                            css={{
                              fontSize: theme.fontSizes[0],
                              background: theme.colors.background.tint1,
                              padding: "3px",
                              borderRadius: theme.radii.sm
                            }}
                          >
                            {type}

                            {type === "enum" ? " " + getEnumString(val) : ""}
                          </Text>
                          {row.defaultValue && (
                            <Text
                              css={{
                                fontSize: theme.fontSizes[0],

                                padding: "3px",
                                borderRadius: theme.radii.sm
                              }}
                            >
                              {" "}
                              ={" "}
                            </Text>
                          )}
                          {row.defaultValue && (
                            <Text
                              css={{
                                fontSize: theme.fontSizes[0],
                                background: theme.colors.background.tint1,
                                padding: "3px",
                                borderRadius: theme.radii.sm
                              }}
                            >
                              {row.defaultValue.value}
                            </Text>
                          )}
                        </div>
                        <div>
                          <Text
                            css={{
                              fontSize: theme.fontSizes[0]
                            }}
                            muted
                          >
                            {description}
                          </Text>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            });
          }

          return null;
        })}
      </div>
    </div>
  );
}

function getEnumString(val: any) {
  return val.map(option => option.value).join(" | ");
}

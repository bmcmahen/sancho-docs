/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import {
  SkipNavLink,
  SkipNavContent,
  useResponsiveBodyPadding,
  ThemeProvider,
  useTheme,
  DarkMode,
  Theme,
  LightMode
} from "sancho";
import { ComponentList } from "./ComponentList";
import { SpyList } from "./SpyList";

const Layout = ({ children }) => {
  const theme = useTheme();
  const dark = true;
  const Mode = dark ? DarkMode : LightMode;

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <ThemeProvider>
          <Mode>
            {(theme: Theme) => (
              <React.Fragment>
                <Global
                  styles={{
                    html: {
                      fontFamily: "sans-serif",
                      textSizeAdjust: "100%",
                      backgroundColor:
                        theme.colors.mode === "dark"
                          ? theme.colors.palette.gray.dark
                          : theme.colors.background.default
                    },
                    body: {
                      margin: 0,
                      WebkitFontSmoothing: "antialiased"
                    }
                  }}
                />
                <SkipNavLink />

                <div
                  className={theme.colors.mode === "dark" ? "dark" : "light"}
                  css={[
                    {
                      justifyContent: "space-between",
                      padding: 0,
                      display: "flex"
                    }
                  ]}
                >
                  <div
                    css={{
                      display: "none",
                      position: "sticky",
                      top: "0",
                      height: "100vh",
                      [theme.breakpoints.lg]: {
                        display: "block"
                      }
                    }}
                  >
                    <ComponentList />
                  </div>
                  <Main>{children}</Main>
                </div>
              </React.Fragment>
            )}
          </Mode>
        </ThemeProvider>
      )}
    />
  );
};

const Main = ({ children }) => {
  const responsiveBodyPadding = useResponsiveBodyPadding();

  return (
    <main
      css={[
        {
          flex: 1,
          minWidth: 0
        },
        responsiveBodyPadding
      ]}
    >
      {children}
    </main>
  );
};

export default Layout;

interface ArticleProps {
  sidebar?: any;
  children?: React.ReactNode;
}

export const Article = ({ children, sidebar }: ArticleProps) => {
  const theme = useTheme();
  return (
    <div
      className="Article"
      css={{
        display: "flex",
        "& ul": {
          color: theme.colors.mode === "dark" ? "white" : undefined
        }
      }}
    >
      <SkipNavContent />
      <div
        css={{
          flex: 1,
          minWidth: 0,
          padding: `${theme.spaces.md} 0`,

          [theme.breakpoints.md]: {
            padding: `${theme.spaces.md} 0.75rem`
          },
          [theme.breakpoints.lg]: {
            padding: `${theme.spaces.lg} 0.75rem`
          }
        }}
      >
        {children}
      </div>
      {sidebar && (
        <div
          css={{
            display: "none",
            [theme.breakpoints.xl]: {
              display: "block"
            }
          }}
        >
          <SpyList items={sidebar} />
        </div>
      )}
    </div>
  );
};

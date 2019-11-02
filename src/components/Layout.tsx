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
  LightMode,
  Sheet
} from "sancho";
import { ComponentList } from "./ComponentList";
import { SpyList } from "./SpyList";
import useMedia from "use-media";

export const ToggleModeContext = React.createContext(null);

export const SetNavOpenContext = React.createContext(null);

const Layout = ({ children }) => {
  const [dark, setDark] = React.useState(false);
  const theme = useTheme();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const isLarge = useMedia({
    minWidth: theme.breakpoints.lg
  });
  const Mode = dark ? DarkMode : LightMode;

  function toggleMode() {
    setDark(!dark);
  }

  function closeNav() {
    setIsNavOpen(false);
  }

  function openNav() {
    setIsNavOpen(true);
  }

  return (
    <ThemeProvider>
      <ToggleModeContext.Provider value={toggleMode}>
        <Mode>
          {(theme: Theme) => (
            <React.Fragment>
              <Global
                styles={{
                  html: {
                    fontFamily: "sans-serif",
                    textSizeAdjust: "100%",
                    backgroundColor: theme.colors.background.default
                  },
                  body: {
                    margin: 0,
                    WebkitFontSmoothing: "antialiased"
                  },
                  "body *": {
                    WebkitTapHighlightColor: "transparent"
                  }
                }}
              />
              <SkipNavLink />
              {!isLarge && (
                <Sheet
                  position="left"
                  isOpen={isNavOpen}
                  onRequestClose={closeNav}
                >
                  <ComponentList background={"white"} />
                </Sheet>
              )}
              <div
                className={theme.colors.mode === "dark" ? "dark" : "light"}
                css={[
                  {
                    justifyContent: "space-between",
                    padding: 0,
                    display: "flex",
                    [theme.mediaQueries.lg]: {
                      position: "fixed"
                    }
                  }
                ]}
              >
                <div
                  css={{
                    display: "none",

                    height: "100vh",
                    [theme.mediaQueries.lg]: {
                      display: "block",
                      zIndex: 10,
                      position: "fixed"
                    }
                  }}
                >
                  <ComponentList />
                </div>
              </div>
              <div>
                <SetNavOpenContext.Provider
                  value={{
                    closeNav,
                    openNav
                  }}
                >
                  <Main>{children}</Main>
                </SetNavOpenContext.Provider>
              </div>
            </React.Fragment>
          )}
        </Mode>
      </ToggleModeContext.Provider>
    </ThemeProvider>
  );
};

const Main = ({ children }) => {
  const theme = useTheme();
  const responsiveBodyPadding = useResponsiveBodyPadding();

  return (
    <main
      css={[
        {
          flex: 1,
          minWidth: 0,
          [theme.mediaQueries.lg]: {
            paddingLeft: "224px"
          }
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

          [theme.mediaQueries.md]: {
            padding: `${theme.spaces.md} 0.75rem`
          },
          [theme.mediaQueries.lg]: {
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
            [theme.mediaQueries.xl]: {
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

/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Article } from "../components/Layout";
import {
  Text,
  Container,
  Button,
  Divider,
  Link,
  useTheme,
  IconArrowRight
} from "sancho";
import { ComponentMDXProvider } from "./ExamplePreview";
import { Nav } from "./Nav";
import background from "./background.svg";
import backgroundLight from "./background-light.svg";

export const Hero = ({ children }) => {
  const theme = useTheme();
  const dark = theme.colors.mode === "dark";
  return (
    <React.Fragment>
      <Nav />
      <div
        css={{
          backgroundImage: `url(${dark ? background : backgroundLight})`,
          padding: `${theme.spaces.lg} 0`,
          borderBottom: `1px solid ${theme.colors.border.muted}`
        }}
      >
        <Container>
          <div
            css={{
              textAlign: "center",
              padding: `${theme.spaces.lg} 0`,

              [theme.breakpoints.md]: {
                textAlign: "left",
                padding: `${theme.spaces.lg} 0.75rem`
              }
            }}
          >
            <Text
              css={{
                color:
                  theme.colors.mode === "dark"
                    ? theme.colors.palette.blue.light
                    : theme.colors.palette.blue.base
              }}
              variant="display2"
            >
              Sancho UI
            </Text>
            <Text
              muted
              css={{
                maxWidth: "38rem",
                margin: "0 auto",

                marginBottom: theme.spaces.lg,
                [theme.breakpoints.md]: {
                  marginLeft: 0
                }
              }}
              variant="lead"
            >
              Sancho is a responsive and accessible design system built with
              React, Typescript and Emotion. Named after the ever-faithful,
              hilariously acerbic sidekick of Don Quixote, Sancho is designed to
              help you no matter how quixotic your dreams may be.
            </Text>
            <Button
              intent="primary"
              component="a"
              size="lg"
              iconAfter={<IconArrowRight />}
              href="http://github.com/bmcmahen/sancho"
            >
              View on Github
            </Button>
          </div>
        </Container>
      </div>
      <Container>
        <Article
          sidebar={[
            { id: "Sancho", name: "Sancho" },
            { id: "Getting started", name: "Getting started", parent: true },
            { id: "Installation", name: "Installation" },
            { id: "Styling and Emotion", name: "Styling with emotion" },
            { id: "Theme", name: "Using a theme" },
            { id: "Example projects", name: "Example projects" },
            { id: "Prior art", name: "Prior art", parent: true },
            { id: "About", name: "About", parent: true }
          ]}
        >
          <ComponentMDXProvider>{children}</ComponentMDXProvider>
          <Divider muted />
          <Text
            muted
            css={{
              display: "block",
              paddingBottom: theme.spaces.md,
              fontSize: theme.fontSizes[0]
            }}
          >
            <div>
              Icons made by{" "}
              <Link
                href="https://www.flaticon.com/authors/smashicons"
                title="Smashicons"
              >
                Smashicons
              </Link>{" "}
              from{" "}
              <Link href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </Link>{" "}
              is licensed by{" "}
              <Link
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
              >
                CC 3.0 BY
              </Link>
              .
            </div>
          </Text>
        </Article>
      </Container>
    </React.Fragment>
  );
};

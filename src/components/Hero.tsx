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

              [theme.mediaQueries.md]: {
                padding: `${theme.spaces.lg} 0.75rem`
              }
            }}
          >
            <img
              css={{
                width: "150px",
                height: "175.39px",
                marginBottom: theme.spaces.sm
              }}
              src={require("./sancho-logo.png")}
            />
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
                marginTop: theme.spaces.sm,
                marginBottom: theme.spaces.lg
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
              The Sancho donkey icon is originally based upon work by{" "}
              <Link href="https://www.how-to-draw-funny-cartoons.com/">
                Martin Berube
              </Link>{" "}
              and the{" "}
              <Link href="https://www.freepik.com/free-photos-vectors/summer">
                summer vector created by alicia_mb - www.freepik.com
              </Link>
            </div>
          </Text>
        </Article>
      </Container>
    </React.Fragment>
  );
};

/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Link, navigate } from "gatsby";
import {
  Text,
  MenuLabel,
  Link as StyleLink,
  Divider,
  RequestCloseContext,
  useTheme,
  IconButton,
  Tooltip,
  IconSun
} from "sancho";
import { ToggleModeContext } from "./Layout";
import { useTouchable } from "touchable-hook";

function noOp() {}

interface ComponentListProps {
  background?: string;
}

function MenuLink({ to, children }) {
  const closeParent = React.useContext(RequestCloseContext);
  const theme = useTheme();
  const padding = `${theme.spaces.xs} ${theme.spaces.lg}`;
  const dark = theme.colors.mode === "dark";

  const { bind, active, hover } = useTouchable({
    onPress: () => {
      navigate(to);
      closeParent();
    },
    behavior: "link"
  });

  return (
    <li
      css={{
        listStyle: "none",
        paddingLeft: 0,
        marginBottom: 0
      }}
    >
      <Link
        {...bind}
        data-trigger-close
        tabIndex={0}
        onClick={e => {
          e.preventDefault();
        }}
        getProps={options => {
          const activeStyle = {
            fontWeight: 500,
            background: dark
              ? theme.colors.background.tint1
              : theme.colors.background.tint2,
            color: theme.colors.text.default
          };

          if (options.isCurrent) {
            return {
              style: activeStyle
            };
          }

          if (options.location.hash && to.indexOf(options.location.hash) > -1) {
            return {
              style: activeStyle
            };
          }
          return {};
        }}
        activeStyle={{
          fontWeight: 500,
          background: dark
            ? theme.colors.background.tint1
            : theme.colors.background.tint2,
          color: theme.colors.text.default
        }}
        css={[
          {
            display: "block",
            padding,
            userSelect: "none",
            transition: "background-color 0.1s ease",
            textDecoration: "none",
            color: theme.colors.text.muted,
            WebkitTapHighlightColor: "transparent",
            ":focus": {
              outline: theme.outline
            },
            ":focus:not([data-focus-visible-added])": {
              outline: "none"
            }
          },
          hover && {
            background: dark
              ? theme.colors.background.tint1
              : theme.colors.background.tint2
          },
          active && {
            background: dark
              ? theme.colors.background.tint1
              : theme.colors.background.tint2
          }
        ]}
        to={to}
      >
        <Text
          css={{
            fontWeight: "inherit",
            color: "inherit",
            fontSize: theme.fontSizes[1],
            [theme.mediaQueries.lg]: {
              fontSize: theme.fontSizes[0]
            }
          }}
        >
          {children}
        </Text>
      </Link>
    </li>
  );
}

function Label({ children }) {
  const theme = useTheme();
  const padding = `${theme.spaces.xs} ${theme.spaces.lg}`;
  return <MenuLabel css={{ padding }}>{children}</MenuLabel>;
}

function ListGroup({ label, children }) {
  const theme = useTheme();
  return (
    <div css={{ margin: `${theme.spaces.md} 0` }}>
      <Label>{label}</Label>
      <ul css={{ padding: 0, margin: 0 }}>{children}</ul>
    </div>
  );
}

const about = [
  { title: "Installation", path: "/#installation" },
  { title: "Styling with emotion", path: "/#styling%20and%20emotion" },
  { title: "Using a theme", path: "/#theme" },
  { title: "Example projects", path: "/#example%20projects" }
];

const components = [
  { title: "Alert", path: "/components/alert/" },
  { title: "AlertDialog", path: "/components/alertdialog" },
  { title: "Avatar", path: "/components/avatar/" },
  { title: "Badge", path: "/components/badge/" },
  { title: "Breadcrumbs", path: "/components/breadcrumb/" },
  { title: "Button", path: "/components/button/" },
  { title: "Collapse", path: "/components/collapse/" },
  { title: "Container", path: "/components/container/" },
  { title: "Dialog", path: "/components/dialog/" },
  { title: "Divider", path: "/components/divider/" },
  { title: "Embed", path: "/components/embed/" },
  { title: "Forms", path: "/components/form/" },
  { title: "Pager", path: "/components/gesture-view/" },
  { title: "IconButton", path: "/components/icon-button/" },
  { title: "Icons", path: "/components/icon/" },
  { title: "Layer", path: "/components/layer/" },
  { title: "Link", path: "/components/link/" },
  { title: "List", path: "/components/list/" },
  { title: "Menu", path: "/components/menu/" },
  { title: "Navbar", path: "/components/navbar/" },
  { title: "Popover", path: "/components/popover/" },
  { title: "ScrollView", path: "/components/scrollview" },
  { title: "Sheet", path: "/components/sheet/" },
  { title: "Skeleton", path: "/components/skeleton" },
  { title: "Spinner", path: "/components/spinner/" },
  { title: "Stack", path: "/components/stack/" },
  { title: "Table", path: "/components/table/" },
  { title: "Tabs", path: "/components/tabs/" },
  { title: "Text", path: "/components/text/" },
  { title: "Toast", path: "/components/toast/" },
  { title: "Toolbar", path: "/components/toolbar/" },
  { title: "Tooltip", path: "/components/tooltip/" }
];

const helpers = [
  { title: "Overlay", path: "/components/overlay/" },
  { title: "Portal", path: "/components/portal/" },
  { title: "Positioner", path: "/components/positions/" },
  { title: "SkipNav", path: "/components/skipnav/" },
  { title: "Touchable", path: "/components/touchable/" },
  { title: "VisuallyHidden", path: "/components/visually-hidden/" }
];

export function ComponentList(props: ComponentListProps) {
  const theme = useTheme();
  const [search, setSearch] = React.useState("");
  const [componentList, setComponentList] = React.useState(components);
  const [aboutList, setAboutList] = React.useState(about);
  const closeParent = React.useContext(RequestCloseContext);
  const dark = theme.colors.mode === "dark";
  const toggle = React.useContext(ToggleModeContext);
  const bg = props.background;

  React.useEffect(() => {
    if (!search) {
      setComponentList(components);
      setAboutList(about);
    } else {
      setComponentList(
        components.filter(
          item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );

      setAboutList(
        about.filter(
          item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    }
  }, [search]);

  function toggleMode() {
    toggle();
  }

  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "14rem",
        background: dark
          ? theme.colors.background.layer
          : bg || theme.colors.background.tint1
      }}
    >
      <div
        css={{
          height: "64px",
          borderBottom: "1px solid",
          borderColor: theme.colors.border.muted,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: theme.spaces.lg,
          paddingRight: theme.spaces.md
        }}
      >
        <Link
          onClick={() => closeParent()}
          css={{
            textDecoration: "none",
            alignItems: "center",
            display: "flex"
          }}
          to="/"
        >
          <Text
            css={{
              ":focus": {
                outline: theme.outline
              },
              ":focus:not([data-focus-visible-added])": {
                outline: "none"
              },
              color: dark
                ? theme.colors.palette.blue.light
                : theme.colors.text.selected
            }}
            gutter={false}
            variant="h5"
          >
            Sancho UI
          </Text>
        </Link>
        <Tooltip content="Toggle dark mode">
          <IconButton
            onPress={toggleMode}
            label="Toggle dark mode"
            variant="ghost"
            icon={<IconSun />}
          />
        </Tooltip>
      </div>
      <div
        data-scroll-lock-scrollable
        css={{
          flex: 1,
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch"
        }}
      >
        <ListGroup
          css={{
            borderColor: theme.colors.border.muted
          }}
          label="Getting started"
        >
          {aboutList.map(entry => (
            <MenuLink to={entry.path} key={entry.path}>
              {entry.title}
            </MenuLink>
          ))}
        </ListGroup>
        <Divider muted />
        <ListGroup label="Components">
          {componentList.map(entry => (
            <MenuLink key={entry.path} to={entry.path}>
              {entry.title}
            </MenuLink>
          ))}
        </ListGroup>
        <Divider muted />
        <ListGroup
          css={{
            borderColor: theme.colors.border.muted
          }}
          label="Helpers"
        >
          {helpers.map(entry => (
            <MenuLink to={entry.path} key={entry.path}>
              {entry.title}
            </MenuLink>
          ))}
        </ListGroup>

        <Divider muted />
        <Text
          muted
          css={{
            display: "block",
            fontSize: theme.fontSizes[0],
            padding: `${theme.spaces.lg}`,
            paddingTop: 0
          }}
        >
          Built with ☕ by <br />
          <StyleLink href="http://benmcmahen.com">Ben McMahen</StyleLink>
        </Text>
      </div>
    </div>
  );
}

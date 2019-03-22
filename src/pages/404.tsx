import * as React from "react";
import SEO from "../components/SEO";
import { Text, theme, Link } from "sancho";

const NotFoundPage = () => (
  <div>
    <SEO title="404: Not found" />
    <Text css={{ display: "block", padding: theme.spaces.lg }}>
      We couldn't find this page. Why not check out the{" "}
      <Link href="/">homepage.</Link>
    </Text>
  </div>
);

export default NotFoundPage;

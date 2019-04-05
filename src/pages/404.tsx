import * as React from "react";
import SEO from "../components/SEO";
import { Text, Link } from "sancho";

const NotFoundPage = () => (
  <div>
    <SEO title="404: Not found" />
    <Text css={{ textAlign: "center", display: "block", padding: "1rem" }}>
      We couldn't find this page. Why not check out the{" "}
      <Link href="/">homepage.</Link>
    </Text>
  </div>
);

export default NotFoundPage;

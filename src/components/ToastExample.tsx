/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useToast } from "sancho";
import { Button } from "sancho";

export interface ToastExampleProps {}

export const ToastExample: React.FunctionComponent<
  ToastExampleProps
> = props => {
  const toast = useToast();

  function play() {
    ["top-left", "bottom-left"].map(position => {
      toast({
        title: "Hello world!",
        duration: 3000,
        position: position as any
      });
    });

    ["info", "success", "question", "danger", "warning"].map((intent, i) => {
      setTimeout(() => {
        toast({
          title: intent,
          intent: intent as any,
          position: "top-left"
        });
      }, (i + 1) * 500);
    });
  }

  return <Button onPress={play}>Trigger toast example</Button>;
};

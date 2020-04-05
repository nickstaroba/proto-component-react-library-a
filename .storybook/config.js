import { configure } from "@storybook/react";
import "./storybook.overrides.css";

configure(require.context("../src", true, /\.stories\.tsx?$/), module);

import { configure } from "@storybook/react";
import "../src/styles/global.scss";
import "./storybook.overrides.css";

configure(require.context("../src", true, /\.stories\.tsx?$/), module);

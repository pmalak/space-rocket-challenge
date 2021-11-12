import { Launch } from "./launch";
import { LaunchPad } from "./launchpad";

export type LaunchTuple = Launch | LaunchPad

export type FavoriteItems = {
  launch: Launch[],
  launchPad: LaunchPad[]
}

export enum ItemTypeEnum {
  Launch = "launch",
  LaunchPad = "launchPad"
}
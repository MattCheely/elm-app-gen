import { Elm } from "../Main.elm";
import * as ElmDebugger from "elm-debug-transformer";
ElmDebugger.register();

Elm.Main.init({
  node: document.getElementById("app")
});

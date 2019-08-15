import { Elm } from "../Main.elm";

if (process.env.NODE_ENV === 'development') {
  // Only runs in development and will be stripped from production build.
  // See https://parceljs.org/production.html

  const ElmDebugger = require("elm-debug-transformer");
  function hasFormatterSupport() {
    const originalFormatters = window.devtoolsFormatters;
    let supported = false;

    window.devtoolsFormatters = [
      {
        header: function(obj, config) {
          supported = true;
          return null;
        },
        hasBody: function(obj) {},
        body: function(obj, config) {},
      },
    ];
    console.log('elm-debug-transformer: checking for formatter support.', {});
    window.devtoolsFormatters = originalFormatters;
    return supported;
  }

  if (hasFormatterSupport()) {
    ElmDebugger.register();
  } else {
    ElmDebugger.register({simple_mode: true});
  }
}

Elm.Main.init({
  node: document.getElementById("app")
});

import quip from "quip";
import App from "./App.jsx";

class OGPRoot extends quip.apps.RootRecord {
  static getProperties() {
    return {
       url: "string"
    };
  }
}

quip.apps.registerClass(OGPRoot, "root");

quip.apps.initialize({
  initializationCallback: function(rootNode, params) {
    const rootRecord = quip.apps.getRootRecord();
    if (params.isCreation) {
      rootRecord.set("url", '');
    }
    ReactDOM.render(<App/>, rootNode);
  },
});

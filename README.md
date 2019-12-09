# URL Preview Quip Live App

A simple example to preview URL in your quip document

## Setup

### 1. Create a Live App

Go to [console](https://quip.com/dev/console) and click on "Create a Live App". Copy the App ID and replace the `"id"` field in `app/manifest.json`.

### 2. Add your OpenGraph.io API Key

- Get a OpenGraph.io API Key from [here](https://www.opengraph.io/)
- Place that Key in `OPENGRAPH_IO_API_KEY` variable in App.jsx

### 3. Add your Cloudimage Customer Token

- Get a Cloudimage Customer Token from [here](https://www.opengraph.io/)
- Place that Token in `CLOUDIMAGE_TOKEN` variable in App.jsx
- Place that Token in the `csp_sources.img_srcs` field in `app/manifest.json`

### 4. Build .ele bundle

```bash
npm run build
```

### 4. Update App

1. Go to [console](https://quip.com/dev/console)
2. Click on the app you just created
3. Click on "Upload Bundle" and select the bundle file `app/app.ele`
4. Click on "Upload"

### 5. That's it

## Example

![Example Usage](https://user-images.githubusercontent.com/877015/70464658-acba5a80-1b02-11ea-9843-35f372c351d9.gif "Example Usage")

## Thanks

* [quip-apps/examples/map](https://github.com/quip/quip-apps/tree/master/examples/map)
* [securecoders/opengraph-react](https://github.com/securecoders/opengraph-react)

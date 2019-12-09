import Styles from "./App.less";
import quip from "quip";

const OPENGRAPH_IO_API_KEY = "YOUR_OPENGRAPH_IO_API_KEY_HERE";
const CLOUDIMAGE_TOKEN = "YOUR_CLOUDIMAGE_TOKEN_HERE";

const INPUT_PLACEHOLDER = "URLを入力してください。";
const SUBMIT_BTN_TXT = "プレビュー取得";

const { getRootRecord } = quip.apps;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: getRootRecord().get('url')
    };
  }

  componentDidMount() {
    if (this.state.url) {
      this.fetchOGP();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url) {
      this.fetchOGP();
    }
  }

  handleSubmit = (e) => {
    const enteredUrl = this.refs["text"].value;
    if (enteredUrl.length > 0) {
      this.setState({
        url: enteredUrl
      });
      getRootRecord().set("url", enteredUrl);
    }
  }

  fetchOGP() {
    const encodedUrl = encodeURIComponent(this.state.url);
    const ogpUrl = `https://opengraph.io/api/1.1/site/${encodedUrl}?accept_lang=auto&app_id=${OPENGRAPH_IO_API_KEY}`;
    fetch(ogpUrl)
    .then((res) => res.json())
    .then((result) => {
      if(!result.error){
        this.setState({ogp:result});
      } else {
        console.error(result);
      }
    });
  }

  getResultsToUse = () => {
    let {openGraph} = this.state.ogp;
    // protect against null values
    openGraph = openGraph || {};

    const site_name = openGraph.site_name;
    const title = openGraph.title;
    const url = openGraph.url;
    const description = openGraph.description;

    let image;
    if(openGraph.image){
      image = openGraph.image.url;
      const imageWithoutHttp = image.replace(/https?:\/\//,'');
      image = `https://${CLOUDIMAGE_TOKEN}.cloudimg.io/height/160/n/${imageWithoutHttp}`
    }

    return {
      site_name,
      title,
      url,
      image,
      description
    };
  };

  render() {
    if (this.state.ogp) {
      let resultsToUse = this.getResultsToUse();
      return <div className={Styles.container}>
        <div className={Styles.outerWrapperSmall}>
          <div style={{flex: 1}} >
            <div className={Styles.imgWrapperSmall}>
              <img className={Styles.responsiveImage} src={resultsToUse.image} alt={'alt'}/>
            </div>
          </div>
          <div className={Styles.textWrapperSmall}>
            <div className={Styles.siteNameLinkWrapper}>
              <p>{resultsToUse.site_name}</p>
            </div>
            <div className={Styles.titleWrapper}>
              <a href={resultsToUse.url} target="_blank">{resultsToUse.title}</a>
            </div>
            <p>{resultsToUse.description}</p>
          </div>
        </div>
      </div>
    }
    return <div className={Styles.container}>
      <div className={Styles.inputContainer}>
        <input
          className={Styles.url}
          ref="text" type="text"
          placeholder={INPUT_PLACEHOLDER}>
        </input>
        <button
          className={Styles.submit}
          onClick={this.handleSubmit}>
          {SUBMIT_BTN_TXT}
        </button>
      </div>
    </div>;
  }
}

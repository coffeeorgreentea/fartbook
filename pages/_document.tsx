import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);

    return initalProps;
  }

  render() {
    return (
      <Html className="">
        <Head></Head>
        <body className="w-full h-screen overflow-hidden antialiased text-white transition-transform duration-500 ease-in-out radial background-animate from-bg-primary via-bg-secondary to-bg-tertiary">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// SSRでもstyled-componentsを動作させるためのファイル
import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // 初期値の流用
      const initialProps = await Document.getInitialProps(ctx);

      // initialPropsに加えて。styleを追加して返す
      return {
        ...initialProps,
        styles: [
          <>
            {/* 元々のstyles */}
            {initialProps.styles}

            {/* styles-components.tsのstyle */}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}

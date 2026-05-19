import { useTranslation } from "react-i18next";
import Head from "./Head";
import EnglishOnlyBanner from "./EnglishOnlyBanner";

interface Props {
  title: string;
  description: string;
  titleKey?: string;
  descriptionKey?: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: string;
}

/**
 * Head + banner for Tier-3 (English-only) routes: blog, lawyer directory,
 * state guides, statutes. Forces noindex on any non-English locale and shows
 * a dismissible notice explaining the content is only available in English.
 */
export default function Tier3Head(props: Props) {
  const { i18n } = useTranslation();
  const isNonEn = (i18n.language || "en").split("-")[0] !== "en";
  return (
    <>
      <Head {...props} noindex={props.noindex || isNonEn} />
      <EnglishOnlyBanner />
    </>
  );
}

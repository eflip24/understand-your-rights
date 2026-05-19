import { useTranslation } from "react-i18next";
import Head from "./Head";

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
 * Head variant for Tier-3 (English-only) routes: blog, lawyer directory,
 * state guides, statutes. Forces noindex on any non-English locale so we
 * don't pollute the index with thin/duplicate English content under /es/,
 * /fr/, etc.
 */
export default function Tier3Head(props: Props) {
  const { i18n } = useTranslation();
  const isNonEn = (i18n.language || "en").split("-")[0] !== "en";
  return <Head {...props} noindex={props.noindex || isNonEn} />;
}

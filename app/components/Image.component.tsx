import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";

type Props = ComponentPropsWithoutRef<"img"> & {
  optimizerUrl?: string;
  responsive?: {
    maxWidth?: number;
    size: { width: number; height?: number };
  }[];
};

export function Image({
  optimizerUrl = "/resources/image",
  responsive,
  src,
  ...props
}: Props) {
  let url = src ? optimizerUrl + "?src=" + encodeURIComponent(src) : src;

  let _props: ComponentPropsWithoutRef<"img"> = {
    src: url + `&width=${props.width || ""}&height=${props.height || ""}`,
  };

  let largestImageWidth = 0;
  let largestImageSrc: string | undefined;
  if (responsive && responsive.length) {
    let srcSet = "";
    let sizes = "";
    for (let { maxWidth, size } of responsive) {
      if (srcSet) {
        srcSet += ", ";
      }
      let srcSetUrl =
        url + `&width=${size.width}&height=${size.height || ""} ${size.width}w`;
      srcSet += srcSetUrl;

      if (maxWidth) {
        if (sizes) {
          sizes += ", ";
        }
        sizes += `(max-width: ${maxWidth}px) ${size.width}px`;
      }

      if (size.width > largestImageWidth) {
        largestImageWidth = size.width;
        largestImageSrc = srcSetUrl;
      }
    }
    _props.srcSet = srcSet;
    _props.sizes = sizes;
    _props.src = "";
  }

  if (
    largestImageSrc &&
    (!props.width || largestImageWidth > Number(props.width))
  ) {
    _props.src = largestImageSrc;
  }

  return <img {...props} {..._props} />;
}

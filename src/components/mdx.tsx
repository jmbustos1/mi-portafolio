import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMDXComponent } from "next-contentlayer2/hooks";

function CustomLink(props: { href: string; children: React.ReactNode }) {
  const { href, ...rest } = props;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: { alt: string; src: string }) {
  return <Image {...props} alt={props.alt} className="rounded-lg" />;
}

function Callout(props: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

type AnimatedFigureProps = {
  src: string;
  /** Imagen fija para quienes pidieron reducir el movimiento. */
  poster: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

function AnimatedFigure({ src, poster, alt, width, height, caption }: AnimatedFigureProps) {
  return (
    <figure>
      <picture>
        <source srcSet={poster} media="(prefers-reduced-motion: reduce)" />
        {/* next/image no admite <picture> con una fuente por media query. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full rounded-lg"
        />
      </picture>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const components = {
  AnimatedFigure,
  Image: RoundedImage,
  a: CustomLink,
  Callout,
};

export function Mdx({ code }: { code: string }) {
  const Content = getMDXComponent(code);

  return (
    <React.Fragment>
      {/* https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width */}
      <article className="prose prose-neutral dark:prose-invert prose-quoteless  max-w-none">
        <Content components={components} />
      </article>
    </React.Fragment>
  );
}

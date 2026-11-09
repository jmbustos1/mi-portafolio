import { LINKS } from "@/data/links";

export const metadata = {
  title: "Resume",
  robots: { index: false },
};

// Sin servidor no hay redirect 308: redirige por meta refresh y deja un enlace.
export default function Resume() {
  return (
    <section>
      <meta httpEquiv="refresh" content={`0;url=${LINKS.RESUME}`} />
      <a className="border-b" href={LINKS.RESUME}>
        View resume
      </a>
    </section>
  );
}

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function PublicShell({
  children,
  transparentHeader = false,
}: {
  children: React.ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <>
      <SiteHeader transparent={transparentHeader} />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
    </>
  );
}

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LeadCaptureProvider } from "@/components/site/LeadCapture";

export function PublicShell({
  children,
  transparentHeader = false,
}: {
  children: React.ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <LeadCaptureProvider>
      <SiteHeader transparent={transparentHeader} />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
    </LeadCaptureProvider>
  );
}

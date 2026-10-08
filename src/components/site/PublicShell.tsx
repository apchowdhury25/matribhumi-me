import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LeadCaptureProvider } from "@/components/site/LeadCapture";
import { MobileContactBar } from "@/components/site/MobileContactBar";

export function PublicShell({
  children,
  transparentHeader = false,
}: {
  children: React.ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <LeadCaptureProvider>
      <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <SiteHeader transparent={transparentHeader} />
        <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
        <SiteFooter />
      </div>
      <MobileContactBar />
    </LeadCaptureProvider>
  );
}

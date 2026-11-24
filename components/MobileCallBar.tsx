import { getTranslations } from "next-intl/server";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export async function MobileCallBar() {
  const t = await getTranslations("whatsapp");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a href={`tel:${site.phoneTel}`} className="inline-flex min-h-12 items-center justify-center gap-1.5 bg-navy px-2 py-3 text-center text-[13px] font-extrabold leading-tight text-white min-[400px]:gap-2 min-[400px]:text-sm">
        <PhoneIcon className="h-4 w-4 shrink-0 min-[400px]:h-5 min-[400px]:w-5" />
        {t("call")}
      </a>
      <a
        href={whatsappLink(t("hero"))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-1.5 bg-whatsapp px-2 py-3 text-center text-[13px] font-extrabold leading-tight text-white min-[400px]:gap-2 min-[400px]:text-sm"
      >
        <WhatsAppIcon className="h-4 w-4 shrink-0 min-[400px]:h-5 min-[400px]:w-5" />
        WhatsApp
      </a>
    </div>
  );
}

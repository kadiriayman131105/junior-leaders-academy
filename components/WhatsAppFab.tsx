import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/Icons";
import { whatsappLink } from "@/lib/whatsapp";

export async function WhatsAppFab() {
  const t = await getTranslations("whatsapp");

  return (
    <a
      href={whatsappLink(t("hero"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      className="fixed bottom-6 end-5 z-40 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-card hover:bg-[#0c6538] lg:grid xl:bottom-8 xl:end-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

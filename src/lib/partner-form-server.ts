import { getServiceClient } from "@/lib/supabase-server";
import { DEFAULT_PARTNER_FORM, sanitizeFormConfig, type PartnerFormConfig } from "@/lib/partner-form";

const SETTINGS_KEY = "partner_form";

/** The saved form, or the default one until an admin saves their own. */
export async function loadPartnerForm(): Promise<PartnerFormConfig> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return DEFAULT_PARTNER_FORM;
  const { data, error } = await getServiceClient()
    .from("site_settings")
    .select("value")
    .eq("key", SETTINGS_KEY)
    .maybeSingle();
  if (error || !data?.value) return DEFAULT_PARTNER_FORM;
  return sanitizeFormConfig(data.value);
}

export async function savePartnerForm(config: PartnerFormConfig) {
  const { error } = await getServiceClient()
    .from("site_settings")
    .upsert({ key: SETTINGS_KEY, value: config, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

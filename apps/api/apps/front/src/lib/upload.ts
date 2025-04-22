import { createClient } from "@supabase/supabase-js";

export async function uploadFile(image: File) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseApiKey = process.env.SUPABASE_API_KEY!;

  const supabase = createClient(supabaseUrl, supabaseApiKey);

  const data = await supabase.storage
    .from("thumbnail")
    .upload(`${image.name}_${Date.now()}`, image);

  if (!data.data?.path) throw new Error("faild to upload the file");
  const url = await supabase.storage
    .from("thumbnail")
    .getPublicUrl(data.data?.path);

  return url.data.publicUrl;
}

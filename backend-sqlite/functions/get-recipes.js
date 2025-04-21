import { supabase } from "./_config.js";

export async function handler() {
  const { data, error } = await supabase.from("recipes").select("*");
  if (error) return { statusCode: 500, body: JSON.stringify(error) };
  return { statusCode: 200, body: JSON.stringify(data) };
}

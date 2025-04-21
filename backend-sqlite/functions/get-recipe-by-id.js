import { supabase } from "./_config.js";

export async function handler({ pathParameters }) {
  const { id } = pathParameters;
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { statusCode: 404, body: JSON.stringify(error) };
  return { statusCode: 200, body: JSON.stringify(data) };
}

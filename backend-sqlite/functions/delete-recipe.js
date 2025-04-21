import { supabase } from "./_config.js";

export async function handler({ pathParameters }) {
  const { id } = pathParameters;
  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", id);
  if (error) return { statusCode: 500, body: JSON.stringify(error) };
  return { statusCode: 200, body: JSON.stringify({ message: "Deleted" }) };
}

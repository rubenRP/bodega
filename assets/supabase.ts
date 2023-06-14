import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ageggxxhbkctnelfvrsc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzM2ODQ0MywiZXhwIjoxOTQyOTQ0NDQzfQ.MVFoAv7OthMpWzmyy4pWYxw4CbE1AeDbsoqtiAl6H9E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

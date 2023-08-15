import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://fteqfgebeqglejxnroll.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0ZXFmZ2ViZXFnbGVqeG5yb2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzMzk1MDEsImV4cCI6MTk4OTkxNTUwMX0.YSTRPjrvDTYyxxvhwIrxKeGWito6VrNnx7zJr0adGy4"
);

export { supabase };

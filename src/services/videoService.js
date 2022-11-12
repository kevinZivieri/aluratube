import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://nfexbdtpxzvaedjzrbqz.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZXhiZHRweHp2YWVkanpyYnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNjkxMjQsImV4cCI6MTk4Mzg0NTEyNH0.AXhn3x75LOqexR7a2UdPpoHUAGj9h9xoeZMrDUPGTi4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video")
        .select("*");
	 	}  
  	}
}

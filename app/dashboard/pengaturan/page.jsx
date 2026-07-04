import { getCurrentUser } from "@/lib/auth";
import PengaturanTabs from "@/components/dashboard/pengaturan/PengaturanTabs";

export default async function PengaturanPage() {
  const user = await getCurrentUser();

  return <PengaturanTabs initialUser={user} />;
}
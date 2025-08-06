// import Dashboard from "@/components/dashboard/Dashboard";

import Dashboard from "@/components/Dashboard/Dashboard";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f9f9fb] p-0 md:p-5 mt-32 border rounded-md">
      <div className="border px-0 md:px-6 bg-white rounded-sm">
        <Dashboard />
      </div>
    </div>
  );
}

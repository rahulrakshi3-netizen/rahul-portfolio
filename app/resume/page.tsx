import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <Link
        href="/"
        className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <iframe
        src="/rahulraj_resume.pdf"
        className="h-full w-full border-0"
        title="Rahul Raj Resume"
      />
    </div>
  );
}

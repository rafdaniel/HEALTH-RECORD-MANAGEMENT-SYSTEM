import { Layout } from "@/components/Layout";

interface PlaceholderProps {
  pageName: string;
}

export default function Placeholder({ pageName }: PlaceholderProps) {
  return (
    <Layout title={pageName} subtitle={`Manage your ${pageName.toLowerCase()}`}>
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {pageName} Page
            </h2>
            <p className="text-gray-600 mb-6">
              This page is a placeholder. Continue prompting to add content for this section.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ask me to build this page content
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
